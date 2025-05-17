import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import image from '../assets/img1.jpg';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../slices/authSlice.js';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Login() {
  const auth = useSelector(state => state.auth);
  useEffect(() => {
    if (auth.isAuthenticated) {
      window.location.href = '/';
    }
  }, [])
  const [isInputValid, setIsInputValid] = useState(true);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post('/api/v1/login', values);
        dispatch(setAuth({username: res.data.username, token: res.data.token}));
        window.location.href = '/';
      }
      catch (err) {
        setIsInputValid(false);
      }
    },
  });
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
                  <h1 className="text-center mb-4">Войти</h1>
                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        isInvalid={!isInputValid}
                        name="username"
                        required
                        placeholder="Ваш ник"
                        id="username"
                        autoComplete="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                      />
                      <Form.Label htmlFor="username">Ваш ник</Form.Label>
                    </Form.Group>
                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        isInvalid={!isInputValid}
                        name="password"
                        required
                        placeholder="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      <Form.Label htmlFor="password">Пароль</Form.Label>
                      <Form.Control.Feedback type='invalid' tooltip>Неверные имя пользователя или пароль</Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" className="w-100 mb-3" variant="outline-primary">
                      Войти
                    </Button>
                  </Form>
                </Col>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>Нет аккаунта?</span>{' '}
                  <a href="/signup">Регистрация</a>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
