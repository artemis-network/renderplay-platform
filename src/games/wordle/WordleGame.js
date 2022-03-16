import { useState, useEffect } from 'react'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import { SettingsModal } from './components/modals/SettingsModal'
import {
  WIN_MESSAGES,
  GAME_COPIED_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE, CORRECT_WORD_MESSAGE,
} from './constants/strings'
import {
  MAX_WORD_LENGTH,
  MAX_CHALLENGES,
  REVEAL_TIME_MS,
  GAME_LOST_INFO_DELAY,
  WELCOME_INFO_MODAL_MS,
} from './constants/settings'
import {
  isWordInWordList,
  isWinningWord,
  solution,
  unicodeLength,
} from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'
import { default as GraphemeSplitter } from 'grapheme-splitter'

import './App.css'
import { AlertContainer } from './components/alerts/AlertContainer'
import { useAlert } from './context/AlertContext'
import Countdown from 'react-countdown'
import { useHistory } from 'react-router-dom'

import { post_winner } from '../../service/game.service'


function WorldleGame() {

  const history = useHistory()

  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert()
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [isGameLost, setIsGameLost] = useState(false)

  const [isRevealing, setIsRevealing] = useState(false)
  const [guesses, setGuesses] = useState(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    const gameWasWon = loaded.guesses.includes(solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true)
      showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
        persist: true,
      })
    }
    return loaded.guesses
  })

  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    if (!loadGameStateFromLocalStorage()) {
      setTimeout(() => {
        setIsInfoModalOpen(true)
      }, WELCOME_INFO_MODAL_MS)
    }
  }, [])

  const clearCurrentRowClass = () => {
    setCurrentRowClass('')
  }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      const winMessage =
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      const delayMs = REVEAL_TIME_MS * MAX_WORD_LENGTH
      showSuccessAlert(winMessage, {
        delayMs,
        onClose: () => setIsStatsModalOpen(true),
      })
      const isPosted = JSON.parse(localStorage.getItem("isResultPosted"))
      if (!isPosted || isPosted === null) {
        let guesses = JSON.parse(localStorage.getItem("gameState"))
        let gameConfig = JSON.parse(localStorage.getItem("gameConfig"))
        guesses = guesses.guesses.length
        const data = {
          username: localStorage.getItem("username"),
          chances: guesses,
          game_type: gameConfig.game_type,
          began_at: gameConfig.starts_on,
          is_won: true
        }
        post_winner(data).then(res => console.log(res)).catch(err => console.log(err))
        localStorage.setItem("isResultPosted", true)
      } else {
        history.push("/wordle")
      }
    }
    if (isGameLost) {
      const isPosted = JSON.parse(localStorage.getItem("isResultPosted"))
      if (!isPosted || isPosted === null) {
        let guesses = JSON.parse(localStorage.getItem("gameState"))
        let gameConfig = JSON.parse(localStorage.getItem("gameConfig"))
        guesses = guesses.guesses.length
        const data = {
          username: localStorage.getItem("username"),
          chances: guesses,
          game_type: gameConfig.game_type,
          began_at: gameConfig.starts_on,
          is_won: false
        }
        post_winner(data).then(res => console.log(res)).catch(err => console.log(err))
        localStorage.setItem("isResultPosted", true)
      } else {
        history.push("/wordle")
      }

      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, GAME_LOST_INFO_DELAY)

    }
  }, [isGameWon, isGameLost, showSuccessAlert, history])

  const onChar = (value) => {
    if (
      unicodeLength(`${currentGuess}${value}`) <= MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(
      new GraphemeSplitter().splitGraphemes(currentGuess).slice(0, -1).join('')
    )
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }
    if (!(unicodeLength(currentGuess) === MAX_WORD_LENGTH)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }
    if (!isWordInWordList(currentGuess)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(WORD_NOT_FOUND_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }
    setIsRevealing(true)
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      setIsRevealing(false)
    }, REVEAL_TIME_MS * MAX_WORD_LENGTH)

    const winningWord = isWinningWord(currentGuess)
    if (
      unicodeLength(currentGuess) === MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')
      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }
      if (guesses.length === MAX_CHALLENGES - 1) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
        showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
          persist: true,
          delayMs: REVEAL_TIME_MS * MAX_WORD_LENGTH + 1,
        })
      }
    }
  }
  const [timer_out, set_timer_out] = useState(1000 * 30)

  useEffect(() => {
    let data = localStorage.getItem("gameConfig")
    console.log(data)
    if (data !== null || data !== undefined) {
      data = JSON.parse(data)
      let time = new Date(data.starts_on).getTime() + (1000 * 60 * 30) - (1000 * 60 * 60 * 5) - (1000 * 60 * 30)
      const now = new Date(Date.now()).getTime()
      const exp = time - now
      set_timer_out(exp)
    } else {
      return history.push("/wordle")
    }
  }, [history])


  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (!completed) {
      return <div style={{ display: "flex" }}>
        <div style={{ color: "white", background: "#05595B", padding: "1rem", borderRadius: "2vh", fontSize: "2rem", fontWeight: "bold" }}>
          {minutes}m:{seconds}s
        </div>
      </div>
    } else {
      history.push("/wordle")
    }

  }

  return (
    <div style={{ background: "#0b1118", padding: "2rem" }} className="h-screen flex flex-col">
      <Countdown date={Date.now() + timer_out} renderer={renderer} />

      <div className="pt-2 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow">
        <div className="pb-6 grow">
          <Grid
            guesses={guesses}
            currentGuess={currentGuess}
            isRevealing={isRevealing}
            currentRowClassName={currentRowClass}
          />
        </div>
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          guesses={guesses}
          isRevealing={isRevealing}
        />
        <InfoModal
          isOpen={isInfoModalOpen}
          handleClose={() => setIsInfoModalOpen(false)}
        />
        <StatsModal
          isOpen={isStatsModalOpen}
          handleClose={() => setIsStatsModalOpen(false)}
          guesses={guesses}
          gameStats={stats}
          isGameLost={isGameLost}
          isGameWon={isGameWon}
          handleShare={() => showSuccessAlert(GAME_COPIED_MESSAGE)}
        />
        <SettingsModal
          isOpen={isSettingsModalOpen}
          handleClose={() => setIsSettingsModalOpen(false)}
        />
        <AlertContainer />
      </div>
    </div>
  )
}

export default WorldleGame