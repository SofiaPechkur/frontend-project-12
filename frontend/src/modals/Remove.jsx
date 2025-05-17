import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { hideModal } from '../slices/modalSlice.js';
import { removeChannel, selectChannel } from '../slices/channelsSlice.js';
import axios from 'axios';

const Remove = () => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const modalState = useSelector((state) => state.modal);
  const idCurrent = modalState.processedChannel.id;
  const removeHandler = async () => {
    try {
      const res = await axios.delete(`/api/v1/channels/${idCurrent}`, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        }
      })
      dispatch(removeChannel(res.data.id));
      dispatch(hideModal());
      dispatch(selectChannel('1'));
    }
    catch (error) {}
  }
  return (
    <Modal show aria-labelledby="contained-modal-title-vcenter" centered onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>
          Удалить канал
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button type="button" variant="secondary" className="me-2" onClick={() => dispatch(hideModal())}>Отменить</Button>
          <Button type="button" variant="danger" onClick={removeHandler}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
