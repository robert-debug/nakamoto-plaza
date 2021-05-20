import React, {useState} from 'react'
import { Modal } from '../../context/Modal'
import BuySellForm from './BuySellForm'

const BuySellFormModal = ({ props }) => {

    const coin = props.coin
    const [ showModal, setShowModal ] = useState(false);
    return(
        <>
            <button className= 'buy-button' onClick={() => setShowModal(true)}>Buy/Sell</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <BuySellForm className='buy-sell-form' props={{ coin, setShowModal }} />
                    </Modal>
                    )
                }
      </>)
}
export default BuySellFormModal;