import React, { useState, createContext } from 'react';
const post = window.localStorage.getItem("post");

const INITIAL_STATE =   {
    posts: post,
    isFetching: false,
    error: false,
};

export const PostContext = createContext(INITIAL_STATE);
export const PostContextProvider = ({ children }) => {

    // Step 2: Define the posts state and update function using useState
    const [posts, setPosts] = useState([]);

    return (

        // Step 3: Wrap your app or relevant components in a PostsContext Provider
        <PostContext.Provider
            value={{ posts,
             setPosts }}>
            {children}
        </PostContext.Provider>

    );
}