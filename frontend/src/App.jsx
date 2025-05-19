import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Chat from './pages/Chat.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import HeaderNavbar from './components/HeaderNavbar.jsx'
import Page404 from './pages/Page404.jsx'
import RoutePrivate from './routes/RoutePrivate.jsx'
import { routes } from './routes/routes.js'

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <HeaderNavbar />
      <Routes>
        <Route path={routes.page404} element={<Page404 />} />
        <Route
          path={routes.chat}
          element={(
            <RoutePrivate>
              <Chat />
            </RoutePrivate>
          )}
        />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.signup} element={<SignUp />} />
      </Routes>
    </div>
    <ToastContainer />
  </BrowserRouter>
)

export default App
