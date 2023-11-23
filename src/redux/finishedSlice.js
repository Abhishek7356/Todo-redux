import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const finishedSlice = createSlice({
    name: 'finished task',
    initialState,
    reducers: {
        finishedTask: (state, action) => {
            state.unshift(action.payload)
        },
    }
});

export const { finishedTask } = finishedSlice.actions;
export default finishedSlice.reducer;