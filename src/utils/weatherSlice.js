import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./constant";



//read action

const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

export const getWeatherData = createAsyncThunk("getJob", async (input) => {
  try {
    const response = await axios.get( baseUrl, {
      params: {
        q: input,
        appid: apiKey,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error("Error:", error);
  }
});


export const WeatherDetail = createSlice({
  name: "WeatherDetail",
  initialState: {
    weather: {},
    loading: false,
    error: null,
    showInfo:false,
  },

  reducers: {
    setShowInfo: (state, action) => {
      state.showInfo = action.payload;
    },
  },

  extraReducers: (builder) => {

    builder.addCase(getWeatherData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWeatherData.fulfilled, (state, action) => {
      if (action.payload) {
        state.weather = action.payload;
        state.error = null;
      } else {
        state.weather = null;
        state.error = 'City not found in the response.';
      }
      state.loading = false;
    });
    builder.addCase(getWeatherData.rejected, (state, action) => {
      state.loading = false;
      state.error = "An error occurred while fetching data."
    });

  },

});



export const { setShowInfo } = WeatherDetail.actions;
export default WeatherDetail.reducer;
