import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api"
});


api.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    config.headers["Role"] = user.role;
    config.headers["User-Email"] = user.email;
  }
  return config;
});

export default api
