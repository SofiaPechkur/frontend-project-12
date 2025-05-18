import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page404 from './pages/Page404.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Chat from './pages/Chat.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './slices/index.js';
import HeaderNavbar from './components/HeaderNavbar.jsx';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="d-flex flex-column h-100">
            <HeaderNavbar/>
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
}

export default App;