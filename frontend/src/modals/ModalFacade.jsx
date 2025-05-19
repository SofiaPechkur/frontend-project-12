import getModal from '../modals/index.js'
import { useSelector } from 'react-redux'

const ModalFacade = () => {
  const modalState = useSelector(state => state.modal)
  if (modalState.type === null) return null
  const Modal = getModal(modalState.type)
  return <Modal />
}

export default ModalFacade
