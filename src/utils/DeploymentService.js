import axios from "axios";
import http from "./http-common";

const upload = (file, subdomain, onUploadProgress) => {
    let formData = new FormData();
    const isAuthenticated = localStorage.getItem('token');

    formData.append("projectFolder", file);
    formData.append("projectName", subdomain)

    return http.post(`/deployment/upload?subdomain=${subdomain}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${isAuthenticated}`
        },
        onUploadProgress,
    });
};

const deploy = (file, subdomain, onUploadProgress) => {
    let formData = new FormData();

    formData.append("build", file);
    formData.append("subdomain", subdomain);

    return axios.post("https://bugtech.online/api/deploy", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    });
};

const verify = (subdomain) => {
    return http.post("/deployment/verify", { subdomain });
};

const secureSsl = (subdomain) => {
    return http.post("/deployment/ssl", { subdomain });
};

const deleteSite = (subdomain) => {
    const isAuthenticated = localStorage.getItem('token');

    return http.put("/deployment/delete", { subdomain }, {
        headers: {
            "Authorization": `Bearer ${isAuthenticated}`
        }
    });
};


const getFiles = () => {
    const isAuthenticated = localStorage.getItem('token');

    return http.get("/deployment/files", {
        headers: {
            "Authorization": `Bearer ${isAuthenticated}`
        }
    }
    );
};

const FileUploadService = {
    upload,
    getFiles,
    deploy,
    verify,
    secureSsl,
    deleteSite
};

export default FileUploadService; 