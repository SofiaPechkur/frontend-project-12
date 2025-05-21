import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { hideModal, selectChannel } from '../slices/uiSlice.js'
import { useSendRemoveChannel } from '../services/channelsApi.js'

const Remove = () => {
  const [sendRemoveChannel] = useSendRemoveChannel()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const idCurrent = useSelector(state => state.ui.processedChannel.id)
  const defaultChannelId = '1'
  const removeHandler = async () => {
    try {
      await sendRemoveChannel(idCurrent).unwrap()
      toast.success(t('remove.removed'))
      dispatch(hideModal())
      dispatch(selectChannel(defaultChannelId))
    }
    catch {
      toast.error(t('errors.networkError'))
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
