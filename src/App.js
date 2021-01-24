import React, {useEffect} from "react";
import './App.css';
import Sidebar from "./components/Sidebar/Sidebar";
import Chats from "./components/Chats/Chats";
import {useDispatch, useSelector} from "react-redux";
import {login, selectUser, logout} from "./features/userSlice";
import {auth} from "./firebase";
import Login from "./components/Login/Login";

function App() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //user is logged in
                dispatch(login({
                    uid: authUser.uid,
                    photo: authUser.photoURL,
                    email: authUser.email,
                    displayName: authUser.displayName
                }))
            } else {
                //user is not logged in
                dispatch(logout());
                console.log("user is logged out")
            }
        })
    }, [dispatch])
    return (
        <div className="app">
            {user ?
                <>
                    <Sidebar/>
                    <Chats/>
                </> : <Login />
            }
        </div>
    );
}

export default App;
