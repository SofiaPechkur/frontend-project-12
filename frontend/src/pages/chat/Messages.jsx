import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const Messages = () => {
  const { t } = useTranslation()
  const messagesState = useSelector(state => state.messages)
  const channelsState = useSelector(state => state.channels)
  const idCurrentChannel = channelsState.selectedChannelId
  const messagesCount = () => messagesState.ids
    .map(id => messagesState.entities[id].channelId)
    .filter(channelId => channelId === idCurrentChannel)
    .length
  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {'# '}
            {channelsState.entities[idCurrentChannel]?.name}
          </b>
        </p>
        <span className="text-muted">
          {messagesCount()}
          {' '}
          {t('chat.message', { count: messagesCount() })}
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {messagesState.ids.map((id) => {
          const { channelId } = messagesState.entities[id]
          if (idCurrentChannel === channelId) {
            const { body } = messagesState.entities[id]
            const { username } = messagesState.entities[id]
            return (
              <div key={id} className="text-break mb-2">
                <b>{username}</b>
                :
                {' '}
                {body}
              </div>
            )
          }
          return null
        })}
      </div>
    </>
  )
}

export default Messages
