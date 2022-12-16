import axios from "axios";

const axiosFetchBankDataInstance = axios.create({
    method: 'POST',
    baseURL: 'https://findbankifsccode.onrender.com/api'
})

export default axiosFetchBankDataInstance;