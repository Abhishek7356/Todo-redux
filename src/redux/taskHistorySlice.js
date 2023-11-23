import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const taskHistorySlice = createSlice({
    name: 'task history',
    initialState,
    reducers: {
        taskHistory: (state, action) => {
            state.unshift(action.payload)
        },
        editDone: (state, action) => {
            return state.map((item) => {
                if (item.task == action.payload) {
                    return {task:item.task, isDone: true}
                } else {
                    return item
                }
            });
        },
    }
});

export const { taskHistory, editDone } = taskHistorySlice.actions;
export default taskHistorySlice.reducer;