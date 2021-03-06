import React, {useEffect, useState} from 'react';
import "./Chats.css"
import ChatHeader from "./ChatHeader/ChatHeader";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Messages from "./Messages/Messages";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/userSlice";
import {selectChannelId, selectChannelName} from "../../features/appSlice";
import db from "../../firebase";
import firebase from "firebase";

const Chats = () => {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (channelId) {
            db
                .collection("channels")
                .doc(channelId)
                .collection("messages")
                .orderBy("timestamp", "desc")
                .onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => doc.data())))
        }
    }, [channelId]);

    const sendMessage = async (e) => {
        e.preventDefault();
        await db.collection("channels").doc(channelId).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user
        });
        setInput("")
    }

    return (
        <div className={"chats"}>
            <ChatHeader channelName={channelName}/>

            <div className="chat__messages">
                {messages.map(message => {
                    return <Messages timestamp={message.timestamp} message={message.message} user={message.user}/>
                })}
            </div>

            <div className="chat__input">
                <AddCircleIcon fontSize={"large"}/>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} disabled={!channelId}
                           placeholder={`Message #${channelName}`}/>
                    <button onClick={sendMessage} disabled={!channelId} type={"submit"}
                            className={"chat__inputButton"}>Send message
                    </button>
                </form>
                <div className="chat__inputIcons">
                    <CardGiftcardIcon fontSize={"large"}/>
                    <GifIcon fontSize={"large"}/>
                    <EmojiEmotionsIcon fontSize={"large"}/>
                </div>
            </div>
        </div>
    );
};

export default Chats;