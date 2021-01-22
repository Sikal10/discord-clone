import React, {useEffect, useState} from 'react';
import "./Sidebar.css"
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from "./SidebarChannel/SidebarChannel";
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallIcon from '@material-ui/icons/Call';
import Avatar from "@material-ui/core/Avatar";
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import {useSelector} from "react-redux";
import {selectUser} from "../../features/userSlice";
import {auth} from "../../firebase";
import db from "../../firebase";


const Sidebar = () => {
    const [channels, setChannels] = useState([]);
    const user = useSelector(selectUser);

    const signOut = async () => {
        await auth.signOut()
    }

    const addChannel = () => {
        const channelName = prompt("Enter a new channel name");

        //if user enters a channel name
        if (channelName) {
            db.collection("channels").add({
                channelName
            })
        }
    }

    useEffect(() => {
        db.collection("channels").onSnapshot(snapshot => (
            setChannels(snapshot.docs.map(doc => ({
                id: doc.id,
                channel: doc.data()
            })))
        ))
    }, [])
    return (
        <div className={"sidebar"}>
            <div className="sidebar__top">
                <h3>Sikal</h3>
                <KeyboardArrowDownIcon />
            </div>

            <div className="sidebar__channels" >
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <KeyboardArrowDownIcon />
                        <h4>Text Channels</h4>
                    </div>

                    <AddIcon onClick={addChannel} className={"sidebar__addChannel"} />
                </div>
                <div className="sidebar__channelsList">
                    {channels.map(({id, channel}) => (
                        <SidebarChannel id={id} key={id} channelName={channel.channelName}/>
                    ))}
                </div>
            </div>

            <div className="sidebar__voice">
                <SignalCellularAltIcon fontSize={"large"} className={"sidebar__voiceIcon"}/>

                <div className="sidebar__voiceInfo">
                    <h3>Voice connected</h3>
                    <p>Stream</p>
                </div>

                <div className="sidebar__voiceIcons">
                    <InfoOutlinedIcon />
                    <CallIcon />
                </div>
            </div>

            <div className="sidebar__profile">
                <Avatar className={"sidebar__avatar"} src={user.photo} onClick={signOut}/>
                <div className="sidebar__profileInfo">
                    <h3>@{user.displayName.split(" ")[0]}</h3>
                    <p>#{user.uid.substring(0, 5)}</p>
                </div>

                <div className="sidebar__profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;