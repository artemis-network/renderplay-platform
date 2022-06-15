import { useState, useEffect, lazy } from 'react'
import { useHistory } from 'react-router-dom'
import Background1 from '../../../assets/rendle/rendle/1.png'

import Timer from '../../../assets/rendle/rendle_game/timer.json'


import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'

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

import { saveRendleGame, getContestantStatus, getGuesses, updateGuesses } from '../../../service/rendles.service'

import { InformationCircleIcon } from '@heroicons/react/solid'

import Lottie from 'lottie-react-web'
import { useCountdown } from '../../common/timer/useCountDown'

const defaultOptions_Timer = {
  loop: true,
  autoplay: true,
  animationData: Timer,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const Bar = lazy(() => import("../../common/bar/Bar"))

const RendleGame = () => {
  const userId = localStorage.getItem("userId")
  const data = JSON.parse(localStorage.getItem("gameConfig"))

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
  const [timer, setTimer] = useState(new Date(new Date().getTime() + (1000 * 60 * 60 * 1)))
  const [background, setBackground] = useState(Background1)
  const [stop, setStop] = useState(false)

  const [solution, setSolution] = useState("")

  const [days, hours, minutes, seconds, isFinished] = useCountdown(timer);


  useEffect(() => {
    SET_MAX(data.gameType)
    SET_MAX_CHALLENGES(data.gameType)
    if (data.gameType === 5) {
      SET_WORDS(fiveLetterList)
      SET_VALID_GUESSES(FiveLetterGuesses)
      const { solution } = getWordOfDay(fiveLetterList)
      setSolution(solution)
      // setBackground(Background1)
    }
    if (data.gameType === 6) {
      SET_WORDS(sixLetterList)
      SET_VALID_GUESSES(sixLetterGuesses)
      const { solution } = getWordOfDay(sixLetterList)
      setSolution(solution)
      // setBackground(Background2)
    }
    if (data.gameType === 7) {
      SET_WORDS(sevenLetterList)
      SET_VALID_GUESSES(SevenLetterGuesses)
      const { solution } = getWordOfDay(sevenLetterList)
      setSolution(solution)
      // setBackground(Background3)
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

  useEffect(() => saveGameStateToLocalStorage({ guesses, solution }), [guesses, solution])


  useEffect(() => {
    if (userId) {
      getContestantStatus({ userId: userId, contestId: data._id })
        .then(res => {

          const isGameCompleted = res.data.isGameCompleted
          const isSameContest = data._id === res.data.contestId

          if (isGameCompleted) {
            if (res.data.isWon) setIsGameWon(true)
            else setIsGameLost(true)
            return setIsGameModalOpen(true)
          }

          if (!res.data.isOpened) return history.push("/lobby")

          if (!isGameCompleted || !isSameContest) {
            let guesses = JSON.parse(localStorage.getItem("gameState"))

            guesses = guesses.guesses.length
            let gameConfig = JSON.parse(localStorage.getItem("gameConfig"))

            const time = res.data.expiresAt
            setTimer(time)

            if (isGameLost) {
              const data = {
                userId: localStorage.getItem("userId"),
                username: localStorage.getItem("username"),
                completedIn: new Date(),
                chances: guesses,
                gameType: gameConfig.gameType,
                contestId: gameConfig._id,
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
                completedIn: new Date(),
                chances: guesses,
                gameType: gameConfig.gameType,
                contestId: gameConfig._id,
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


          if (res.data.words.length <= 0) return
          else {
            const new_guesses = {
              solution: solution,
              guesses: res.data.words
            }
            if (!isGameWon && !isGameLost) setGuesses([...res.data.words])
            localStorage.setItem("gameState", JSON.stringify(new_guesses))
          }
        })
        .catch(err => { console.log(err) })
    } else return history.push("/")
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
          constestId: data._id,
          word: currentGuess,
          gameStateId: gameStateId
        }
      } else {
        word_data = {
          userId: localStorage.getItem("userId"),
          constestId: data._id,
          word: currentGuess,
          gameStateId: null
        }
      }
      updateGuesses(word_data).then(res => {
        localStorage.setItem("gameStateId", res.data.gameStateId)
      }).catch(err => console.log(err))
      const timer = get_timer()
      if (winningWord) return setTimeout(() => setIsGameWon(true), timer)
      if (guesses.length === MAX_CHALLENGES - 1) setTimeout(() => setIsGameLost(true), timer)
    }
  }

  const timerFormatter = (time) => {
    time = String(time)
    if (time.length === 1)
      time = "0" + time
    return time
  }

  const isFinishedUpdate = () => {
    const gameConfig = JSON.parse(localStorage.getItem("gameConfig"))
    const data = {
      userId: localStorage.getItem("userId"),
      username: localStorage.getItem("username"),
      completedIn: new Date(),
      chances: guesses.length,
      gameType: gameConfig.gameType,
      contestId: gameConfig._id,
      isWon: false
    }
    saveRendleGame(data).then(res => {
      setIsGameModalOpen(true)
      localStorage.removeItem("gameStateId")
      return setIsGameLost(true)
    }).catch(err => console.log(err))
  }


  useEffect(() => {
    if (stop === true) {
      isFinishedUpdate()
    }
  }, [stop])


  const Counter = () => {

    const count = (minutes === 0 && seconds < 0)
    console.log(count)

    if (isFinished)
      if (stop !== true) setStop(true)

    return <div style={{
      display: "flex", justifyContent: "flex-end", alignItems: "center", flexDirection: "", padding: "0rem 0rem", margin: "0rem", zIndex: 3,
    }}>
      <div style={{ color: "#ffffff", display: "flex", }}>
        <div style={{ fontSize: "1.25rem" }}>
          {!count ?
            <div>
              <span className="username" style={{ fontSize: "2rem", margin: "0 .15rem", padding: ".25rem", borderRadius: "2vh" }}>
                {timerFormatter(minutes)}
              </span>
              <span className="username" style={{ fontSize: "2rem", margin: "0 .15rem", padding: ".25rem", borderRadius: "2vh" }}>
                {timerFormatter(seconds)}
              </span>
            </div> :
            <div style={{ color: "white", fontSize: "1.25rem", fontWeight: "bold" }}>Loading...</div>
          }
        </div>
      </div>
    </div>
  }


  const get_timer = () => {
    if (MAX_WORD_LENGTH === 5) return 1950
    if (MAX_WORD_LENGTH === 6) return 2425
    if (MAX_WORD_LENGTH === 7) return 2650
  }

  const returnToWordle = () => {
    setIsGameModalOpen(false)
    history.push("/")
  }

  return (
    <div style={{ position: "relative" }}>
      <Bar isGame={true} />
      <div style={{ position: 'relative', background: "#321E43", height: "90vh", padding: "4rem 0" }}>
        <div style={{ padding: "1rem", width: "12vw", borderRadius: "2vh", position: "absolute", left: "5rem" }} className="username">
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: 'center', position: "relative", rowGap: "1rem" }}>
            <InformationCircleIcon
              color='white'
              className="h-16 w-16 cursor-pointer dark:stroke-white"
              onClick={() => setIsInfoModalOpen(true)}
            />
            <div style={{ color: "white", fontWeight: "bold", fontSize: "1.25rem" }}>Game ends in</div>
            <Counter />
            <Lottie
              style={{ height: "10rem", width: "10rem", position: "absolute", bottom: "-5rem", right: "-5rem" }}
              options={defaultOptions_Timer}
            />
          </div>
        </div>
        <div className="pt-2 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow" style={{ width: "90%" }}>
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
      <img src={background} style={{ position: "absolute", bottom: "0rem", backgroundSize: "cover" }} />
    </div>
  )
}

export default RendleGame 