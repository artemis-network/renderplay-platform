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

import { post_winner, get_player_status } from '../../service/game.service'


function WorldleGame() {

  const history = useHistory()

  const { showError: showErrorAlert, showSuccess: showSuccessAlert } = useAlert()
  const [currentGuess, setCurrentGuess] = useState('')
  const [timer_out, set_timer_out] = useState(1000 * 30)
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
    const username = localStorage.getItem("username")
    const data = JSON.parse(localStorage.getItem("gameConfig"))

    if (username) {
      get_player_status({ username: username })
        .then(res => {
          const is_first_game = res.data.status.is_first_game
          const is_same_contest = data.session.contest_id === res.data.status.contest_id

          if (is_first_game || !is_same_contest) {
            let time = new Date(data.session.starts_on).getTime() + (1000 * 60 * 30) - (1000 * 60 * 60 * 5) - (1000 * 60 * 30)
            const now = new Date(Date.now()).getTime()
            const exp = time - now
            set_timer_out(exp)

            let guesses = JSON.parse(localStorage.getItem("gameState"))
            guesses = guesses.guesses.length
            let gameConfig = JSON.parse(localStorage.getItem("gameConfig"))

            if (isGameLost) {
              const data = {
                username: localStorage.getItem("username"),
                chances: guesses,
                game_type: gameConfig.game_type,
                began_at: gameConfig.session.starts_on,
                contest_id: gameConfig.session.contest_id,
                is_won: false
              }
              post_winner(data).then(res => {
                localStorage.removeItem("gameState")
                localStorage.removeItem("gameStats")
                return history.push("/wordle")
              }).catch(err => console.log(err))
            }
            setTimeout(() => {
              setIsStatsModalOpen(true)
            }, GAME_LOST_INFO_DELAY)

            if (isGameWon) {
              const winMessage =
                WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
              const delayMs = REVEAL_TIME_MS * MAX_WORD_LENGTH
              showSuccessAlert(winMessage, {
                delayMs,
                onClose: () => setIsStatsModalOpen(true),
              })
              const data = {
                username: localStorage.getItem("username"),
                chances: guesses,
                game_type: gameConfig.game_type,
                began_at: gameConfig.session.starts_on,
                contest_id: gameConfig.session.contest_id,
                is_won: true
              }
              post_winner(data).then(res => {
                localStorage.removeItem("gameState")
                localStorage.removeItem("gameStats")
                return history.push("/wordle")
              }).catch(err => console.log(err))

            }
          } else {

            return history.push("/wordle")
          }
        })
        .catch(err => { console.log(err) })
    } else return history.push("/wordle")

  }, [isGameWon, isGameLost, showSuccessAlert, history])


  const onChar = (value) => {
    const condition_1 = unicodeLength(`${currentGuess}${value}`) <= MAX_WORD_LENGTH
    const condition_2 = guesses.length < MAX_CHALLENGES
    if (condition_1 && condition_2 && !isGameWon) setCurrentGuess(`${currentGuess}${value}`)
  }

  const onDelete = () => {
    const backspace = new GraphemeSplitter().splitGraphemes(currentGuess).slice(0, -1).join('')
    setCurrentGuess(backspace)
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) return

    const condition_1 = (unicodeLength(currentGuess) === MAX_WORD_LENGTH)
    const condition_2 = !isWordInWordList(currentGuess)
    const condition_3 = guesses.length < MAX_CHALLENGES

    if (!condition_1) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }
    if (condition_2) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(WORD_NOT_FOUND_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    setIsRevealing(true)
    setTimeout(() => {
      setIsRevealing(false)
    }, REVEAL_TIME_MS * MAX_WORD_LENGTH)

    const winningWord = isWinningWord(currentGuess)

    if (condition_1 && condition_3 && !isGameWon) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')
      if (winningWord) return setIsGameWon(true)
      if (guesses.length === MAX_CHALLENGES - 1) {
        setIsGameLost(true)
        showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
          persist: true,
          delayMs: REVEAL_TIME_MS * MAX_WORD_LENGTH + 1,
        })
      }
    }
  }

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (!completed) {
      return <div style={{ display: "flex" }}>
        <div style={{ color: "white", background: "#05595B", padding: "1rem", borderRadius: "2vh", fontSize: "2rem", fontWeight: "bold" }}>
          {minutes}m:{seconds}s
        </div>
      </div>
    } else return history.push("/wordle")
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