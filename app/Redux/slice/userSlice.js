import { createSlice } from "@reduxjs/toolkit";

const data = {
    bookmark: [],
    likeNovelData: [],
    darkModeTheme: '',
    globalLoader: false,
    coinHistory: '',
    loader: false,
    notificationBookmark: ''
}

export const userSlice = createSlice({
    name: "user",
    initialState: data,
    reducers: {
        BOOKMARK: (state, action) => {
            state.bookmark = action.payload
        },
        LIKE_NOVEL: (state, action) => {
            state.likeNovelData = action.payload
        },
        THEME: (state, action) => {
            state.darkModeTheme = action.payload
        },
        PAGE_LOADER: (state, action) => {
            state.likeNovelData = action.payload
        },
        COIN_HISTORY: (state, action) => {
            state.coinHistory = action.payload
        },
        SET_LOADER: (state, action) => {
            state.loader = action.payload
        },
        NOTIFICATION_BOOKMARK: (state, action) => {
            state.notificationBookmark = action.payload
        },
        RESET_REDUX: (state, action) => {
            state = data;
        }
    }
})

export const getUser = (state) => state.user;

export const { BOOKMARK, LIKE_NOVEL, THEME, PAGE_LOADER, COIN_HISTORY, RESET_REDUX, SET_LOADER, NOTIFICATION_BOOKMARK } = userSlice.actions;
export default userSlice.reducer;