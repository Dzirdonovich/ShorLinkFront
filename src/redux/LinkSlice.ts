import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Interface } from "readline";

interface ILink {
  id: number;
  short: string;
  target: string;
  counter: number;
}

interface initialState {
  Links: ILink[];
  option: {
    offset: number;
  };
}
interface IPayloadLink {
  payload: ILink[];
}

interface IOptions {
  limit: number;
  offset: number;
}

const initialState: initialState = {
  Links: [],
  option: {
    offset: 0,
  },
};

export const getLinks = createAsyncThunk(
  "links/getLinks",
  async (options: IOptions) => {
    console.log();
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
  reducers: {
    clearState: (state) => {
      console.log(state);
      state.Links.length = 0;
      console.log(state);
    },
    setPage: (state, { payload }) => {
      payload === "PLUS" ? state.option.offset++ : state.option.offset--;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLinks.fulfilled, (state, { payload }: IPayloadLink) => {
      state.Links = payload;
      return state;
    });
  },
});

export default linkSlice.reducer;
export const { clearState, setPage } = linkSlice.actions;
