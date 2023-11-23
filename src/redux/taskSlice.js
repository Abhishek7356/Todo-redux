import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.unshift(action.payload)
        },
        deleteTask: (state, action) => {
            return state.filter((item) => item != action.payload);
        },
        editTask: (state, action) => {
            return state.map((item) => {
                if (item == action.payload.editingTask) {
                    return action.payload.task
                } else {
                    return item
                }
            });
        },
    }
});

export const { addTask, deleteTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;