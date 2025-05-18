import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Chat from './pages/Chat.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './slices/index.js';
import HeaderNavbar from './components/HeaderNavbar.jsx';
import Page404 from './pages/Page404.jsx';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <HeaderNavbar />
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  </Provider>
);

export default App;
