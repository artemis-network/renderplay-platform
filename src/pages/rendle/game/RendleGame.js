import { useState, useEffect, lazy } from 'react'
import { useHistory } from 'react-router-dom'

import Background1 from '../../../assets/rendle/rendle/1.png'

import Timer from '../../../assets/rendle/rendle_game/timer.json'

import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'

import { InfoModal } from './components/modals/InfoModal'
import { GameModal } from './components/modals/GameModal'

import { unicodeLength } from './lib/words'

import { default as GraphemeSplitter } from 'grapheme-splitter'

import { saveRendleGame, getContestantStatus, validateUpdateGuess } from '../../../service/rendles.service'

import { InformationCircleIcon } from '@heroicons/react/solid'

import Lottie from 'lottie-react-web'
import { useCountdown } from '../../common/timer/useCountDown'
import { useParams } from 'react-router'

import { Box } from '@chakra-ui/react'

const defaultOptions_Timer = {
  loop: true, autoplay: true, animationData: Timer,
  rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
};

const Bar = lazy(() => import("../../common/bar/Bar"))

const RendleGame = () => {
  const token = localStorage.getItem("accessToken")

  const history = useHistory()
  const params = useParams()

  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isGameModalOpen, setIsGameModalOpen] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [isGameLost, setIsGameLost] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const [MAX_WORD_LENGTH, SET_MAX] = useState(5)
  const [MAX_CHALLENGES, SET_MAX_CHALLENGES] = useState(5)
  const [isGameFinished, setIsGameFinished] = useState(false)
  const [timer, setTimer] = useState(new Date(new Date().getTime() + (1000 * 60 * 60 * 1)))
  const [background, setBackground] = useState(Background1)
  const [stop, setStop] = useState(false)
  const [isGameCompleted, setIsGameCompleted] = useState(true)

  const [status, setStatus] = useState([[]])

  const [days, hours, minutes, seconds, isFinished] = useCountdown(timer);

  const [guesses, setGuesses] = useState([])

  useEffect(() => {
    if (token) {
      getContestantStatus({ contestId: params.contestId })
        .then(res => {
          setIsGameCompleted(res.data.isGameCompleted)
          SET_MAX(res.data.gameType)
          SET_MAX_CHALLENGES(res.data.gameType)
          setStatus(res.data.guessStatus)

          const isGameCompleted = res.data.isGameCompleted
          const isSameContest = params.contestId === res.data.contestId

          if (isGameCompleted) {
            if (res.data.isWon) setIsGameWon(true)
            else setIsGameLost(true)
            return setIsGameModalOpen(true)
          }

          if (!res.data.isOpened) return history.push("/lobby/" + params.contestId)

          if (!isGameCompleted || !isSameContest) {
            const time = res.data.expiresAt

            setTimer(time)

            if (isGameLost) {
              const data = {
                completedIn: new Date(),
                chances: res.data.words.length,
                gameType: res.data.gameType,
                contestId: params.contestId,
                isWon: false
              }
              saveRendleGame(data).then(res => {
                setIsGameModalOpen(true)
                return setIsGameLost(true)
              }).catch(err => console.log(err))
            }

            if (isGameWon) {
              setIsGameModalOpen(true)
              const data = {
                completedIn: new Date(),
                chances: res.data.words.length,
                gameType: res.data.gameType,
                contestId: params.contestId,
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
            if (!isGameWon && !isGameLost) setGuesses([...res.data.words])
          }
        })
        .catch(err => { console.log(err) })
    } else return history.push("/")

  }, [isGameWon, isGameLost])

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
    const condition_3 = guesses.length < MAX_CHALLENGES

    if (!condition_1) {
      setCurrentRowClass("jiggle_w")
      setTimeout(() => {
        setCurrentRowClass("")
      }, 1000)
      return
    }

    validateUpdateGuess({
      guess: currentGuess,
      index: guesses.length + 1,
      contestId: params.contestId,
    })
      .then((res => {
        console.log(res.data)
        if (!res.data.isValidGuess) {
          /// set alert here
          setCurrentRowClass("jiggle_w")
          setTimeout(() => {
            setCurrentRowClass("")
          }, 1000)
          return
        }

        const isWinningWord = res.data.isWinningWord
        if (condition_1 && condition_3 && !isGameWon) {
          setIsRevealing(true)
          setStatus([...status, res.data.guessStatus])
          setGuesses([...guesses, currentGuess])
          setCurrentGuess("")
          setTimeout(() => {
            setIsRevealing(false)
          }, 350 * MAX_WORD_LENGTH)
          const timer = get_timer()
          if (isWinningWord) return setTimeout(() => setIsGameWon(true), timer)
          if (guesses.length === MAX_CHALLENGES - 1) setTimeout(() => setIsGameLost(true), timer)
        }


      }))
      .catch(err => console.log(err))
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
      completedIn: new Date(),
      chances: guesses.length,
      gameType: gameConfig.gameType,
      contestId: params.contestId,
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
      <Box>

        <Bar isGame={true} />
      </Box>
      <div style={{ position: 'relative', background: "#321E43", height: "90vh", padding: "4rem 0", }}>
        {!isGameCompleted ?
          <div>
            <div className='rendle_timer_ipad'>
              <div className='username' style={{ padding: "1rem 2rem", display: "flex", flexDirection: "row", columnGap: "2rem", justifyContent: "center", alignItems: 'center', position: "relative", rowGap: "1rem" }}>
                <InformationCircleIcon
                  color='white'
                  className="h-16 w-16 cursor-pointer dark:stroke-white"
                  onClick={() => setIsInfoModalOpen(true)}
                />
                <div style={{ color: "white", fontWeight: "bold", fontSize: "1.25rem" }}>Game ends in</div>
                <Counter />
              </div>
            </div>

            <div style={{ padding: "1rem", width: "12vw", borderRadius: "2vh", position: "absolute", left: "5rem" }} className="username rendle_timer_desktop">
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
                  style={{ zIndex: 2 }}
                  status={status}
                  guesses={guesses}
                  currentGuess={currentGuess}
                  isRevealing={isRevealing}
                  currentRowClassName={currentRowClass}
                  MAX_CHALLENGES={MAX_CHALLENGES}
                />
              </div>
              <Keyboard
                style={{ zIndex: 2 }}
                onChar={onChar}
                onDelete={onDelete}
                onEnter={onEnter}
                guesses={guesses}
                isRevealing={isRevealing}
                MAX_WORD_LENGTH={MAX_WORD_LENGTH}
              />
            </div>
          </div>
          : null}
      </div>
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
        type={MAX_CHALLENGES}
      />
      <img className='rendle_bottom' src={background} style={{ position: "absolute", bottom: "0rem", backgroundSize: "cover", zIndex: 1 }} />
    </div>
  )
}

export default RendleGame 