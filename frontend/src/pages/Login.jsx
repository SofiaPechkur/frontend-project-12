import {
  Container, Row, Col, Card, Form, Button, Image,
} from 'react-bootstrap'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { setAuth } from '../slices/authSlice.js'
import { routes } from '../routes/routes.js'
import image from '../assets/img1.jpg'
import { useLogin } from '../services/authApi.js'

const Login = () => {
  const [login] = useLogin()
  const auth = useSelector(state => state.auth)
  const { t } = useTranslation()
  useEffect(() => {
    if (auth.isAuthenticated) {
      window.location.href = routes.chat
    }
  }, [auth.isAuthenticated])
  const [isInputValid, setIsInputValid] = useState(true)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const res = await login(values).unwrap()
        dispatch(setAuth({ username: res.username, token: res.token }))
        window.location.href = routes.chat
      }
      catch {
        setIsInputValid(false)
      }
    },
  })
  return (
    <div className="d-flex flex-column h-100">
      <Container fluid className="h-100">
        <Row className="justify-content-center align-content-center h-100">
          <Col xs={12} md={8} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body className="row p-5">
                <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                  <Image
                    src={image}
                    roundedCircle
                    alt="Login"
                  />
                </Col>
                <Col xs={12} md={6} className="mt-3 mt-md-0">
                  <h1 className="text-center mb-4">{t('login.enter')}</h1>
                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        isInvalid={!isInputValid}
                        name="username"
                        required
                        placeholder={t('login.username')}
                        id="username"
                        autoComplete="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                      />
                      <Form.Label htmlFor="username">{t('login.username')}</Form.Label>
                    </Form.Group>
                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        isInvalid={!isInputValid}
                        name="password"
                        required
                        placeholder={t('login.password')}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip>{t('login.feedback')}</Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" className="w-100 mb-3" variant="outline-primary">
                      {t('login.enter')}
                    </Button>
                  </Form>
                </Col>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>{t('login.noAccount')}</span>
                  {' '}
                  <a href={routes.signup}>{t('login.registration')}</a>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login
