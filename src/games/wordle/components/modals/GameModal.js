import { XCircleIcon } from '@heroicons/react/solid'
import { Modal } from 'react-bootstrap'

import WON from '../../../../assets/lottie/little-boy-with-thumbs-up.json'
import LOST from '../../../../assets/lottie/little-boy-crying.json'
import DONE from '../../../../assets/lottie/little-boy-with-a-pointing-stick.json'

import Lottie from 'lottie-react-web'

export const GameModal = ({
  isOpen,
  handleClose,
  isGameLost,
  isGameWon,
  isGameFinished
}) => {

  const defaultOptions_WON = {
    loop: true,
    autoplay: true,
    animationData: WON,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const defaultOptions_LOST = {
    loop: true,
    autoplay: true,
    animationData: LOST,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const defaultOptions_DONE = {
    loop: true,
    autoplay: true,
    animationData: DONE,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const Body = () => <div>
    {
      isGameFinished ? (<div>
        <Lottie
          style={{ height: "14rem", width: "14rem", paddingBottom: "2rem" }}
          options={defaultOptions_DONE}
        />
        <div className='custom_modal_header'>
          Try next rendle!
        </div>
        <h2>You already participated in this contest, stay tuned for results.</h2>
      </div>
      ) : null
    }
    {
      isGameLost && !isGameFinished ? (
        <div>
          <Lottie
            style={{ height: "14rem", width: "14rem" }}
            options={defaultOptions_LOST}
          />
          <div className='custom_modal_header'>
            Try next rendle!
          </div>
          <h2>Better Luck next time!.</h2>
        </div>
      ) : null
    }
    {
      isGameWon && !isGameFinished ? (
        <div>
          <Lottie
            style={{ height: "14rem", width: "14rem", paddingBottom: "2rem" }}
            options={defaultOptions_WON}
          />
          <div className='custom_modal_header'>
            Congrats!
          </div>
          <h2>Congrats you completed, resutls will be announced soon.</h2>
        </div>
      ) : null
    }
  </div>



  return (
    <Modal
      centered
      show={isOpen} onHide={handleClose}>
      <div className="custom_modal_close">
        <XCircleIcon onClick={handleClose} className='h-12 w-12 cursor-pointer' color="#ffeeee" />
      </div>
      <div className='custom_modal_content'>

        <div className='custom_modal_body'>
          <Body />
        </div>
        <div className='custom_modal_footer'>
          <button className='custom_modal_primary' onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  )
}
