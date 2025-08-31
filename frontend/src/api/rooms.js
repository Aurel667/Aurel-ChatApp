import apiClient from "../config/api";

export async function getMyRooms(){
    try {
        const response = await apiClient.get('/rooms/my-rooms')
        return response.data
    } catch (error) {
        return { error: error.message }
    }
}

export async function createChat({username}){
    try {
        const response = await apiClient.post('/rooms/chat', {username})
        return response.data
    } catch (error) {
        return { error: error.message }
    }
}

export async function createGroup({name, users}) {
    try {
        const response = await apiClient.post('/')
    } catch (error) {
        return { error: error.message }
    }
}