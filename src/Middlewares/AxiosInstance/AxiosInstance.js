import axios from "axios";

const axiosFetchBankDataInstance = axios.create({
    method: 'POST',
    baseURL: process.env.REACT_APP_API_LINK
})

export default axiosFetchBankDataInstance;