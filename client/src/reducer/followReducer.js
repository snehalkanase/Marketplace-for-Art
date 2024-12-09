import { FOLLOW, FOLLOWING, UNFOLLOW } from "../constantes/followConstantes";

export const followReducer = (state ={followers:[], followings:[]}, action) => {
    switch (action.type){
        case FOLLOW:
            let follow = action.payload;

                return{
                    ...state,
                    followers: [...state.user.followers, follow],
                };
        case FOLLOWING:
            const following = action.payload;
            return{
                ...state,
                followings: [...state.user.followings, following],
            };

            case UNFOLLOW:
                return {
                    ...state,
                    user:{
                        ...state.user,
                        followings: state.user.followings.filter((following) => following !== action.payload),
                    },
                };
            
            default:
                 return state;
    }
}