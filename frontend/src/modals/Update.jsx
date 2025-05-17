import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from "react";
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { hideModal } from '../slices/modalSlice.js';
import { updateChannel } from '../slices/channelsSlice.js';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import * as yup from 'yup';

const Update = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const modalState = useSelector((state) => state.modal);
  const channelsState = useSelector(state => state.channels);
  const channels = channelsState.ids.map((id) => channelsState.entities[id].name);
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, t('update.schema.min3'))
      .max(20, t('update.schema.max20'))
      .required(t('update.schema.required'))
      .notOneOf(channels, t('update.schema.mustUnique')),
  });
  const formik = useFormik({
        initialValues: {
        name: modalState.processedChannel.name,
        id: modalState.processedChannel.id,
        },
        validationSchema: schema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                const editedChannel = { name: values.name };
                const res = await axios.patch(`/api/v1/channels/${values.id}`, editedChannel, {
                    headers: {
                        Authorization: `Bearer ${authState.token}`,
                    }
                })
                console.log(res.data)
                dispatch(updateChannel({
                  id: res.data.id,
                  changes: { name: res.data.name },
                }));
                dispatch(hideModal());
            }
            catch (error) {}
        },
  });
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
            <Form.Control.Feedback type='invalid'>{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button type="button" variant="secondary" className="me-2" onClick={() => dispatch(hideModal())}>Отменить</Button>
              <Button type="submit" variant="primary" disabled={formik.isSubmitting}>{t('update.send')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Update;
