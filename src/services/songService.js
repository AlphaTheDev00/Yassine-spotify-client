import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL + '/songs'

export async function songCreate(formData) {
    try {
        const res = await axios.post(BASE_URL, formData, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY3YWExZDIxYTk4M2NkYmU5NGY0YjllNyIsInVzZXJuYW1lIjoiYWFyb24iLCJwcm9maWxlSW1hZ2UiOiJpbWFnZSIsImlzQXJ0aXN0Ijp0cnVlLCJwbGF5bGlzdHMiOltdLCJsaWtlcyI6W119LCJpYXQiOjE3MzkzNjM3ODYsImV4cCI6MTczOTQ1MDE4Nn0.I9SK3S1-k8kOyZWHwgQ1LmWXbYbwXUpnw9_1rExXZac`
            }
        } )
        console.log('service 1:', res)
        return res.data
    } catch (error) {
        console.log('service 2:', error.response.data)
        throw error
    }
    
}

export const getAllSongs = () => axios.get(BASE_URL);
