import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    isLoggedIn: boolean;
    role: 'passenger' | 'driver' | 'admin' | null;
    profile: any | null;
    token: string | null;
}

const initialState: UserState = {
    isLoggedIn: false,
    role: null,
    profile: null,
    token: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ role: 'passenger' | 'driver' | 'admin'; profile: any; token: string }>) => {
            state.isLoggedIn = true;
            state.role = action.payload.role;
            state.profile = action.payload.profile;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.role = null;
            state.profile = null;
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
