import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: {
    shortenedUrl: string;
    isLoading: boolean;

} = {
    shortenedUrl: "",
    isLoading: false
};

const urlSlice = createSlice({
    name: "url",
    initialState,
    reducers: {
        setShortenedUrl: (state, action: PayloadAction<string>) => {
            state.shortenedUrl = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
    }
});

export const { setLoading, setShortenedUrl } = urlSlice.actions;

export default urlSlice.reducer;