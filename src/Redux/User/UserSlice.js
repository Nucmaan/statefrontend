import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  error: null,
  loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {

        SignInStart: (state) =>{
            state.loading = true
        },

        SignInSuccess: (state, action) => {
            state.user = action.payload
            state.error = null
            state.loading = false
        }, 

        SignInFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },

        SignOutStart: (state) => {
            state.loading = true
        },
        
        SignOutSuccess: (state) => {
            state.user = null
            state.error = null
            state.loading = false
        },
        SignOutFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },

        userUpdateStarted : (state ) => {
            state.loading = true
        },

        userUpdateSuccess : (state, action ) => {
            state.user = action.payload
            state.error = null
            state.loading = false
        },

        userUpdateFailure : (state, action ) => {
            state.error = action.payload
            state.loading = false
        },
        logoutStart : (state ) => {
            state.loading = true
        },
        logoutSuccess : (state ) => {
            state.user = null
            state.error = null
            state.loading = false
        },
        logoutFailure : (state, action ) => {
            state.error = action.payload
            state.loading = false
        }

    },
});

export const { logoutStart, logoutSuccess, logoutFailure, SignInStart, SignInSuccess, SignInFailure, SignOutStart, SignOutSuccess, SignOutFailure, userUpdateStarted, userUpdateSuccess, userUpdateFailure  } = userSlice.actions;

export default userSlice.reducer;