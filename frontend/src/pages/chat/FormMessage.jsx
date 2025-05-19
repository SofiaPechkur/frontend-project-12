import { Button, InputGroup, Form, Image } from 'react-bootstrap'
import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import filter from 'leo-profanity'
import { useSelector, useDispatch } from 'react-redux'
import { removeAuth } from '../../slices/authSlice.js'
import image from '../../assets/img5.png'
import { useSendMessage } from '../../services/mesagesApi.js'

const FormMessage = () => {
  const [sendMessage] = useSendMessage()
  const authState = useSelector(state => state.auth)
  const userName = authState.username
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const channelsState = useSelector(state => state.channels)
  const idCurrentChannel = channelsState.selectedChannelId
  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const newMessage = {
          body: filter.clean(values.body),
          channelId: idCurrentChannel,
          username: userName,
        }
        await sendMessage(newMessage).unwrap()
        resetForm()
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
    },
  })
  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
        <InputGroup>
          <Form.Control
            ref={inputRef}
            name="body"
            aria-label={t('chat.ariaLabel')}
            placeholder={t('chat.placeholder')}
            className="border-0 p-0 ps-2"
            onChange={formik.handleChange}
            value={formik.values.body}
          />
          <Button type="submit" variant="group-vertical" disabled={formik.isSubmitting}>
            <Image
              height={20}
              src={image}
              roundedCircle
              alt="Submit"
            />
            <span className="visually-hidden">{t('chat.send')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  )
}

export default FormMessage
