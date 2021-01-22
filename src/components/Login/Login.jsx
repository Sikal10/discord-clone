import React from 'react';
import './Login.css'
import Button from "@material-ui/core/Button";
import {auth, provider} from "../../firebase";

const link = "https://cdn.arstechnica.net/wp-content/uploads/2017/08/Discord-LogoWordmark-Color-760x272.png"

const Login =  () => {
    const signIn = async () => {
        try {
            await auth.signInWithPopup(provider);
        } catch (err) {
            alert(err)
        }
    }
    return (
        <div className={"login"}>
            <div className="login__logo">
                <img className={"logo__image"} src={link} alt=""/>
            </div>

            <Button onClick={signIn}>Sign in</Button>

        </div>
    );
};

export default Login;