import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { hideModal } from '../slices/modalSlice.js'
import { removeChannel, selectChannel } from '../slices/channelsSlice.js'
import { removeAuth } from '../slices/authSlice.js'
import { useSendRemoveChannel } from '../services/channelsApi.js'

const Remove = () => {
  const [sendRemoveChannel] = useSendRemoveChannel()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const modalState = useSelector(state => state.modal)
  const idCurrent = modalState.processedChannel.id
  const defaultChannelId = '1'
  const removeHandler = async () => {
    try {
      const res = await sendRemoveChannel(idCurrent).unwrap()
      dispatch(removeChannel(res.id))
      toast.success(t('remove.removed'))
      dispatch(hideModal())
      dispatch(selectChannel(defaultChannelId))
    }
    catch (error) {
      if (error.status === 401) {
        dispatch(removeAuth())
        toast.error(t('errors.fetchError'))
      }
      else {
        toast.error(t('errors.networkError'))
      }
    }
  }
  return (
    <Modal show aria-labelledby="contained-modal-title-vcenter" centered onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('remove.title')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('remove.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button type="button" variant="secondary" className="me-2" onClick={() => dispatch(hideModal())}>{t('remove.cancel')}</Button>
          <Button type="button" variant="danger" onClick={removeHandler}>{t('remove.send')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Remove
