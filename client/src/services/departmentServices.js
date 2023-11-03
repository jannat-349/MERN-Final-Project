import Axios from "../axios";

const getAllDepartments = async () => {
  const response = await Axios.get("/departments");
  return response.data;
};
const departmentServices = { getAllDepartments };

export default departmentServices;
