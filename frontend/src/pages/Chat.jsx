import { useEffect } from "react";
import { useSelector } from 'react-redux';

const Chat = () => {
    const auth = useSelector(state => state.auth);
    useEffect(() => {
        if (!auth.isAuthenticated) {
            window.location.href = '/login';
        }
    }, [])
    return <div>chat</div>
}

export default Chat;