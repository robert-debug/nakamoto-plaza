import React, {useState} from 'react'
import { Modal } from '../../context/Modal'
import { BuySellForm } from './BuySellForm'
const BuySellFormModal = ({ props }) => {
    const [ showModal, setShowModal ] = useState(false);
    const coin = props.coin
    return(
        <>
            <button className= 'content-button' onClick={() => setShowModal(true)}>Comment</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <BuySellForm className='buy-sell-form' props={{ coin , setShowModal}}  />
                    </Modal>
      )}
      </>)
}
