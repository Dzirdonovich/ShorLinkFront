import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import qs from "qs";
const initialState = {
  newUser: {
    username: "",
    password: "",
  },
};
interface INewUser {
  username: string;
  password: string;
}

export const register = createAsyncThunk(
  "users/register",
  async (newUser: INewUser) => {
    // const data = ({ username: newUser.username, password: newUser.password } =
    //   newUser);
    // console.log(data);
    //
    // const options = {
    //   method: "POST",
    //   headers: { "content-type": "application/x-www-form-urlencoded" },
    //   data: qs.stringify(data),
    //   url: "http://79.143.31.216/register",
    // };
    // const response = await axios(options);

    // const params = new URLSearchParams();
    // params.append("username", newUser.username);
    // params.append("password", newUser.password);

    const { data } = await axios.post(
      `http://79.143.31.216/register?username=${newUser.username}&password=${newUser.password}`
    );
    initialState.newUser.username = "";
    initialState.newUser.password = "";
    console.log(data);
  }
);
export const login = createAsyncThunk(
  "users/login",
  async (newUser: INewUser) => {
    // const newData = ({
    //   username: newUser.username,
    //   password: newUser.password,
    // } = newUser);

    // const options = {
    //   method: "POST",
    //   headers: { "content-type": "application/x-www-form-urlencoded" },
    //   data: qs.stringify(newData),
    //   url: "http://79.143.31.216/login",
    // };

    const response = await axios.post(
      "http://79.143.31.216/login",
      qs.stringify({ username: newUser.username, password: newUser.password })
    );
    localStorage.token = "Bearer " + response.data.access_token;
    console.log(localStorage.token);

    // const params = new URLSearchParams();
    // params.append("username", newUser.username);
    // params.append("password", newUser.password);
    // console.log(params.get);
    // const { data } = await axios.post(`http://79.143.31.216/login`, params);
    initialState.newUser.username = "";
    initialState.newUser.password = "";
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setNewUser: (state, { payload }) => {
      console.log(payload);
      state.newUser.username = payload.username;
      state.newUser.password = payload.password;
    },
  },
  extraReducers: {},
});

export default userSlice.reducer;
export const { setNewUser } = userSlice.actions;
