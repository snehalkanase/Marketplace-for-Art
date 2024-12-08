// import React, { useEffect, useState } from 'react';
import { useContext, useEffect, useState } from 'react';
import Feed from '../../components/feed/Feed';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import "./home.css";
import { AuthContext } from '../../context/AuthContext';

export default function Home() {
    //  const [feed, setFeed] = useState([]);
    const [user, setUser] = useState({});
    const { user:currentUser } = useContext(AuthContext);

  
    window.localStorage.setItem("user", JSON.stringify(currentUser));

    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <Feed />
            </div>
        </>

    )
}