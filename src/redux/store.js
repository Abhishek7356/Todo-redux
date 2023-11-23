import { configureStore } from '@reduxjs/toolkit'
import taskSlice from './taskSlice'
import finishedSlice from './finishedSlice'
import taskHistorySlice from './taskHistorySlice'

export const store = configureStore({
    reducer: {
        taskReducer: taskSlice,
        finishedTaskReducer: finishedSlice,
        taskHistoryReducer: taskHistorySlice
    }
})