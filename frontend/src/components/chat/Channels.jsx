import { selectChannel, showModal } from '../../slices/uiSlice.js'
import { Button, Nav, Dropdown, ButtonGroup, Image } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import image from '../../assets/img4.png'

const ChannelItem = ({ channel, isSelected, onSelect, onRemove, onUpdate, t }) => {
  const variant = isSelected ? 'secondary' : 'btn'
  return (
    <Nav.Item className="w-100">
      {channel.removable
        ? (
            <Dropdown as={ButtonGroup} className="d-flex">
              <Button
                className="w-100 rounded-0 text-start text-truncate"
                variant={variant}
                onClick={onSelect}
              >
                <span className="me-1">#</span>
                {channel.name}
              </Button>
              <Dropdown.Toggle split className="flex-grow-0" variant={variant}>
                <span className="visually-hidden">{t('chat.management')}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => onRemove(channel)}>
                  {t('chat.remove')}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onUpdate(channel)}>
                  {t('chat.update')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
        : (
            <Button
              className="w-100 rounded-0 text-start"
              variant={variant}
              onClick={onSelect}
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
          )}
    </Nav.Item>
  )
}

const Channels = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const channelsState = useSelector(state => state.channels)
  const idCurrentChannel = useSelector(state => state.ui.selectedChannelId)
  const handleSelectChannel = (id) => {
    dispatch(selectChannel(id))
  }
  const handleShowModalRemove = (channel) => {
    dispatch(showModal({ type: 'remove', channel }))
  }
  const handleShowModalUpdate = (channel) => {
    dispatch(showModal({ type: 'update', channel }))
  }
  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light d-flex flex-column h-100">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <Button onClick={() => dispatch(showModal({ type: 'add' }))} type="button" className="p-0 text-primary" variant="group-vertical">
          <Image height={20} src={image} roundedCircle alt="Add" />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav id="channels-box" className="flex-column nav-fill px-2 mb-3 overflow-auto h-100 d-block" variant="pills">
        {channelsState.ids.map((id) => {
          const channel = channelsState.entities[id]
          const isSelected = id === idCurrentChannel
          return (
            <ChannelItem
              key={id}
              channel={channel}
              isSelected={isSelected}
              onSelect={() => handleSelectChannel(id)}
              onRemove={handleShowModalRemove}
              onUpdate={handleShowModalUpdate}
              t={t}
            />
          )
        })}
      </Nav>
    </div>
  )
}

export default Channels
