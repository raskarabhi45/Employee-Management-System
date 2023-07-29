import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import "../App.css";
import "./view.css"
const ViewEmployeeComponent = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    EmployeeService.getEmployeeById(id)
      .then((res) => {
        setEmployee(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <br />
      <div className='view'>
      <div className="card col-md-6 offset-md-3">
        <h3 className="text-center">View Employee Details</h3>
        <div className="card-body">
          <div className="row">
            <label>Employee First Name :             {employee.firstName}</label>

          </div>
          <div className="row">
            <label>Employee Last Name : {employee.lastName}</label>
          </div>

          <div className="row">
            <label>Employee Email ID  : {employee.emailId}</label>
          </div>

          <div className="row">
            <label>Employee Age       : {employee.age}</label>
          </div>

          <div className="row">
            <label>Employee City      : {employee.city}</label>
          </div>

          <div className="row">
            <label>Employee Salary    : {employee.salary}</label>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
};

export default ViewEmployeeComponent;
