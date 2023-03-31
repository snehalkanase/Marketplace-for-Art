const WishlistReducer =(state, action) => {
    if(action.type = "WISHLIST") {
        let {id, post} = action.payload;
        // console.log(post);

        let wishlistPost;

        wishlistPost ={
            id:post._id,
            userId: post.userId,
            desc : post.desc,
            price : post.price,
            img: post.img,
            likes: post.likes,
        };
        
        return {
            ...state,
            wishlist:[ ...state.wishlist, wishlistPost],
        };
        
    }
    return state;
};

export default  WishlistReducer;
