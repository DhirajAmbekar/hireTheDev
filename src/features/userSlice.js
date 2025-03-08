import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async action to fetch user data
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  return response.json();
});

const userSlice = createSlice({
  name: "user",
  initialState: { name: "", email: "", status: "idle" },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.status = "succeeded";
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
