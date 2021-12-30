import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "@reach/router";
import { UserContext } from '../App';

const Protected = ( {logOutCallback} ) => {
    const [user] = useContext(UserContext);
    const [content, setContent] = useState('You need to login');

    useEffect(() => {
        async function fetchProtected() {
            const result = await (await fetch('http://192.168.0.103:4000/getContacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${user.accesstoken}`
                }
            })).json();
            console.log(result);
            if (result.message) {
                setContent(result.message);
            } 
        }
        fetchProtected();
    }, [user]);
    
    
    if ( content === 'You need to login')
        return <div>{content}</div>;

    return (
        <div>
            <div>{content}</div>
            <button className="button-5" role="button" onClick={logOutCallback}>Log out</button> 
        </div>

    );
}

export default Protected;