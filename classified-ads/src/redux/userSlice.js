import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser : null,
    error : null,
    loading : false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers : {
        loginStart: (state)=>{
            state.error = null;
            state.loading = true;
        },
        loginSuccess: (state, action)=>{
            state.error=null;
            state.loading=false;
            state.currentUser=action.payload;
        },
        loginFailure: (state, action) => {
            state.error=action.payload;
            state.loading=false;
        },

        logout: (state) => {
            state.currentUser=null;
            state.error=null;
            state.loading=false;
        } 
    }
})

export const { loginStart, loginFailure, loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;