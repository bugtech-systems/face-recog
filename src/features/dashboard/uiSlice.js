import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
    errors: {},
    scannerModal: null
}


export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openScannerModal: (state, action) => {
            state.scannerModal = action.payload
        },
        closeScannerModal: (state, action) => {
            state.scannerModal = null
        },
        setErrors: (state, action) => {
            state.errors = action.payload
        },
        clearErrors: (state, action) => {
            state.errors = {}
        }
    }
})

export const getUiScannerModal = state => state.ui.scannerModal;
export const getErrors = state => state.ui.errors;

export const { openScannerModal, closeScannerModal, resetDetections, setErrors, clearErrors } = uiSlice.actions
export default uiSlice.reducer