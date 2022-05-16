import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'


import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'

import Background from '../../assets/test.png'

import { useAlert } from './context/AlertContext'
import { AlertContainer } from './components/alerts/AlertContainer'

import { InfoModal } from './components/modals/InfoModal'
import { GameModal } from './components/modals/GameModal'

import { NOT_ENOUGH_LETTERS_MESSAGE, WORD_NOT_FOUND_MESSAGE } from './constants/strings'
import { REVEAL_TIME_MS } from './constants/settings'
import { isWordInWordList, isWinningWord, getWordOfDay, unicodeLength } from './lib/words'
import { loadGameStateFromLocalStorage, saveGameStateToLocalStorage } from './lib/localStorage'

import { fiveLetterList } from './constants/config/fiveLetterList'
import { sixLetterList } from './constants/config/sixLetterList'
import { sevenLetterList } from './constants/config/sevenLetterList'
import { FiveLetterGuesses } from './constants/config/fiveLetterGuesses'
import { sixLetterGuesses } from './constants/config/sixLetterGuesses'
import { SevenLetterGuesses } from './constants/config/sevenLetterGuesses'


import { default as GraphemeSplitter } from 'grapheme-splitter'

import { saveRendleGame, getContestantStatus, getGuesses, updateGuesses } from '../../service/game.service'

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
  const [MAX_CHALLENGES, SET_MAX_CHALLENGES] = useState(5)
  const [WORDS, SET_WORDS] = useState([])
  const [VALID_GUESSES, SET_VALID_GUESSES] = useState([])
  const [isGameFinished, setIsGameFinished] = useState(false)

  const [solution, setSolution] = useState("")

  const userId = localStorage.getItem("userId")
  const data = JSON.parse(localStorage.getItem("gameConfig"))

  useEffect(() => {
    SET_MAX(data.gameType)
    SET_MAX_CHALLENGES(data.gameType)
    if (data.gameType === 5) {
      SET_WORDS(fiveLetterList)
      SET_VALID_GUESSES(FiveLetterGuesses)
      const { solution } = getWordOfDay(fiveLetterList)
      setSolution(solution)
    }
    if (data.gameType === 6) {
      SET_WORDS(sixLetterList)
      SET_VALID_GUESSES(sixLetterGuesses)
      const { solution } = getWordOfDay(sixLetterList)
      setSolution(solution)
    }
    if (data.gameType === 7) {
      SET_WORDS(sevenLetterList)
      SET_VALID_GUESSES(SevenLetterGuesses)
      const { solution } = getWordOfDay(sevenLetterList)
      setSolution(solution)
    }

  }, [MAX_WORD_LENGTH, data.gameType, solution])

  const [guesses, setGuesses] = useState(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) return []
    const gameWasWon = loaded.guesses.includes(solution)
    if (gameWasWon) setIsGameWon(true)
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) setIsGameLost(true)
    return loaded.guesses
  })

  const clearCurrentRowClass = () => setCurrentRowClass('')

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses, solution])

  useEffect(() => {
    if (userId) {
      getContestantStatus({ userId: userId, gameType: data.gameType, contestId: data.contestId })
        .then(res => {

          console.log(res.data)
          const isFirstGame = res.data.isFirstGame
          const isSameContest = data.contestId === res.data.contestId


          if (isFirstGame || !isSameContest) {
            let guesses = JSON.parse(localStorage.getItem("gameState"))

            guesses = guesses.guesses.length
            let gameConfig = JSON.parse(localStorage.getItem("gameConfig"))

            if (isGameLost) {
              const data = {
                userId: localStorage.getItem("userId"),
                username: localStorage.getItem("username"),
                chances: guesses,
                gameType: gameConfig.gameType,
                contestId: gameConfig.contestId,
                isWon: false
              }
              saveRendleGame(data).then(res => {
                setIsGameModalOpen(true)
                localStorage.removeItem("gameStateId")
                return setIsGameLost(true)
              }).catch(err => console.log(err))
            }

            if (isGameWon) {
              setIsGameModalOpen(true)
              const data = {
                userId: localStorage.getItem("userId"),
                username: localStorage.getItem("username"),
                chances: guesses,
                gameType: gameConfig.gameType,
                contestId: gameConfig.contestId,
                isWon: true
              }
              saveRendleGame(data).then(res => {
                localStorage.removeItem("gameStateId")
                return setIsGameWon(true)
              }).catch(err => console.log(err))
            }
          } else {
            setIsGameFinished(true)
            setIsGameModalOpen(true)
            setIsGameWon(res.data.isWon)
            setIsGameLost(!res.data.isWon)
          }
        })
        .catch(err => { console.log(err) })
    } else return history.push("/rendle")



    getGuesses({ userId: localStorage.getItem("userId") }).then((res_ => {
      console.log(res_.data)
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
      const gameStateId = localStorage.getItem("gameStateId")
      let word_data = {}
      if (gameStateId !== undefined || gameStateId !== null) {
        word_data = {
          userId: localStorage.getItem("userId"),
          constestId: data.contestId,
          word: currentGuess,
          gameStateId: gameStateId
        }
      } else {
        word_data = {
          userId: localStorage.getItem("userId"),
          constestId: data.contestId,
          word: currentGuess,
          gameStateId: null
        }
      }
      updateGuesses(word_data).then(res => {
        console.log(res.data)
        localStorage.setItem("gameStateId", res.data.gameStateId)
      }).catch(err => console.log(err))
      const timer = get_timer()
      if (winningWord) return setTimeout(() => setIsGameWon(true), timer)
      if (guesses.length === MAX_CHALLENGES - 1) setTimeout(() => setIsGameLost(true), timer)
    }
  }

  const get_timer = () => {
    if (MAX_WORD_LENGTH === 5) return 1950
    if (MAX_WORD_LENGTH === 6) return 2425
    if (MAX_WORD_LENGTH === 7) return 2650
  }

  const returnToWordle = () => {
    setIsGameModalOpen(false)
    history.push("/rendle")
  }

  return (
    <div style={{ padding: "0rem", background: `url(${Background})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "100%", margin: "auto", backgroundSize: "cover" }} className="h-screen flex flex-col">
      <div className='p-5'>
        <InformationCircleIcon
          color='white'
          style={{ display: "flex", justifyContent: "flex-end", alignSelf: "flex-end" }}
          className="h-12 w-12 cursor-pointer dark:stroke-white"
          onClick={() => setIsInfoModalOpen(true)}
        />
      </div>

      <div className="pt-2 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow">
        <div className="grow_keyboard">
          <Grid
            guesses={guesses}
            solution={solution}
            currentGuess={currentGuess}
            isRevealing={isRevealing}
            currentRowClassName={currentRowClass}
            MAX_CHALLENGES={MAX_CHALLENGES}
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
        />
        <AlertContainer />
      </div>
    </div>
  )
}

export default WorldleGame