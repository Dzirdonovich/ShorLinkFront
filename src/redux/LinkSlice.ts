import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Interface } from "readline";

interface ILink {
  id: number;
  short: string;
  target: string;
  counter: number;
}
interface IPayloadLink {
  payload: ILink[];
}

interface IOptions {
  limit: number;
  offset: number;
}

const initialState: ILink[] = [];

export const getLinks = createAsyncThunk(
  "links/getLinks",
  async (options: IOptions) => {
    let config = {
      headers: {
        Authorization: localStorage.token,
      },
    };

    const { data } = await axios.get(
      `http://79.143.31.216/statistics?limit=${options.limit}&offset=${options.offset}`,
      config
    );
    console.log(data);
    return data;
  }
);

const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLinks.fulfilled, (state, { payload }: IPayloadLink) => {
      state = payload;
      return state;
    });
  },
});

export default linkSlice.reducer;
export const {} = linkSlice.actions;
