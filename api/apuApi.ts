import axios from "axios";

const apuApi=axios.create({
    baseURL: "/api",
})

export default apuApi;