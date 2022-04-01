import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'

import { useAlert } from './context/AlertContext'
import { AlertContainer } from './components/alerts/AlertContainer'

import { InfoModal } from './components/modals/InfoModal'
import { GameModal } from './components/modals/GameModal'

import { NOT_ENOUGH_LETTERS_MESSAGE, WORD_NOT_FOUND_MESSAGE } from './constants/strings'
import { MAX_CHALLENGES, REVEAL_TIME_MS } from './constants/settings'
import { isWordInWordList, isWinningWord, getWordOfDay, unicodeLength } from './lib/words'
import { loadGameStateFromLocalStorage, saveGameStateToLocalStorage } from './lib/localStorage'

import { fiveLetterList } from './constants/config/fiveLetterList'
import { sixLetterList } from './constants/config/sixLetterList'
import { sevenLetterList } from './constants/config/sevenLetterList'
import { FiveLetterGuesses } from './constants/config/fiveLetterGuesses'
import { sixLetterGuesses } from './constants/config/sixLetterGuesses'
import { SevenLetterGuesses } from './constants/config/sevenLetterGuesses'


import { default as GraphemeSplitter } from 'grapheme-splitter'

import { post_winner, get_player_status, post_word, get_guesses } from '../../service/game.service'

import './App.css'
import { InformationCircleIcon } from '@heroicons/react/outline'

function WorldleGame() {

  const history = useHistory()

  const { showError: showErrorAlert, showSuccess: showSuccessAlert } = useAlert()
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isGameModalOpen, setIsGameModalOpen] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [isGameLost, setIsGameLost] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const [MAX_WORD_LENGTH, SET_MAX] = useState(5)
  const [WORDS, SET_WORDS] = useState([])
  const [VALID_GUESSES, SET_VALID_GUESSES] = useState([])
  const [isGameFinished, setIsGameFinished] = useState(false)

  const [solution, setSolution] = useState("")

  const username = localStorage.getItem("username")
  const data = JSON.parse(localStorage.getItem("gameConfig"))

  useEffect(() => {
    SET_MAX(data.game_type)
    if (data.game_type === 5) {
      SET_WORDS(fiveLetterList)
      SET_VALID_GUESSES(FiveLetterGuesses)
      const { solution } = getWordOfDay(fiveLetterList)
      setSolution(solution)
    }
    if (data.game_type === 6) {
      SET_WORDS(sixLetterList)
      SET_VALID_GUESSES(sixLetterGuesses)
      const { solution } = getWordOfDay(sixLetterList)
      setSolution(solution)
    }
    if (data.game_type === 7) {
      SET_WORDS(sevenLetterList)
      SET_VALID_GUESSES(SevenLetterGuesses)
      const { solution } = getWordOfDay(sevenLetterList)
      setSolution(solution)
    }

  }, [MAX_WORD_LENGTH, data.game_type, solution])

  const [guesses, setGuesses] = useState(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) return []
    const gameWasWon = loaded.guesses.includes(solution)
    if (gameWasWon) setIsGameWon(true)
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) setIsGameLost(true)
    return loaded.guesses
  })

  const clearCurrentRowClass = () => {
    setCurrentRowClass('')
  }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses, solution])

  useEffect(() => {
    if (username) {
      get_player_status({ username: username, game_type: data.game_type, contest_id: data.contest_id })
        .then(res => {
          const is_first_game = res.data.status.is_first_game
          const is_same_contest = data.contest_id === res.data.status.contest_id

          if (is_first_game || !is_same_contest) {
            let guesses = JSON.parse(localStorage.getItem("gameState"))
            guesses = guesses.guesses.length
            let gameConfig = JSON.parse(localStorage.getItem("gameConfig"))

            if (isGameLost) {
              const data = {
                username: localStorage.getItem("username"),
                chances: guesses,
                game_type: gameConfig.game_type,
                began_at: gameConfig.starts_on,
                contest_id: gameConfig.contest_id,
                is_won: false
              }
              post_winner(data).then(res => {
                setIsGameModalOpen(true)
                localStorage.removeItem("game_state_id")
                return setIsGameLost(true)
              }).catch(err => console.log(err))
            }

            if (isGameWon) {
              setIsGameModalOpen(true)
              const data = {
                username: localStorage.getItem("username"),
                chances: guesses,
                game_type: gameConfig.game_type,
                began_at: gameConfig.starts_on,
                contest_id: gameConfig.contest_id,
                is_won: true
              }
              post_winner(data).then(res => {
                localStorage.removeItem("game_state_id")
                localStorage.removeItem("game_state_id")
                return setIsGameWon(true)
              }).catch(err => console.log(err))
            }
          } else {
            setIsGameFinished(true)
            setIsGameModalOpen(true)
            setIsGameWon(res.data.status.is_won)
            setIsGameLost(!res.data.status.is_won)
          }
        })
        .catch(err => { console.log(err) })
    } else return history.push("/rendle")


    const game_state_id = { username: localStorage.getItem("username") }
    get_guesses(game_state_id).then((res_ => {
      if (res_.data.guesses.length <= 0) return
      else {
        const new_guesses = {
          solution: solution,
          guesses: res_.data.guesses
        }
        if (!isGameWon && !isGameLost) setGuesses([...res_.data.guesses])
        localStorage.setItem("gameState", JSON.stringify(new_guesses))
      }
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const condition_2 = !isWordInWordList(currentGuess, WORDS, VALID_GUESSES)
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

    const winningWord = isWinningWord(currentGuess, solution)

    if (condition_1 && condition_3 && !isGameWon) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess("")
      const game_state_id = localStorage.getItem("game_state_id")
      let word_data = {
      }
      if (game_state_id !== undefined || game_state_id !== null) {
        word_data = {
          username: localStorage.getItem("username"),
          word: currentGuess,
          game_state_id: JSON.parse(game_state_id)
        }
      } else {
        word_data = {
          username: localStorage.getItem("username"),
          word: currentGuess,
          game_state_id: null
        }
      }
      post_word(word_data).then(res => localStorage.setItem("game_state_id", res.data.game_state_id)).catch(err => console.log(err))
      if (winningWord) return setIsGameWon(true)
      if (guesses.length === MAX_CHALLENGES - 1) {
        setIsGameLost(true)
        // showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
        //   persist: true,
        //   delayMs: REVEAL_TIME_MS * MAX_WORD_LENGTH + 1,
        // })
      }
    }
  }

  const returnToWordle = () => {
    setIsGameModalOpen(false)
    history.push("/rendle")
  }

  return (
    <div style={{ padding: "0 2rem", background: "#321E43" }} className="h-screen flex flex-col">
      <div style={{ display: "flex", justifyContent: "center", margin: "2rem 0 0 0" }}>
      </div>
      <InformationCircleIcon
        color='white'
        style={{ display: "flex", justifyContent: "flex-end", alignSelf: "flex-end" }}
        className="h-12 w-12 mr-2 cursor-pointer dark:stroke-white"
        onClick={() => setIsInfoModalOpen(true)}
      />
      <div className="pt-2 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow">
        <div className="grow_keyboard">
          <Grid
            guesses={guesses}
            solution={solution}
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
          MAX_WORD_LENGTH={MAX_WORD_LENGTH}
        />
        <InfoModal
          isOpen={isInfoModalOpen}
          handleClose={() => setIsInfoModalOpen(false)}
        />
        <GameModal
          isOpen={isGameModalOpen}
          handleClose={returnToWordle}
          guesses={guesses}
          isGameLost={isGameLost}
          isGameWon={isGameWon}
          isGameFinished={isGameFinished}
        // handleShare={() => showSuccessAlert(GAME_COPIED_MESSAGE)}
        />
        <AlertContainer />
      </div>
    </div>
  )
}

export default WorldleGame