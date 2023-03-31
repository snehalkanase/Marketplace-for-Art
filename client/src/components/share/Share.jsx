import { Cancel, EmojiEmotions, LocalOfferOutlined, LocationOnOutlined, PermMediaOutlined } from '@mui/icons-material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import "./share.css";
import { AuthContext } from '../../context/AuthContext';
// import { PostContext } from '../../context/PostContext';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


export default function Share({ profile }) {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const price = useRef();
    const [file, setFile] = useState(null);
    const [ setPosts ] = useState([]);

    
    //   useEffect(() => {
    //     localStorage.setItem("posts", JSON.stringify(posts));
    //   }, [posts]);

    //   useEffect(() => {
    //     const storedpost = localStorage.getItem("posts");
    //     if (storedpost) {
    //       setPosts(JSON.parse(storedpost));
    //     }
    //   }, []);

    const submitHandler = async (e) => {
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
            price: price.current.value,
            // img: file.current.value
        };

        if (file) {
            const data = new FormData();
            const fileName = file.name;
            data.append("file", file);
            data.append("name", fileName);
            newPost.img = fileName;

            try {
                await axios.post("/upload", data);
                
            } catch (err) {
                console.log(err);
            }
            
        }
        try {
            await axios.post("/post", newPost);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };


    const HomeShare = () => {
        return (
            <>
             <div class="share">
            <form class="shareWrapper" onSubmit={submitHandler}>

                <div class="sharetop">
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + "persons/avatar.png"} alt="" class="shareProfileImg" />
                    <input type="text" name="desc" placeholder={"What's in your mind " + user.username + "?"}
                        ref={desc} class="shareInput" />
                    <input type="text" name="price" placeholder="price of Art" ref={price} class="shareInput2" />

                </div>
                <hr class="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                        <Cancel className='shareCancel' onClick={()=> setFile(null)}/>
                    </div>
                )}
                <div class="shareButton">
                    <div class="shareOptions">

                        <label htmlFor='file' class="shareOption">
                            <PermMediaOutlined htmlColor="tomato" className='shareIcon' />
                            <span class="shareOptionText" >
                                <input style={{ display: "none" }} type="file" name="img" id="file" accept='.png, .jpeg, .jpg '
                                    onChange={(e) => setFile(e.target.files[0])} class="shareOptionText"/>
                                Photo or Video</span>
                        </label>
                        <div class="shareOption">
                            <LocalOfferOutlined htmlColor="green" className='shareIcon' />
                            <span class="shareOptionText">Tag</span>
                        </div>
                        <div class="shareOption">
                            <LocationOnOutlined htmlColor="blue" className='shareIcon' />
                            <span class="shareOptionText">Location</span>
                        </div>
                        <div class="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className='shareIcon' />
                            <span class="shareOptionText">Emoji</span>
                        </div>
                    </div>
                    <button class="shareButton" type='submit'>Share</button>
                </div>

            </form>
        </div>

            </>
        )
    }

    const ProfileShare = () => {
        return (
            <>
             <div class="prshare">
            <form class="prshareWrapper" onSubmit={submitHandler}>

                <div class="sharetop">
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + "persons/avatar.png"} alt="" class="shareProfileImg" />
                    <input type="text" name="desc" placeholder={"What's in your mind " + user.username + "?"}
                        ref={desc} class="shareInput" />
                    <input type="text" name="price" placeholder="price of Art" ref={price} class="shareInput2" />

                </div>
                <hr class="shareHr" />
                <div class="shareButton">
                    <div class="shareOptions">

                        <label htmlFor='file' class="shareOption">
                            <PermMediaOutlined htmlColor="tomato" className='shareIcon' />
                            <span class="shareOptionText" >
                                <input style={{ display: "none" }} type="file" name="img" id="file" accept='.png, .jpeg, .jpg '
                                    onChange={(e) => setFile(e.target.files[0])} class="shareOptionText"/>
                                Photo or Video</span>
                        </label>
                        <div class="shareOption">
                            <LocalOfferOutlined htmlColor="green" className='shareIcon' />
                            <span class="shareOptionText">Tag</span>
                        </div>
                        <div class="shareOption">
                            <LocationOnOutlined htmlColor="blue" className='shareIcon' />
                            <span class="shareOptionText">Location</span>
                        </div>
                        <div class="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className='shareIcon' />
                            <span class="shareOptionText">Emoji</span>
                        </div>
                    </div>
                    <button class="shareButton" type='submit'>Share</button>
                </div>

            </form>
        </div>
            </>

        )
    }

    return (
       <>
      {profile ? <ProfileShare /> : <HomeShare />}
    </>
    )
}
