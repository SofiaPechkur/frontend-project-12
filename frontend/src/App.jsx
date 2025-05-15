import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page404 from './pages/Page404.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Chat from './pages/Chat.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;