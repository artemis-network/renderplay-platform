import { Cell } from '../grid/Cell'
import { Button, Modal } from 'react-bootstrap'
import { XCircleIcon } from '@heroicons/react/solid'

export const InfoModal = ({ isOpen, handleClose }) => {
  const Body = () => <div>
    <p className="text-m text-light-500 dark:text-light-300">
      Guess the word in 5 tries. After each guess, the color of the tiles will
      change to show how close your guess was to the word.
    </p>

    <div className="flex justify-center mb-1 mt-4">
      <Cell
        isRevealing={true}
        isCompleted={true}
        value="T"
        status="correct"
      />
      <Cell value="R" />
      <Cell value="U" />
      <Cell value="S" />
      <Cell value="T" />
    </div>
    <p className="text-m text-light-500 dark:text-light-300">
      The letter T is in the word and in the correct spot.
    </p>

    <div className="flex justify-center mb-1 mt-4">
      <Cell value="C" />
      <Cell value="A" />
      <Cell
        isRevealing={true}
        isCompleted={true}
        value="M"
        status="present"
      />
      <Cell value="E" />
      <Cell value="L" />
    </div>
    <p className="text-m text-light-500 dark:text-light-300">
      The letter M is in the word but in the wrong spot.
    </p>

    <div className="flex justify-center mb-1 mt-4">
      <Cell value="B" />
      <Cell value="R" />
      <Cell value="E" />
      <Cell isRevealing={true} isCompleted={true} value="A" status="absent" />
      <Cell value="K" />
    </div>
    <p className="text-m text-light-500 dark:text-light-300">
      The letter A is not in the word in any spot.
    </p>
  </div>
  return (
    <Modal
      centered
      show={isOpen} onHide={handleClose}>
      <div className="custom_modal_close">
        <XCircleIcon onClick={handleClose} className='h-12 w-12 cursor-pointer' color="#ffeeee" />
      </div>
      <div className='custom_modal_content'>
        <div className='custom_modal_header'>
          How to play?
        </div>
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
