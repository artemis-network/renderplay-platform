import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'

import { useAlert } from './context/AlertContext'
import { AlertContainer } from './components/alerts/AlertContainer'

import { InfoModal } from './components/modals/InfoModal'
import { GameModal } from './components/modals/GameModal'

import { WIN_MESSAGES, GAME_COPIED_MESSAGE, NOT_ENOUGH_LETTERS_MESSAGE, WORD_NOT_FOUND_MESSAGE, CORRECT_WORD_MESSAGE } from './constants/strings'
import { MAX_CHALLENGES, REVEAL_TIME_MS, WELCOME_INFO_MODAL_MS } from './constants/settings'
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

  const [solution, setSolution] = useState("")
  const [img, setImg] = useState("")
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
            setImg(gameConfig.banner)

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
              const winMessage =
                WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
              const delayMs = REVEAL_TIME_MS * MAX_WORD_LENGTH
              showSuccessAlert(winMessage, {
                delayMs,
                onClose: () => setIsGameModalOpen(true),
              })

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
            setIsGameModalOpen(true)
            setIsGameWon(res.data.status.is_won)
            setIsGameLost(!res.data.status.is_won)
          }
        })
        .catch(err => { console.log(err) })
    } else return history.push("/rendle")


    const game_state_id = { game_state_id: JSON.parse(localStorage.getItem("game_state_id")) }
    get_guesses(game_state_id).then((res_ => {
      if (res_.data.guesses.length <= 0) console.log("")
      else {
        const new_guesses = {
          solution: solution,
          guesses: res_.data.guesses
        }
        setGuesses([...res_.data.guesses])
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
      if (!winningWord) setCurrentGuess('')
      const game_state_id = localStorage.getItem("game_state_id")
      const word_data = {
        username: localStorage.getItem("username"),
        word: currentGuess,
        game_state_id: game_state_id
      }
      post_word(word_data).then(res => localStorage.setItem("game_state_id", res.data.game_state_id)).catch(err => console.log(err))
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

  const returnToWordle = () => {
    setIsGameModalOpen(false)
    history.push("/rendle")
  }

  return (
    <div style={{ padding: "0 2rem", background: "#321E43" }} className="h-screen flex flex-col">
      <div style={{ display: "flex", justifyContent: "center", margin: "2rem 0 0 0" }}>
        <img src={img} alt="img" width={"500px"} height="200px" style={{ display: "flex", alignSelf: "center" }} />
      </div>
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
          handleShare={() => showSuccessAlert(GAME_COPIED_MESSAGE)}
        />
        <AlertContainer />
      </div>
    </div>
  )
}

export default WorldleGame