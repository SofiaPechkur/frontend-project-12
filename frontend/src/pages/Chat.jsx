import { addChannel, addChannels, updateChannel, removeChannel, selectChannel } from '../slices/channelsSlice.js';
import { Button, Nav, Form, InputGroup, Dropdown, ButtonGroup } from 'react-bootstrap';
import { addMessage, addMessages } from '../slices/messagesSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from "react";
import { io } from 'socket.io-client';
import { useFormik } from 'formik';
import getModal from '../modals/index.js';
import { showModal } from "../slices/modalSlice.js";
import filter from 'leo-profanity';
import axios from 'axios';

const Chat = () => {
    const { t } = useTranslation();
    const modalState = useSelector((state) => state.modal);
    const messagesState = useSelector(state => state.messages);
    const channelsState = useSelector(state => state.channels);
    const idCurrentChannel = channelsState.selectedChannelId;
    const authState = useSelector(state => state.auth);
    const userName = authState.username;
    const renderModal = () => {
        if (modalState.type === null) return null;
        const Modal = getModal(modalState.type);
        return <Modal />;
    };
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    useEffect(() => {
        if (!authState.isAuthenticated) {
            window.location.href = '/login';
        }
    })
    const getChannels = async () => {
        const res = await axios.get('/api/v1/channels', {
            headers: {
                Authorization: `Bearer ${authState.token}`,
            },
        })
        return res.data;
    }
    const getMessages = async () => {
        const res = await axios.get('/api/v1/messages', {
            headers: {
                Authorization: `Bearer ${authState.token}`,
            },
        })
        return res.data;
    }
    const dispatch = useDispatch();
    useEffect(async () => {
        const channels = await getChannels();
        const messages = await getMessages();
        if (channels) {
            dispatch(addChannels(channels));
        }
        if (messages) {
            dispatch(addMessages(messages));
        }
    }, [])
    useEffect(() => {
        const socket = io();
        socket.on('newMessage', (payload) => dispatch(addMessage(payload)));
        socket.on('newChannel', (payload) => dispatch(addChannel(payload)));
        socket.on('renameChannel', (payload) => dispatch(updateChannel(payload)));
        socket.on('removeChannel', (payload) => dispatch(removeChannel(payload)));

        return () => {
        socket.disconnect();
        };
    }, [dispatch]);
    const formik = useFormik({
        initialValues: {
        body: "",
        },
        onSubmit: async (values, { resetForm }) => {
        try {
            const newMessage = { body: filter.clean(values.body), channelId: idCurrentChannel, username: userName};
            await axios.post('/api/v1/messages', newMessage, {
                headers: {
                    Authorization: `Bearer ${authState.token}`,
                },
            })
            resetForm();
        }
        catch (error) {}
        },
    });
    return (
        <>
        {/* <div>{JSON.stringify(messagesState.entities)}</div> */}
            <div className="d-flex flex-column h-100">
                <div className="container h-100 my-4 overflow-hidden rounded shadow">
                    <div className="row h-100 bg-white flex-md-row">
                        <div className="col-4 col-md-2 border-end px-0 bg-light d-flex flex-column h-100">
                            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                                <b>{t('chat.channels')}</b>
                                <Button onClick={() => dispatch(showModal({ type: 'add' }))} type="button" className="p-0 text-primary" variant="group-vertical">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                    </svg>
                                    <span className="visually-hidden">+</span>
                                </Button>
                            </div>
                            <Nav id="channels-box" className="flex-column nav-fill px-2 mb-3 overflow-auto h-100 d-block" variant="pills">
                                {channelsState.ids.map((id) => {
                                    let variantSecondary = '';
                                    if( id === idCurrentChannel) {
                                        variantSecondary = 'secondary';
                                    } else {
                                        variantSecondary = 'btn';
                                    }
                                        if (channelsState.entities[id].removable) {
                                            return (
                                                <Nav.Item className="w-100">
                                                    <Dropdown as={ButtonGroup} className="d-flex">
                                                        <Button 
                                                        className="w-100 rounded-0 text-start text-truncate" 
                                                        variant={variantSecondary} 
                                                        onClick={() => dispatch(selectChannel(id))}>
                                                            <span className="me-1">#</span>
                                                            {channelsState.entities[id].name}
                                                        </Button>
                                                        <Dropdown.Toggle split className="flex-grow-0" variant={variantSecondary}>
                                                            <span className="visually-hidden">{t('chat.management')}</span>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item 
                                                            onClick={() => dispatch(showModal({ type: 'remove', channel: channelsState.entities[id] }))}>
                                                                {t('chat.remove')}
                                                            </Dropdown.Item>
                                                            <Dropdown.Item 
                                                            onClick={() => dispatch(showModal({ type: 'update', channel: channelsState.entities[id] }))}>
                                                                {t('chat.update')}
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Nav.Item>
                                            )
                                        } else {
                                            return (
                                                <Nav.Item className="w-100">
                                                    <Button onClick={() => dispatch(selectChannel(id))} className="w-100 rounded-0 text-start" variant={variantSecondary}>
                                                        <span className="me-1">#</span>
                                                        {channelsState.entities[id].name}
                                                    </Button>
                                                </Nav.Item>
                                            )
                                        }
                                })}
                            </Nav>
                        </div>
                        <div className="col p-0 h-100">
                            <div className="d-flex flex-column h-100">

                                <div className="bg-light mb-4 p-3 shadow-sm small">
                                    <p className="m-0">
                                        <b># {channelsState.entities[idCurrentChannel]?.name}</b>
                                    </p>
                                    <span className="text-muted">
                                        {messagesState.ids
                                        .map((id) => messagesState.entities[id].channelId)
                                        .filter((channelId) => channelId === idCurrentChannel)
                                        .length}
                                        {` сообщений`}
                                    </span>
                                </div>
                                <div id="messages-box" className="chat-messages overflow-auto px-5">
                                    {messagesState.ids.map((id) => {
                                        const channelId = messagesState.entities[id].channelId;
                                        if (idCurrentChannel === channelId) {
                                            const body = messagesState.entities[id].body;
                                            const username = messagesState.entities[id].username;
                                            return <div className="text-break mb-2">
                                                <b>{username}</b>: {body}
                                            </div>
                                        }
                                    })}
                                </div>
                                <div className="mt-auto px-5 py-3">
                                    <Form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
                                        <InputGroup>
                                            <Form.Control
                                            ref={inputRef}
                                            name="body"
                                            aria-label={t('chat.ariaLabel')}
                                            placeholder={t('chat.placeholder')}
                                            className="border-0 p-0 ps-2"
                                            onChange={formik.handleChange}
                                            value={formik.values.body}
                                            />
                                            <Button type="submit" variant="group-vertical" disabled={formik.isSubmitting}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                                                </svg>
                                                <span className="visually-hidden">{t('chat.send')}</span>
                                            </Button>
                                        </InputGroup>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {renderModal()}
        </>
    )
}

export default Chat;