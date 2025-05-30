import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { Modal, Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import filter from 'leo-profanity'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { hideModal, selectChannel } from '../slices/uiSlice.js'
import { useSendNewChannel } from '../services/channelsApi.js'

const Add = () => {
  const [sendNewChannel] = useSendNewChannel()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const channelsState = useSelector(state => state.channels)
  const channels = channelsState.ids.map(id => channelsState.entities[id].name)
  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, t('add.schema.min3'))
      .max(20, t('add.schema.max20'))
      .required(t('add.schema.required'))
      .notOneOf(channels, t('add.schema.mustUnique')),
  })
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: schema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        const newChannel = { name: filter.clean(values.name) }
        const res = await sendNewChannel(newChannel).unwrap()
        toast.success(t('add.created'))
        dispatch(selectChannel(res.id))
        dispatch(hideModal())
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
          {t('add.title')}
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
            <Form.Label visuallyHidden>{t('add.name')}</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button type="button" variant="secondary" className="me-2" onClick={() => dispatch(hideModal())}>{t('add.cancel')}</Button>
              <Button type="submit" variant="primary" disabled={formik.isSubmitting}>{t('add.send')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Add
