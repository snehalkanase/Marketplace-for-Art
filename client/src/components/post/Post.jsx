import { CurrencyRupee } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react'
import "./post.css";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addItemsToCart } from '../../actions/cartAction';
import { useSelector, useDispatch} from 'react-redux';



export default function Post({ post, wishlist }) {
  const [likes, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  // const { dispatch } = useWishlistContext();
  const { id } = post;
  const history = useNavigate();

  const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

  //fetch users

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUsers();
  }, [post.userId]);

  //like function
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);


  // like
  const likeHandler = () => {
    try {
      axios.put("/post/" + post._id + "/like", { userId: currentUser._id })
 
    } catch (err) {
      console.log(err)
    }
    setLike(isLiked ? likes - 1 : likes + 1)
    setIsLiked(!isLiked)
  }


  //wishlist
  const wishHandler = () => {
    const wishlists = {
      userId: currentUser._id,
      postId: post._id
    }
    console.log(post)
    try {
      axios.put("/post/"+currentUser._id+"/wishlist", wishlists);
       window.location.reload();
    //    toast.success('Added to Wishlist !', {
    //     position: toast.POSITION.TOP_CENTER,
    // });
      // dispatch({ type: "WISHLIST", payload: {id, post}});
    } catch (err) {
      console.log(err)
    }
  };


  //Buy


  const buyHandler = () =>{
    const cart = {
      postId: post._id
    }
    console.log(post)
    dispatch(addItemsToCart(post));
  //   toast.success('Added to cart!', {
  //     position: toast.POSITION.TOP_CENTER,
  // });
  history("/cart")
  }


  const HomePost = () => {
    return (
      <>
        <div class="post">
          <div class="postWrapper">
            <div class="postTop">
              <div class="postTopLeft">
                <a href={`profile/${user.username}`}>
                  <img class="postProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "persons/avatar.png"}
                    alt="" />
                </a>
                <span class="postUsername">{user.username}</span>
                <span class="postDate">{post.updatedAt}</span>
              </div>
              <div className='postCard'>
              <div class="postTopRight">
                <CurrencyRupee />
                <span className="price">{post.price}</span>
              </div>
              <button onClick={() => buyHandler()} className='buy'>Buy</button>
              </div>
            </div>
            <div class="postCenter">
              <span class="postText">{post?.desc}</span>

              <img src={PF + post.img} alt="" class="postImg" />
            </div>
            <div class="postBottom">
              <div class="postBottomLeft">
                <img className="likeIcon" src={`${PF}Like-Button-PNG.png`} alt="" onClick={likeHandler} />
                <img className="heartIcon" src={`${PF}heartlike.png`} alt="" onClick={() => wishHandler(post)} />Wishlist
                <span class="postLikeCounter">{likes} likes</span>
              </div>
              <div class="postBottomRight">
                {/* <span class="postCommentText">{post.comments}Comments</span> */}

              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </>
    );
  };


  const WishlistPost = () => {
    return (
      <>
        <div className="postwish">
          <div class="postWrapperwish">
            <div class="postTop">
              <div class="postTopLeft">
                <a href={`profile/${user.username}`}>
                  <img class="postProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "persons/avatar.png"}
                    alt="" />
                </a>
                <span class="postUsername">{user.username}</span>
                <span class="postDate">{moment(post.created_at).fromNow()}</span>
              </div>
              <div class="postTopRightwish">
                <CurrencyRupee />
                <span className="price">{post.price}</span>
                <button className='buy' onClick={() => buyHandler()}>Buy</button>
              </div>
            </div>
            <div class="postCenterwish">
              <span class="postText">{post?.desc}</span>

              <img src={PF + post.img} alt="" class="postImgwish" />
            </div>
            <div class="postBottomwish">
              <div class="postBottomLeft">
                <img className="likeIcon" src={`${PF}Like-Button-PNG.png`} alt="" onClick={likeHandler} />
                <span class="postLikeCounter">{likes} likes</span>
                <img className="heartIcon" src={`${PF}heartlike.png`} alt="" onClick={() => wishHandler(post)} />Remove from Wishlist

              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </>
    )
  }
  //post style
  return (
    <>
      {wishlist ? <WishlistPost /> : <HomePost />}
    </>
  )
}
