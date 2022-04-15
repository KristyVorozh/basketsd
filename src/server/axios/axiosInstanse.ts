import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "api",
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.response.use(response => response,
    (error) => {
    if (error.response.status === 401){
        window.location.reload();
    }
});

export default axiosInstance;
