import React, { useContext, useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import "./feed.css";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api';
// import { PostContextProvider } from '../../context/PostContext';
// import { PostContext } from '../../context/PostContext';

// import { Posts } from '../../dummyData';

export default function Feed({ username, profile }) {
  // const { posts, setPosts  } = useContext(PostContext);
  const [posts, setPosts] = useState([]);
  const { user} = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      console.log("success");
      const res = username  
      ? await axios.get(`${api}/post/profile/${username}`)
      : await axios.get(`${api}/post/timeline/${user._id}`);
      setPosts(
        res.data.sort((p1,p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt) 
        })
        // slice(0)
        // .reverse()
        // .map(posts => {
        //   return posts;
        // })
        );
      
    };
    fetchPosts();
  }, [username, user._id]);

  const HomeFeed= () => {
  return (
    <>

      <div class="feed">
      <div class="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />

        ))}
     </div>
    </div>


</>
    );
  };


  const ProfileFeed = () => {
    return (
      <>
      
        <div class="prfeed">
      <div class="prfeedWrapper">
        {(!username || username === user.username) && <Share profile/>}
        {posts.map((p) => (
          <Post key={p._id} post={p} />

        ))}
     </div>
    </div>
      </>
      )
    };
    
  return (
    <>
      {profile ? <ProfileFeed /> : <HomeFeed />}
    </>
  )
}
