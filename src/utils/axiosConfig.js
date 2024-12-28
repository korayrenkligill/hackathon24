import axios from "axios";

// Varsayılan Authorization başlığını ayarla
const token = localStorage.getItem("token");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Axios'u export et
export default axios;
