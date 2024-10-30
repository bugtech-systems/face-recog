import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { GET_PROFILES_URL, UPLOAD_PROFILE_IMAGE } from 'utils/api'


const initialState = {
    profiles: [],
    totalRecordCount: 0,
    totalScannedCount: 0
}

export const getDataProfiles = createAsyncThunk(
    'data/getDataProfiles',
    async (credentials,{rejectWithValue}) => {
        let response = {}
        await axios.get(GET_PROFILES_URL).then(({data}) => {
            response = data
        }).catch(e => {
                response = rejectWithValue(e)
            })
        return response
    }
)


export const uploadProfileImage = createAsyncThunk(
    'data/uploadProfileImage',
    async (credentials,{rejectWithValue}) => {
        let response = {}
        await axios.post(UPLOAD_PROFILE_IMAGE, credentials,{
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            ).then(r => {
                response =  r.data;
            }).catch(e => {
                response = rejectWithValue(e)
            })
        return response
    }
)


export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setProfilesData: (state, action) => {
            state.profiles = action.payload
        },
        clearProfilesData: (state, action) => {
            state.profiles = action.payload
        }, 
    },
    extraReducers: (builder) => {
        builder
        .addCase(getDataProfiles.pending, (state, action) => {
        console.log(state.data, 'STATE Pending')
            // state.data.profiles = []
        })
        .addCase(getDataProfiles.fulfilled, (state, action) => {
            // state.data.profiles = action.payload
            console.log(state.data, 'STATE Fullfilled')

        })
        .addCase(getDataProfiles.rejected, (state, action) => {
            // state.data.profiles = []
            console.log(state.data, 'STATE Rej')

        })
    }
})

export const getProfiles = state => state.data.profiles
export const getTotalRecordsCount = state => state.data.totalRecordCount
export const getTotalScannedCount = state => state.data.totalScannedCount



export const { setProfilesData, clearProfilesData } = dataSlice.actions
export default dataSlice.reducer