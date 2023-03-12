import { axiosInstance } from '../config/axiosInstance'

export const postOrderRequest = (price) => {
    return axiosInstance.post('/orders', price)
}
export const getOrdersRequest = () => {
    return axiosInstance.get('/orders')
}
export const getAllOrdersRequest = () => {
    return axiosInstance.get('/orders/all')
}
