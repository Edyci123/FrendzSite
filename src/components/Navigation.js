import React from "react";
import { Link } from '@reach/router'

const Navigation = ({ logOutCallback }) => (
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/contacts">Your contacts</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/addcontacts">Add a new Contact</Link></li>
    </ul>
)

export default Navigation;