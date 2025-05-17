import { Row, Card, Form, Button, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../slices/authSlice.js';
import { useEffect, useRef, useState } from 'react';
import image from '../assets/img3.jpg';
import axios from 'axios';
import * as yup from 'yup';

const SignUp = () => {
    const auth = useSelector(state => state.auth);
    const [isInputValid, setIsInputValid] = useState(true);
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    useEffect(() => {
        if (auth.isAuthenticated) {
            window.location.href = '/';
        }
    }, [])
    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    const schema = yup.object().shape({
        username: yup
          .string()
          .min(3, 'ошибка1')
          .max(20, 'ошибка2')
          .required('ошибка3'),
        password: yup
          .string()
          .min(6, 'ошибка1')
          .required('ошибка3'),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
          .required('ошибка3'),
    });
    const formik = useFormik({
        initialValues: {
        username: "",
        password: "",
        confirmPassword: "",
        },
        validationSchema: schema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                const res = await axios.post('/api/v1/signup', {username: values.username, password: values.password});
                dispatch(setAuth({username: res.data.username, token: res.data.token}));
                window.location.href = '/';
            }
            catch (err) {
                if (err.status === 409) {
                    setIsInputValid(false);
                }
            }
        },
    });
    return (
        <div className="container-fluid h-100">
            <Row className="justify-content-center align-content-center h-100">
                <div className="col-12 col-md-8 col-xxl-6">
                    <Card className="shadow-sm">
                        <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                            <div>
                                <Image src={image} roundedCircle alt="Регистрация" />
                            </div>
                            <Form className="w-50" onSubmit={formik.handleSubmit}>
                                <h1 className="text-center mb-4">Регистрация</h1>
                                <Form.Group className="form-floating mb-3" controlId="username">
                                    <Form.Control
                                        name="username"
                                        autoComplete="username"
                                        required
                                        placeholder='От 3 до 20 символов'
                                        ref={inputRef}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.username}
                                        isInvalid={formik.errors.username && formik.touched.username || !isInputValid}
                                    />
                                    <Form.Label>Имя пользователя</Form.Label>
                                    <Form.Control.Feedback tooltip type="invalid" placement="right">{formik.errors.username}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="form-floating mb-3" controlId="password">
                                    <Form.Control
                                        name="password"
                                        autoComplete="new-password"
                                        required
                                        placeholder='Не менее 6 символов'
                                        type="password"
                                        aria-describedby="passwordHelpBlock"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        isInvalid={formik.errors.password && formik.touched.password || !isInputValid}
                                    />
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control.Feedback tooltip type="invalid">{formik.errors.password}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="form-floating mb-4" controlId="confirmPassword">
                                    <Form.Control
                                        name="confirmPassword"
                                        autoComplete="new-password"
                                        required
                                        placeholder='Пароли должны совпадать'
                                        type="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.confirmPassword}
                                        isInvalid={formik.errors.confirmPassword && formik.touched.confirmPassword || !isInputValid}
                                    />
                                    <Form.Label>Подтвердите пароль</Form.Label>
                                    <Form.Control.Feedback tooltip type="invalid">{formik.errors.confirmPassword || 'Такой пользователь уже существует'}</Form.Control.Feedback>
                                </Form.Group>
                                <Button type="submit" className="w-100 mb-3" variant="outline-primary">Зарегистрироваться</Button>
                            </Form>
                        </Card.Body>
                        <Card.Footer className="p-4">
                            <div className="text-center">
                                <span>Уже есть аккаунт? </span>
                                <Link to="/login">Войти</Link>
                            </div>
                        </Card.Footer>
                    </Card>
                </div>
            </Row>
        </div>
    )   
}

export default SignUp;