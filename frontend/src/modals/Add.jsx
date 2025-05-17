import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from "react";
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { hideModal } from '../slices/modalSlice.js';
import { addChannel, selectChannel } from '../slices/channelsSlice.js';
import axios from 'axios';
import * as yup from 'yup';

const Add = () => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const channelsState = useSelector(state => state.channels);
  const channels = channelsState.ids.map((id) => channelsState.entities[id].name);
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'ошибка1')
      .max(20, 'ошибка2')
      .required('ошибка3')
      .notOneOf(channels, 'ошибка4'),
  });
  const formik = useFormik({
        initialValues: {
        name: "",
        },
        validationSchema: schema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                const newChannel = { name: values.name };
                const res = await axios.post('/api/v1/channels', newChannel, {
                    headers: {
                        Authorization: `Bearer ${authState.token}`,
                    }
                })
                dispatch(addChannel(res.data));
                dispatch(selectChannel(res.data.id))
                dispatch(hideModal());
            }
            catch (error) {}
        },
  });
  return (
    <Modal show aria-labelledby="contained-modal-title-vcenter" centered onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>
          Добавить канал
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
            <Form.Label visuallyHidden>Пожалуйста, введите имя канала.</Form.Label>
            <Form.Control.Feedback type='invalid'>{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button type="button" variant="secondary" className="me-2" onClick={() => dispatch(hideModal())}>Отменить</Button>
              <Button type="submit" variant="primary" disabled={formik.isSubmitting}>Отправить</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
