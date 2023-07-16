
import axios from "axios";

const EMPLOYEE_API_BASE_URL="http://localhost:8080/api/v1/employees";

class EmployeeService{

    //get request
    getEmployees(){
       //we are simply returning response of get method
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

     //post request
    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL,employee);
    }

    //get request
    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL+'/'+employeeId);
    }

    //put request
    updateEmployee(employee,employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL+'/'+employeeId,employee);
    }

    //delete request
    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL+'/'+employeeId);
    }
}



export default new EmployeeService()