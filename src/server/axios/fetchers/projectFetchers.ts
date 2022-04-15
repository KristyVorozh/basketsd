import axiosInstance from "../axiosInstanse";

export const getProducts = async () => {
    return (await axiosInstance.get( '/productApi')).data;
}
