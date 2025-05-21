import { Button, InputGroup, Form, Image } from 'react-bootstrap'
import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import filter from 'leo-profanity'
import image from '../../assets/img5.png'
import { useSendMessage } from '../../services/messagesApi.js'

const FormMessage = ({ currentChannelId, userName }) => {
  const [sendMessage] = useSendMessage()
  const { t } = useTranslation()
  const inputRef = useRef(null)
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
          channelId: currentChannelId,
          username: userName,
        }
        await sendMessage(newMessage).unwrap()
        resetForm()
      }
      catch {
        toast.error(t('errors.networkError'))
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
