import React, { Component } from "react";
import { useHistory, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import {
  Route,
  Router,
  Routes,
} from "react-router-dom/dist/umd/react-router-dom.development";
import ListEmployee from "./ListEmployee";
import EmployeeService from "../services/EmployeeService";

export default class CreateEmployee extends Component {
  constructor(props) {
    super(props);

    //we haVE TO ADD THIS PROPERTIES TO STATE
    this.state = {
      // step 2 if id is -1 the request for add operation end for update operation
      id: this.props.match.params.id,
      firstName: "",
      lastName: "",
      emailId: "",
    };

    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);

    this.saveEmployee = this.saveEmployee.bind(this);
  }

  //step 3
  componentDidMount() {
    //step 4
    if (this.state.id === -1) {
      return;
    } else {
      EmployeeService.getEmployeeById(this.state.id).then((res) => {
        let employee = res.data;
        this.setState({
          firstName: employee.firstName,
          lastName: employee.lastName,
          emailId: employee.emailId,
        });
      });
    }
  }

  //event handler
  changeFirstNameHandler = (event) => {
    this.setState({ firstName: event.target.value });
    //setState method to add value
  };

  changeLastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
    //setState method to add value
  };

  changeEmailHandler = (event) => {
    this.setState({ emailId: event.target.value });
    //setState method to add value
  };

  //this method will get called when ever we hit the save button
  saveEmployee = (e) => {
    e.preventDefault(); //retrived data from the state
    let employee = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailId: this.state.emailId,
    };
    console.log("employee=>" + JSON.stringify(employee));

    //step 5
    if (this.state.id === '_add') {
      EmployeeService.createEmployee(employee).then((res) => {
         this.props.history.push('/employees');
      });
    } else {
      EmployeeService.updateEmployee(employee,this.state.id).then(res=>{
        this.props.history.push(`/employees/${this.state.id}`);
    });
  }
    
  

   
  };

  // cancel = () => {
  //   this.context.router.transitionTo('/employees');
  // };

  getTitle=()=>{
    if(this.state.id=='_add'){
      return <h3 className="text-center">Add Employee</h3>
    }
    else{
      return  <h3 className="text-center">Update Employee</h3>
    }
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
             {
              this.getTitle()
             }

              <div className="card-body">
                <form action="">
                  <div className="form-group">
                    <label>First Name :</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      className="form-control"
                      value={this.state.firstName}
                      onChange={this.changeFirstNameHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Last Name :</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      className="form-control"
                      value={this.state.lastName}
                      onChange={this.changeLastNameHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Id :</label>
                    <input
                      type="text"
                      placeholder="Email Address"
                      name="emailId"
                      className="form-control"
                      value={this.state.emailId}
                      onChange={this.changeEmailHandler}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveEmployee}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
