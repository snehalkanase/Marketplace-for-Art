import { Add } from '@mui/icons-material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import "./rightbar.css";


export default function Rightbar() {
    const { user } = useContext(AuthContext);
    const username = useParams().username;

  return (
    <>
    <div className="rightbar">
        <div className="followers">
        <h4 className="rightbarTitle">Followers:</h4>
        <div className="rightbarFollowers"> {user.followers.length}</div>

        </div>

        <div className="followings">
        <h4 className="rightbarTitle">Followings:</h4>
        <div className="rightbarFollowings">{user.followings.length}</div>
        
        </div>
    </div>
    </>
   
  )
}
