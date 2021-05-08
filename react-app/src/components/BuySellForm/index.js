import React, {useState} from 'react'
import { Modal } from '../../context/Modal'
import { BuySellForm } from './BuySellForm'
const BuySellFormModal = () => {
    const [ showModal, setShowModal ] = useState(false);

    return(
        <>
            <button className= 'content-button' onClick={() => setShowModal(true)}>Comment</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <BuySellForm className='buy-sell-form' props={{setShowModal}}  />
                    </Modal>
      )}
      </>)
}
