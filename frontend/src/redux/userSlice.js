import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null

    }, //setUserData("ayush")
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
            localStorage.setItem("userData", JSON.stringify(action.payload));
        },
    },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;