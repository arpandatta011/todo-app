import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchWeather = createAsyncThunk(
  'todos/fetchWeather',
  async (city, { rejectWithValue }) => {
    try {
      const API_KEY = 'Your_OpenWeathermapAPI';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      return {
        city: response.data.name,
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Weather data not available')
    }
  }
)

const initialState = {
  todos: JSON.parse(localStorage.getItem('todos')) || [],
  weatherData: {}, 
  status: 'idle',
  error: null,
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload)
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
      localStorage.setItem('todos', JSON.stringify(state.todos))
    },
    updateTodoPriority: (state, action) => {
      const { id, priority } = action.payload
      const todo = state.todos.find(todo => todo.id === id)
      if (todo) {
        todo.priority = priority
        localStorage.setItem('todos', JSON.stringify(state.todos))
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.weatherData[action.payload.city] = action.payload 
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export const { addTodo, deleteTodo, updateTodoPriority } = todoSlice.actions
export default todoSlice.reducer
