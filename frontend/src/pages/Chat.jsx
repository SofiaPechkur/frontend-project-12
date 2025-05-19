import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { routes } from '../routes/routes.js'
import { addMessages } from '../slices/messagesSlice.js'
import { addChannels } from '../slices/channelsSlice.js'
import Channels from './chat/Channels.jsx'
import Messages from './chat/Messages.jsx'
import FormMessage from './chat/FormMessage.jsx'
import ModalFacade from '../modals/ModalFacade.jsx'
import { useGetChannels } from '../services/channelsApi.js'
import { useGetMessages } from '../services/mesagesApi.js'
import { useNavigate } from 'react-router-dom'

const Chat = () => {
  const navigate = useNavigate()
  const authState = useSelector(state => state.auth)
  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate(routes.login)
    }
  })
  const dispatch = useDispatch()

  const { data: messages } = useGetMessages()
  const { data: channels } = useGetChannels()

  useEffect(() => {
    if (channels) {
      dispatch(addChannels(channels))
    }
    if (messages) {
      dispatch(addMessages(messages))
    }
  }, [dispatch, channels, messages])

  return (
    <>
      <div className="d-flex flex-column h-100">
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <Channels />
            <div className="col p-0 h-100">
              <div className="d-flex flex-column h-100">
                <Messages />
                <FormMessage />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalFacade />
    </>
  )
}

export default Chat
