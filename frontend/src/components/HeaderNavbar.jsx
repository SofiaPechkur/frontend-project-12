import { Navbar, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { removeAuth } from '../slices/authSlice.js';
import { useTranslation } from 'react-i18next';

const HeaderNavbar = () => {
  const { t } = useTranslation();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Navbar expand="lg" bg="white" class="shadow-sm">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {authState.isAuthenticated
          ? <Button type="button" onClick={() => dispatch(removeAuth())}>{t('navbar.logout')}</Button>
          : null}
      </Container>
    </Navbar>
  );
};

export default HeaderNavbar;