import axios from "axios";
import { env_vars } from "./config";

export default axios.create({
    baseURL: env_vars.api_url,
    headers: {
        "Content-type": "application/json",
    },
});