import Axios from "../axios";
import AxiosToHandleFile from "../axios/AxiosToHandleFile";

const createEmployee = async (formData) => {
  const res = await AxiosToHandleFile.post("/employee/create", formData);
  return res.data;
};
const getAllEmployees = async () => {
  const res = await Axios.get("/employees");
  return res.data;
};
const getAnEmployee = async (employeeId) => {
  const res = await Axios.get(`/employee/${employeeId}`);
  return res.data;
};
const updateAnEmployee = async (employeeId, updateData) => {
  const res = await AxiosToHandleFile.put(
    `/employee/update/${employeeId}`,
    updateData
  );
  return res.data;
};
const deleteAnEmployee = async (employeeId) => {
  const res = await Axios.put(`/employee/delete/${employeeId}`);
  return res.data;
};

const employeeServices = {
  createEmployee,
  getAllEmployees,
  getAnEmployee,
  updateAnEmployee,
  deleteAnEmployee,
};

export default employeeServices;
