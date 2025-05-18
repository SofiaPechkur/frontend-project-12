import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from "react";
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { hideModal } from '../slices/modalSlice.js';
import { addChannel, selectChannel } from '../slices/channelsSlice.js';
import { useTranslation } from 'react-i18next';
import { removeAuth } from '../slices/authSlice.js';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as yup from 'yup';

const Add = () => {
  const { t } = useTranslation();
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
      .min(3, t('add.schema.min3'))
      .max(20, t('add.schema.max20'))
      .required(t('add.schema.required'))
      .notOneOf(channels, t('add.schema.mustUnique')),
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
                toast.success(t('add.created'));
                dispatch(selectChannel(res.data.id))
                dispatch(hideModal());
            }
            catch (error) {
              if (error.status === 401) {
                dispatch(removeAuth());
                toast.error(t('errors.fetchError'));
              } else {
                toast.error(t('errors.networkError'));
              }
            }
        },
  });
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
            <Form.Control.Feedback type='invalid'>{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button type="button" variant="secondary" className="me-2" onClick={() => dispatch(hideModal())}>{t('add.cancel')}</Button>
              <Button type="submit" variant="primary" disabled={formik.isSubmitting}>{t('add.send')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
