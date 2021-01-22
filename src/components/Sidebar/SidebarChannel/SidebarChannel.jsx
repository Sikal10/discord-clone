import React from 'react';
import "./SidebarChannel.css"
import {useDispatch} from "react-redux";
import {setChannelInfo} from "../../../features/appSlice";


const SidebarChannel = ({id, channelName}) => {
    const dispatch = useDispatch();

    const updateChannelInfo = () => {
        dispatch(setChannelInfo({
            channelId: id,
            channelName
        }))
    }

    return (
        <div className={"sidebarChannel"} onClick={updateChannelInfo}>
            <h4>
                <span className="sidebarChannel__hash">#</span>{channelName}
            </h4>
        </div>
    );
};

export default SidebarChannel;