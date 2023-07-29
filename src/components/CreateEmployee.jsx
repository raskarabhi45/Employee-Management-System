import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ListEmployee from "./ListEmployee";
import { useNavigate } from 'react-router-dom';
import "./add_update.css"
import EmployeeService from "../services/EmployeeService";

const CreateEmployee = () => {

  
  const { id } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [salary, setSalary] = useState("");


  // useEffect(() => {
  //     EmployeeService.getEmployeeById(id).then((res) => {
  //       let employee = res.data;
  //       setFirstName(employee.firstName);
  //       setLastName(employee.lastName);
  //       setEmailId(employee.emailId);
  //     });
  // });

  const changeFirstNameHandler = (event) => {
    setFirstName(event.target.value);
  };

  const changeLastNameHandler = (event) => {
    setLastName(event.target.value);
  };

  const changeEmailHandler = (event) => {
    setEmailId(event.target.value);
  };

  const changeAgeHandler = (event) => {
    setAge(event.target.value);
  };

  const changeCityHandler = (event) => {
    setCity(event.target.value);
  };

  const changeSalaryHandler = (event) => {
    setSalary(event.target.value);
  };



  const saveEmployee = (e) => {
    e.preventDefault();
    let employee = {
      firstName,
      lastName,
      emailId,
      age,
      city,
      salary,
    };
    console.log("employee=>" + JSON.stringify(employee));

      EmployeeService.createEmployee(employee).then((res) => {
        navigate("/employees");
      });
    }


  const getTitle = () => {
  
      return <h3 className="text-center">Add Employee</h3>;
    } 



  return (
    <>
    <div className="mainContainer">

      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {getTitle()}

            <div className="card-body">
              <form action="">
                <div className="form-group">
                  <label>First Name :</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    className="form-control"
                    value={firstName}
                    onChange={changeFirstNameHandler}
                  />
                </div>

                <div className="form-group">
                  <label>Last Name :</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    className="form-control"
                    value={lastName}
                    onChange={changeLastNameHandler}
                  />
                </div>

                <div className="form-group">
                  <label>Email Id :</label>
                  <input
                    type="text"
                    placeholder="Email Address"
                    name="emailId"
                    className="form-control"
                    value={emailId}
                    onChange={changeEmailHandler}
                  />
                </div>

                <div className="form-group">
                  <label>Age :</label>
                  <input
                    type="text"
                    placeholder="Age"
                    name="age"
                    className="form-control"
                    value={age}
                    onChange={changeAgeHandler}
                  />
                </div>

                <div className="form-group">
                  <label>City :</label>
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    className="form-control"
                    value={city}
                    onChange={changeCityHandler}
                  />
                </div>

                <div className="form-group">
                  <label>Salary :</label>
                  <input
                    type="text"
                    placeholder="Salary"
                    name="salary"
                    className="form-control"
                    value={salary}
                    onChange={changeSalaryHandler}
                  />
                </div>

                <button className="btn btn-success" onClick={saveEmployee}>
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => navigate("/employees")}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      </div>
    </>
  );
};

export default CreateEmployee;
