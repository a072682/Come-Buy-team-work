import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true; 

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export const materialSlice = createSlice({
    name: "material",
    initialState: {
        materialData:null,
    },
    reducers: {
        materialDataUpLoad: (state, action) => {
            state.materialData = action.payload;
        },
    },
  });

  export const { materialDataUpLoad } = materialSlice.actions;

    //#region
    //#endregion

        
export default materialSlice.reducer;