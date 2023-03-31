import { createContext, useReducer, useState } from 'react';
import AuthReducer from './AuthReducer';
const user = window.localStorage.getItem("user");
// const post = window.localStorage.getItem("posts");

const INITIAL_STATE = {
    user: 
    //      null
     {
            _id: "6388a468763d6f7ebd05e222",
            username: "snehal",
            email: "snehal@gmail.com",
            profilePicture: "/persons/snehal.jpg",
            coverPicture: "",
            followers: [],
            followings: [],
            isAdmin: false,
            createdAt: "2022-12-01T12:56:08.729+00:00",
            __v: 0,
            desc: "hii",
            wishlist:[]
        }
    // {
    //     _id: "638db967ba802d623c6dc843",
    //     username: "savita",
    //     email: "savita@gmail.com",
    //     profilePicture: "",
    //     coverPicture: "",
    //     followers: [],
    //     followings: [],
    //     isAdmin: false,
    //     createdAt: "2022-12-05T09:27:03.405+00:00",
    //     __v: 0,
    //     desc: "hii",
    //     wishlist: []
    // }
    ,
    isFetching: false,
    error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    // const [user, setUser] = useState(
    //     JSON.parse(localStorage.getItem('user')) || {}
    //   );
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    // useEffect(() => {
    //     localStorage.setItem('user', JSON.stringify(user));
    //   }, [user]);

    return (
        <AuthContext.Provider
            value={{
                user : state.user,
                isFetching : state.isFetching,
                error : state.error,
                dispatch
            }} >
            {children}
        </AuthContext.Provider>

    )
}   
