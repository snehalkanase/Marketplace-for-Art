import React, { useContext, useEffect, useState } from 'react'
import "./profile.css";
import Feed from '../../components/feed/Feed';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import axios, { Axios } from 'axios';
import { useParams } from 'react-router-dom';
import Rightbar from '../../components/rightbar/Rightbar';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@mui/icons-material';
import { follow, unfollow } from '../../actions/followAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  const { user:currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));
  const [isFollow, setIsFollow] = useState([]);
  const userId = user._id;
  // const [follow, setFollow] = useState(user.followers.lenght);
  // const [following, setFollowing] = useState(user.followings.length);

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?.id));
  },[currentUser, user.id]);


  // useEffect(() => {
  //   setFollowing(currentUser.followings.includes(user._id));
  // }, [user._id, currentUser.followings ]);

  // useEffect(() => {
  //   setFollow(currentUser.followers.includes(user._id));
  // }, [user._id, currentUser.followers ]);


  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUsers();
  }, [username]);                   

  const followClick = async() => {
    const follow = {
      userId: user._id,
    }
    const unfollow = {
      userId: user._id,
    }
    try{
      if(followed){
        await axios.put("/users/"+ user._id +"/unfollow",{userId: user._id});
        dispatch({type: "FOLLOW", payload: currentUser._id});

      //   toast.success('user has been unfollowed !', {
      //     position: toast.POSITION.TOP_CENTER,
          
      // });
        // dispatch(unfollow(userId));
        
     }else{
     const res = await axios.put("/users/"+currentUser._id+"/follow", {userId:user._id});
      dispatch({type: "FOLLOW", payload: currentUser._id});
      // dispatch(follow(userId));
      console.log(res.data)

    //   toast.success('user has been followed !', {
    //     position: toast.POSITION.BOTTOM_CENTER,
    // });

     }
    }catch(err){
      console.log(err)
    }
    setFollowed(!followed);
    setFollowed(isFollow ? followed - 1 : followed + 1)
    setIsFollow(!isFollow)
  }

  window.localStorage.setItem("user", JSON.stringify(user));
  window.localStorage.setItem("follow", JSON.stringify(user.followers));

  return (
    <>
      <Topbar />

      <div class="profile">
        <Sidebar />
        <div className="profileRight">
          <div class="profileRightTop">

            <div class="profileCover">
              <img src={user.coverPicture ? PF + user.coverPicture : PF + "nocover.jpg"} alt="" class="coverPicture" />

              <img src={user.profilePicture ? PF + user.profilePicture : PF + "persons/avatar.png"} alt=""
                class="profilePicture" />

            </div>
            <div class="profileInfo">
              <h4 class="profileName">{user.username}</h4>
              <span class="profileDesc">{user.desc}</span>
            </div>

            {/* <div class="content">
              <div class="followers">Followers:
                <span class="followCount">0</span>

              </div>
              <div class="followings">Followings:
                <span class="followingCount">0</span>
              </div>
            </div> */}
          </div>
          <div class="profileBottom">
            {user.username !== currentUser.username && (
              <button className="followBtn" onClick={followClick}>
                {followed ? "Unfollow" : "Follow"}
                {followed ? <Remove /> : <Add />}
        
              </button>
            )}

            {/* <Rightbar user /> */}
            {/* <div className="rightbar">
        <div className="followers">
        <h4 className="rightbarTitle">Followers:</h4>
        <div className="rightbarFollowers">{follow}</div>

        </div>

        <div className="followings">
        <h4 className="rightbarTitle">Followings:</h4>
        <div className="rightbarFollowings">{user.followings}</div>
        
        </div>
    </div> */}
            <Feed username={username} profile />

          </div>

        </div>
      </div>

      <ToastContainer />

    </>

  )
}
