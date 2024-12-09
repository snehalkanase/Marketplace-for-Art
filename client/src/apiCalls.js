import axios from "axios";
import {
  LoginStart,
  LoginSuccess,
  LoginFailure,
} from "../src/context/AuthActions";
import api from "./utils/api";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch(LoginStart());
  try {
    const res = await axios.post(`${api}/auth/login`, userCredentials);
    if (res.status === 200) {
      dispatch(LoginSuccess(res.data.user));
    }
  } catch (err) {
    const errorPayload = err.response
      ? {
          message: err.response.data?.message || "Login failed",
          status: err.response.status,
        }
      : { message: err.message || "Network error" };

    dispatch(LoginFailure(errorPayload)); // Dispatch failure with detailed error
  }
};
