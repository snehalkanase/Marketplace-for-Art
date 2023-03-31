import { FOLLOW, FOLLOWING, UNFOLLOW } from "../constantes/followConstantes";


export const follow = (userId)=> async (dispatch, getState) => {

    dispatch({
        type: FOLLOW,
        payload: userId,

    }); 
    localStorage.setItem("followers", JSON.stringify(getState().followers));
};

export const following = (userId)=> async (dispatch, getState) => {

    dispatch({
        type: FOLLOWING,
        payload: userId,

    }); 
    localStorage.setItem("followings", JSON.stringify(getState().followings));
};

export const unfollow = (userId)=> async (dispatch, getState) => {

    dispatch({
        type: UNFOLLOW,
        payload: userId,

    }); 
    localStorage.setItem("unfollow", JSON.stringify(getState().unfollow));
};

