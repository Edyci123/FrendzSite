import React, { useContext } from "react";
import { Redirect } from "@reach/router";
import { UserContext } from "../App";


const Content = ({ logOutCallback }) => {
    const [user] = useContext(UserContext);
    if (!user.accesstoken) return <Redirect from='' to='login' noThrow />
    return (
        <div>
            <div>Content</div>
            <button className="button-5" role="button" onClick={logOutCallback}>Log out</button>
        </div>
    )
}

export default Content;