import React, {useState} from 'react'
import { Modal } from '../../context/Modal'
import Transfer from './TransferForm'

const TransferModal = () => {
    const [ showModal, setShowModal ] = useState(false);
    return(
        <>
            <button className= 'content-button' onClick={() => setShowModal(true)}>Buy</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <TransferForm className='tranfer-form' props={{ setShowModal }} />
                    </Modal>
                    )
                }
      </>)
}
export default TransferModal;