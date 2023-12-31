import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      const response = await axios.post('/register/',user)
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      toast.success('SignUp success')
      return response.data
    } catch (error) {
      const message = error.response.data['email'][0] && error.response.data['first_name'][0]  
      console.log(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    const response = await axios.post('/login/',user)
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      toast.success('Login success')
      return response.data
  } catch (error) {
    const message = error.response.data.msg
    return thunkAPI.rejectWithValue(message)
  }
})

export const verifyEmail = createAsyncThunk('auth/verifyEmail', async ({ uid, token }) => {
  try {
    await axios.get('/verify/:uidb64/:token/', { uid, token });
    return 'Email verified successfully';
  } catch (error) {
    throw new Error('Email verification failed');
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await  localStorage.removeItem('user')
  toast.error('Logged out')
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        console.log(action.payload)
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload.msg
        console.log(action.payload.msg)
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer