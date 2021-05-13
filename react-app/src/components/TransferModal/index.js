import React, {useState} from 'react'
import { Modal } from '../../context/Modal'
import TransferForm from './TransferForm'

const TransferModal = () => {
    const [ showModal, setShowModal ] = useState(false);
    return(
        <>
            <button className= 'send-button' onClick={() => setShowModal(true)}>Send</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <TransferForm className='tranfer-form' props={{ setShowModal }} />
                    </Modal>
                    )
                }
      </>)
}
export default TransferModal;