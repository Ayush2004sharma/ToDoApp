import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY ='7a6302ac7a43470898c102228252603'; // 🔹 Replace with your OpenWeather API key

// Fetch weather data asynchronously
export const fetchWeather = createAsyncThunk("weather/fetchWeather", async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=7a6302ac7a43470898c102228252603&q=${latitude},${longitude}&aqi=no`
          );
          const data = await response.json();
          resolve({
            temp: Math.round(data.current.temp_c), // Temperature in Celsius
            city: data.location.name,
            icon: data.current.condition.icon, // Weather icon URL
          });
        } catch (error) {
          reject(error);
        }
      },
      (error) => reject(error) // Handle location errors
    );
  });
});


const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    temp: null,
    city: null,
    icon: null,
    status: "idle",
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.temp = action.payload.temp;
        state.city = action.payload.city;
        state.icon = action.payload.icon;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
