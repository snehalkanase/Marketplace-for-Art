import {  ExploreOutlined, FavoriteBorder, Home, LocalMallOutlined, LogoutOutlined, NotificationsNone, PersonOutline, Search } from '@mui/icons-material';
import React, { useContext } from 'react';
import {  NavLink } from 'react-router-dom';
import "./sidebar.css";
import { AuthContext } from '../../context/AuthContext';


export default function Sidebar() {
    const {user} = useContext(AuthContext); 
  return (
    <div class="sidebar">
            <div class="sidebarWrapper">
                <ul class="sidebarList">
                    <li class="sidebarListItem">
                        <div class="sidebarIcon">
                            <Home className='sidebarIcon1'/>
                        </div>
                        <NavLink to="/" style={{textDecoration:"none"}}>
                        <span class="listItemText">Home</span>
                        </NavLink>
                        
                    </li>
                    <li class="sidebarListItem">
                        <div class="sidebarIcon">
                            <NotificationsNone className='sidebarIcon1'/>
                        </div>
                        <NavLink to="/notification" style={{textDecoration:"none"}}>
                        <span class="listItemText">Notification</span>
                        </NavLink>
                    </li>
                    <li class="sidebarListItem">
                        <div class="sidebarIcon">
                            <FavoriteBorder className='sidebarIcon1'/>
                        </div>
                        <NavLink to={`/${user._id}/wishlist`} style={{textDecoration:"none"}}>
                        <span class="listItemText">Wishlist</span>
                        </NavLink>
                    </li>
                    <li class="sidebarListItem">
                        <div class="sidebarIcon">
                            <LocalMallOutlined className='sidebarIcon1'/>
                        </div>
                        <NavLink to="/orders/myOrders" style={{textDecoration:"none"}}>
                        <span class="listItemText">My Orders</span>
                        </NavLink>
                    </li>
                    <li class="sidebarListItem">
                        <div class="sidebarIcon">
                            <ExploreOutlined className='sidebarIcon1'/>
                        </div>
                        <NavLink to="/explore" style={{textDecoration:"none"}}>
                        <span class="listItemText">Explore Art</span>
                        </NavLink>
                    </li>
                    <li class="sidebarListItem">
                        <div class="sidebarIcon">
                            <PersonOutline className='sidebarIcon1'/>
                        </div>
                        <NavLink to = {`/profile/${user.username}`} style={{textDecoration:"none"}}>
                        <span class="listItemText">Profile</span>
                        </NavLink>
                        
                    </li>
                    <li class="sidebarListItem">
                        <div class="sidebarIcon">
                            <LogoutOutlined className='sidebarIcon1'/>
                        </div>
                        <NavLink to="/login" style={{textDecoration:"none"}}>
                        <span class="listItemText">Log Out</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
  )
}
