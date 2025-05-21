import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { Modal, Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import filter from 'leo-profanity'
import * as yup from 'yup'
import { hideModal } from '../slices/uiSlice.js'
import { useSendUpdateChannel } from '../services/channelsApi.js'

const Update = () => {
  const [sendUpdateChannel] = useSendUpdateChannel()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const uiState = useSelector(state => state.ui)
  const channelsState = useSelector(state => state.channels)
  const channels = channelsState.ids.map(id => channelsState.entities[id].name)
  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, t('update.schema.min3'))
      .max(20, t('update.schema.max20'))
      .required(t('update.schema.required'))
      .notOneOf(channels, t('update.schema.mustUnique')),
  })
  const formik = useFormik({
    initialValues: {
      name: uiState.processedChannel.name,
      id: uiState.processedChannel.id,
    },
    validationSchema: schema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        const editedChannel = { id: values.id, name: filter.clean(values.name) }
        await sendUpdateChannel(editedChannel).unwrap()
        dispatch(hideModal())
        toast.success(t('update.updated'))
      }
      catch {
        toast.error(t('errors.networkError'))
      }
    },
  })
  return (
    <Modal show aria-labelledby="contained-modal-title-vcenter" centered onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('update.title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              ref={inputRef}
              name="name"
              className="mb-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={formik.errors.name && formik.touched.name}
            />
            <Form.Label visuallyHidden>{t('update.name')}</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button type="button" variant="secondary" className="me-2" onClick={() => dispatch(hideModal())}>Отменить</Button>
              <Button type="submit" variant="primary" disabled={formik.isSubmitting}>{t('update.send')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Update
