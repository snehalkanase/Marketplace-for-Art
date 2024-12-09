import React, { useContext, useEffect, useState} from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar';
import "./wishlist.css";
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Post from '../../components/post/Post';
import { useWishlistContext } from '../../context/WishlistContext';
import api from '../../utils/api';


export default function Wishlist() {

  // const { wishlist } = useWishlistContext();
  // console.log( wishlist );
  const { user } = useContext(AuthContext);
  
  const username = useParams().username;
  const [wishlist, setWishlist] = useState([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const res = await axios.get(`/users?username=${username}`); 
  //     setUser(res.data);
  //   };
  //   fetchUsers();
  // }, [username]);

  useEffect(() => {
    const fetchPosts = async () => {
      try{
        console.log("success");
        const res = await axios.get(`${api}/post/${user._id}/wishlist`);
        console.log("wishlist")
         setWishlist(res.data);
      } catch(err){
        console.log(err)
      }
    };
    fetchPosts();
  }, [user._id]);

  


  return (
    <>
      <Topbar />
      <div class="wishlist">
        <Sidebar />
        <div className="wishWrapper">
          <h4>Wishlist</h4>
          <div className="wishlistContainer">
            {wishlist.map((p) => (
            <Post key={p._id} post={p} wishlist/>
            ))}
          </div>

        </div>

      </div>

    </>
  )
}
