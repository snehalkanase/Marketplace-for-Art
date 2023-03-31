// import React, { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import Feed from '../../components/feed/Feed';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import "./home.css";

export default function Home() {
    //  const [feed, setFeed] = useState([]);
    const [user, setUser] = useState({});

    // useEffect(() => {
    //   const storedFeed = localStorage.getItem("feed");
    //   if (storedFeed) {
    //     setFeed(JSON.parse(storedFeed));
    //   }
    // }, []);
  
    // useEffect(() => {
    //   localStorage.setItem("feed", JSON.stringify(feed));
    // }, [feed]);
    // useEffect(() => {
    //     localStorage.setItem("posts", JSON.stringify(posts));
    //   }, [posts]);

    //   useEffect(() => {
    //     const storedpost = localStorage.getItem("posts");
    //     if (storedpost) {
    //       setPosts(JSON.parse(storedpost));
    //     }
    //   }, []);
    window.localStorage.setItem("user", JSON.stringify(user));

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