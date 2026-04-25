// src/api.js
import axios from "axios";

const API = "http://localhost:5000/api";

export const getReport = () => axios.get(`${API}/report`);