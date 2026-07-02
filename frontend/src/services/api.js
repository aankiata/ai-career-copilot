import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getHistory = () => api.get("/history/");

export const getAnalysis = (id) =>
  api.get(`/history/${id}`);

export const deleteAnalysis = (id) =>
  api.delete(`/history/${id}`);

export const downloadReport = () =>
  api.get("/report/", {
    responseType: "blob",
  });

export default api;
