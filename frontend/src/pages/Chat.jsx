import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Channels from '../components/chat/Channels.jsx'
import Messages from '../components/chat/Messages.jsx'
import FormMessage from '../components/chat/FormMessage.jsx'
import ModalFacade from '../modals/ModalFacade.jsx'
import { useGetChannels } from '../services/channelsApi.js'
import { useGetMessages } from '../services/messagesApi.js'
import { toast } from 'react-toastify'
import { removeAuth } from '../slices/authSlice.js'
import { useTranslation } from 'react-i18next'

const Chat = () => {
  const { t } = useTranslation()
  const authUserName = useSelector(state => state.auth.username)
  const idCurrentChannel = useSelector(state => state.ui.selectedChannelId)
  const dispatch = useDispatch()

  const { error: messagesError } = useGetMessages()
  const { error: channelsError } = useGetChannels()

  useEffect(() => {
    const error = messagesError || channelsError
    if (error) {
      if (error.status === 401) {
        dispatch(removeAuth())
        toast.error(t('errors.fetchError'))
      }
      else {
        toast.error(t('errors.networkError'))
      }
    }
  }, [dispatch, messagesError, channelsError])

  return (
    <>
      <div className="d-flex flex-column h-100">
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <Channels />
            <div className="col p-0 h-100">
              <div className="d-flex flex-column h-100">
                <Messages currentChannelId={idCurrentChannel} />
                <FormMessage
                  currentChannelId={idCurrentChannel}
                  userName={authUserName}
                />
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
