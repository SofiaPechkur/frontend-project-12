import { Navbar, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { removeAuth } from '../slices/authSlice.js';

const HeaderNavbar = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Navbar expand="lg" bg="white" class="shadow-sm">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {authState.isAuthenticated
          ? <Button type="button" onClick={() => dispatch(removeAuth())}>Выйти</Button>
          : null}
      </Container>
    </Navbar>
  );
};

export default HeaderNavbar;