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

export default class UpdateEmployee extends Component {
  constructor(props) {
    super(props);

    //we haVE TO ADD THIS PROPERTIES TO STATE
    this.state = {
      id: this.props.match.params.id,
      firstName: "",
      lastName: "",
      emailId: "",
    };

    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);

    this.updateEmployee = this.updateEmployee.bind(this);
  }

  componentDidMount() {
    EmployeeService.getEmployeeById(this.state.id).then((res) => {
      let employee = res.data;
      this.setState({
        firstName: employee.firstName,
        lastName: employee.lastName,
        emailId: employee.emailId,
      });
    });
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
  updateEmployee = (e) => {
    e.preventDefault(); //retrived data from the state
    let employee = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailId: this.state.emailId,
    };
    console.log("employee=>" + JSON.stringify(employee));
    EmployeeService.updateEmployee(employee,this.state.id).then(res=>{
        this.props.history.push('/employees');
    })

    
  };

  cancel = () => {
    // this.context.router.transitionTo('/employees');
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center">Update Employee</h3>

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
                    onClick={this.updateEmployee}
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
