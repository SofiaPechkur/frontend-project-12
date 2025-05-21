import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const Message = ({ body, username }) => {
  return (
    <div className="text-break mb-2">
      <b>{username}</b>
      {': '}
      {body}
    </div>
  )
}

const Messages = ({ currentChannelId }) => {
  const { t } = useTranslation()
  const messagesToPrint = useSelector((state) => {
    return Object.values(state.messages.entities).filter(message => message.channelId === currentChannelId)
  })
  const channelsState = useSelector(state => state.channels)
  const messagesCount = messagesToPrint.length
  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {'# '}
            {channelsState.entities[currentChannelId]?.name}
          </b>
        </p>
        <span className="text-muted">
          {messagesCount}
          {' '}
          {t('chat.message', { count: messagesCount })}
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {messagesToPrint.map((message) => {
          const { id, body, username } = message
          return (
            <Message
              key={id}
              body={body}
              username={username}
            />
          )
        })}
      </div>
    </>
  )
}

export default Messages
