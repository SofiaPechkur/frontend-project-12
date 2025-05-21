import getModal from '../modals/index.js'
import { useSelector } from 'react-redux'

const ModalFacade = () => {
  const { typeModal } = useSelector(state => state.ui)
  if (typeModal === null) return null
  const Modal = getModal(typeModal)
  return <Modal />
}

export default ModalFacade
