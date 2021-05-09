import React, {useState} from 'react'
import { Modal } from '../../context/Modal'
import BuySellForm from './BuySellForm'

const TransferModal = () => {
    const [ showModal, setShowModal ] = useState(false);
    return(
        <>
            <button className= 'content-button' onClick={() => setShowModal(true)}>Buy</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <BuySellForm className='buy-sell-form' props={{ coin }} />
                    </Modal>
                    )
                }
      </>)
}
export default TransferModal;