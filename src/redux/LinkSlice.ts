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
  newLink: ILink;
  option: {
    offset: number;
    loading: boolean;
  };
}
interface IPayloadLinks {
  payload: ILink[];
}
interface IPayloadLink {
  payload: ILink;
}

interface IOptions {
  limit: number;
  offset: number;
}

const initialState: initialState = {
  Links: [],
  newLink: {
    id: 0,
    short: "",
    target: "",
    counter: 0,
  },
  option: {
    offset: 0,
    loading: false,
  },
};

export const getLinks = createAsyncThunk(
  "links/getLinks",
  async (options: IOptions) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.token,
      },
    };

    const { data } = await axios.get(
      `http://79.143.31.216/statistics?limit=${options.limit}&offset=${options.offset}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.token,
        },
      }
    );
    return data;
  }
);

export const SquezzeLink = createAsyncThunk(
  "links/SquezzeLink",
  async (link: string) => {
    console.log(1);

    const { data } = await axios.post(
      `http://79.143.31.216/squeeze?link=${link}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: sessionStorage.token,
        },
      }
    );

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
    builder
      .addCase(SquezzeLink.fulfilled, (state, { payload }: IPayloadLink) => {
        state.newLink = payload;
        return state;
      })
      .addCase(getLinks.pending, (state) => {
        state.option.loading = true;
        return state;
      })
      .addCase(getLinks.fulfilled, (state, { payload }: IPayloadLinks) => {
        state.Links = payload;
        state.option.loading = false;
        return state;
      });
  },
});

export default linkSlice.reducer;
export const { clearState, setPage } = linkSlice.actions;
