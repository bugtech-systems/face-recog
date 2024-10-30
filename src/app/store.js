import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import facenetReducer from '../features/auth/facenetSlice'
import matchReducer from '../features/dashboard/matchSlice'
import detectReducer from '../features/dashboard/detectSlice'
import uiReducer from '../features/dashboard/uiSlice'
import dataReducer from '../features/dashboard/dataSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        facenet: facenetReducer,
        match: matchReducer,
        detect: detectReducer,
        ui: uiReducer,
        data: dataReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }),
})
