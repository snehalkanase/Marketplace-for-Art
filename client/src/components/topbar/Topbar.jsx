import { ShoppingCartOutlined } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./topbar.css";
import { AuthContext } from '../../context/AuthContext';
import { useSelector } from 'react-redux';


export default function Topbar() {
    const {user} = useContext(AuthContext); 
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { cartItems } = useSelector((state) => state.cart);
    const [query, setQuery] = useState("");
    console.log(query);
    return(
        <div class="topbar">
            <div class="topbarContainer">
                <div class="topbarLeft">
                    <Link to="/" style={{textDecoration:"none"}}>
                    <span class="logo">Artovox</span>
                    </Link>
                    
                </div>
                <div class="topbarCenter">
                    <form action="">
                    <div class="searchbar">
                        <SearchIcon  />
                        <input type="text" 
                        class="searchInput" 
                        placeholder="Search for Friends or Post "
                        onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    </form>
                    
                </div>
                <div class="topbarRight">
                    <NavLink to="/cart">
                    <div class="topbarIcon">
                        <div className="icon">
                        <ShoppingCartOutlined  />
                        </div>
                        <span class="topbarIconBadge">{cartItems.length}</span>
                    </div>
                    </NavLink>
                    <Link to = {`/profile/${user.username}`}>
                    <img src={user.profilePicture ? PF + user.profilePicture :  PF+"persons/avatar.png"} 
                    alt="" class="topbarImg"/>
                    </Link>
                </div>
    
            </div>
    </div>
    );
}   