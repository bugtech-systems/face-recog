// const BACKEND_URL = 'http://localhost:3001'
const BACKEND_URL = 'https://dis3ct.bugtech.online'

// BASE AUTH
const AUTH_URL = '/api/auth'
// BASE FACENET
const PROFILE_URL = '/api/profile'

export const STATIC_URL = BACKEND_URL + '/api/static'

export const REGISTER_URL = BACKEND_URL + AUTH_URL + '/register'
export const LOGIN_URL = BACKEND_URL + AUTH_URL + '/login'
export const LOGOUT_URL = BACKEND_URL + AUTH_URL + '/logout'

export const GET_PROFILES_URL = BACKEND_URL + PROFILE_URL
export const CREATE_PROFILE = BACKEND_URL + PROFILE_URL
export const UPLOAD_PROFILE_IMAGE = BACKEND_URL + PROFILE_URL + '/upload'
export const MATCH_PROFILE = BACKEND_URL + PROFILE_URL + '/recognize'
