import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { LOGIN_URL, LOGOUT_URL, REGISTER_URL, CREATE_PROFILE } from 'utils/api'


const initialState = {
    activeTab: 0,
    activeSource: 'webcam',
    cameraStatus: 'closed',
    isFlashing: false,
    label: null,
    profile: {
        picture1: null,
        picture2: null,
            firstName: null,
            lastName: null,
            middleName: null,
            phone: null,
            birthDate: null,
            city: "Villaba",
            province: "Leyte",
            brgy: "",
            country: "philippines"
    },
    request: {
        status: null,
        code: 0,
        msg: null,
        url: null,
        screenshot: null,
        login: {
            password: null
        },
        register: {
            firstName: null,
            lastName: null,
            middleName: null,
            phone: null,
            birthDate: null
        }
    },
    user: null,
    error: {
        login: {
            password: null,
            screenshot: null,
            serverErr: null
        },
        profile: {
            firstName: null,
            lastName: null,
            middleName: null,
            phone: null,
            birthDate: null
        },
         register: {
            firstName: null,
            lastName: null,
            middleName: null,
            phone: null,
            birthDate: null
        }
    }
}

// axios.defaults.headers['Accept'] = 'application/json'

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (credentials,{rejectWithValue}) => {
        let response = {}
        await axios.post(REGISTER_URL,
                {...credentials}
            ).then(r => {
                response = {status: r.status, data: r.data}
            }).catch(e => {
                response = rejectWithValue(e)
            })
        return response
    }
)

export const createProfile = createAsyncThunk(
    'auth/createProfile',
    async (credentials,{rejectWithValue}) => {
        let response = {}
        await axios.post(CREATE_PROFILE,
                credentials
            ).then(r => {
                response = {status: r.status, data: r.data}
            }).catch(e => {
                response = rejectWithValue(e)
            })
        return response
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (credentials,{rejectWithValue}) => {
        let response = {}
        await axios.post(LOGOUT_URL,
                {...credentials}
            ).then(r => {
                response = {status: r.status, data: r.data}
            }).catch(e => {
                response = rejectWithValue(e)
            })
        return response
    }
)
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials,{rejectWithValue}) => {
        let response = {}
        await axios.post(LOGIN_URL,
                {...credentials}
            ).then(r => {
                response = {status: r.status, data: r.data}
            }).catch(e => {
                response = rejectWithValue(e)
            })
        return response
    }
)



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload
        },
        setActiveSource: (state, action) => {
            state.activeSource = action.payload
        },
        setCameraStatus: (state, action) => {
            state.cameraStatus = action.payload
        },
        setIsFlashing: (state, action) => {
            state.isFlashing = action.payload
        },
        setRegisterName: (state, action) => {
            state.request.register.name = action.payload
        },
        setScreenshot: (state, action) => {
            state.request.screenshot = action.payload
        },
        setRegisterEmail: (state, action) => {
            state.request.register.email = action.payload
        },
        setRegisterPassword: (state, action) => {
            state.request.register.password = action.payload
        },
        setRegisterRepeatPassword: (state, action) => {
            state.request.register.repeatPassword = action.payload
        },
        setLoginEmail: (state, action) => {
            state.request.login.email = action.payload
        },
        setLoginPassword: (state, action) => {
            state.request.login.password = action.payload
        },
        setUser: (state, action) => {
            if(action.payload == null){
                localStorage.removeItem('user')
            } else {
                localStorage.setItem('user', JSON.stringify(action.payload.user))
            }
            state.user = action.payload
        },
        setProfile: (state, action) => {
            state.profile = { ...state.profile, ...action.payload }
        },
        resetAuthState: (state) => {
            state.activeTab = 'login'
            state.activeSource = 'webcam'
            state.request = {
                status: null,
                code: 0,
                msg: null,
                screenshot: null,
                login: {password: null},
                register: {name: null,email: null,password: null,repeatPassword: null}
            }
            state.error = {
                login: {password: null,screenshot: null,serverErr: null},
                register: {name: null,email: null,password: null,repeatPassword: null,screenshot: null,serverErr: null}
            }
        },
        setAuthError: (state, action) => {
            Object.keys(action.payload).map(s => {
                return Object.keys(action.payload[s]).map(v => {
                    return state.error[s][v] = action.payload[s][v]
                })
            })
        },
        setURL: (state, action) => {
            state.request.url = action.payload
        },
         setLabel: (state, action) => {
            state.label = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.request.status = 'pending'
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.request.status = 'fulfilled'
            state.request.code = action.payload.status
            state.user = action.payload.data
            localStorage.setItem('user', JSON.stringify(action.payload.data))    
            state.error.register.serverErr = null
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.request.status = 'rejected'
            if (action.payload.response) {
                state.request.code = action.payload.response.status
                state.error.register.serverErr = 'SERVER ERROR: ' + action.payload.response.data
            } else {
                state.request.code = 500
                state.error.register.serverErr = 'SERVER ERROR: ' + action.payload.message
            }
        })
        .addCase(logoutUser.pending, (state) => {
            state.request.status = 'pending'
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            state.request.status = 'fulfilled'
            state.request.code = action.payload.status
            state.request.msg = action.payload.data
            state.user = null
            localStorage.removeItem('user')
            state.error.login.serverErr = null            
        })
        .addCase(logoutUser.rejected, (state,action) => {
            state.request.status = 'rejected'
            if (action.payload.response) {
                state.request.code = action.payload.response.status
                state.error.login.serverErr = 'SERVER ERROR: ' + action.payload.response.data
            } else {
                state.request.code = 500
                state.error.login.serverErr = 'SERVER ERROR: ' + action.payload.message
            }
            state.user = null
            localStorage.removeItem('user')
        })
        .addCase(loginUser.pending, (state) => {
            state.request.status = 'pending'
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.request.status = 'fulfilled'
            state.request.code = action.payload.status
            state.user = action.payload.data
            localStorage.setItem('user', JSON.stringify(action.payload.data))    
            state.error.login.serverErr = null
        })
        .addCase(loginUser.rejected, (state,action) => {
            state.request.status = 'rejected'
            if (action.payload.response) {
                state.request.code = action.payload.response.status
                state.error.login.serverErr = 'SERVER ERROR: ' + action.payload.response.data
            } else {
                state.request.code = 500
                state.error.login.serverErr = 'SERVER ERROR: ' + action.payload.message
            }
        })
       
    }
})

export const getActiveTab = state => state.auth.activeTab
export const getActiveSource = state => state.auth.activeSource
export const getCameraStatus = state => state.auth.cameraStatus
export const getIsFlashing = state => state.auth.isFlashing
export const getScreenshot = state => state.auth.request.screenshot
export const getRequest = state => state.auth.request
export const getUser = state => (localStorage.getItem('user') != null) ? JSON.parse(localStorage.getItem('user')) : state.auth.user
export const getProfile = state => state.auth.profile
export const getAuthError = state => state.auth.error
export const getURL = state => state.auth.request.url
export const getLabel = state => state.auth.label

export const {setLabel, setActiveTab, setActiveSource, setCameraStatus, setIsFlashing, setScreenshot, setRegisterName, setRegisterEmail, setRegisterPassword, setRegisterRepeatPassword, setLoginEmail, setLoginPassword, setUser, resetAuthState, setAuthError, setURL, setProfile } = authSlice.actions
export default authSlice.reducer