import { configureStore } from '@reduxjs/toolkit'
import dataAPI from '../api/dataApi'

const store = configureStore({
    reducer: {
        [dataAPI.reducerPath]: dataAPI.reducer
    },
    middleware: (getMiddleware) => getMiddleware().concat(dataAPI.middleware)
})

export default store