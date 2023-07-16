import React, { Component} from "react";
// import { Link } from 'react-router-dom';
import "../App.css";
import EmployeeService from "../services/EmployeeService";
// import { Router } from "react-router-dom/dist/umd/react-router-dom.development";

export default class ListEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
    }
    this.addEmployee=this.addEmployee.bind(this);
    this.editEmployee=this.editEmployee.bind(this);
    this.deleteEmployee=this.deleteEmployee.bind(this);
  }

  deleteEmployee=(id)=>{
    //rest api call
    EmployeeService.deleteEmployee(id).then(res=>{
      this.setState({employees: this.state.employees.filter(employee=>employee.id!==id)});
  
    });
  }

  
  editEmployee=(id)=>{
    console.log(id);
    this.props.history.push(`/add-employee/${id}`);
  };
  


 
//    this method will call when compomnent is mounted 
  componentDidMount(){
    //best place to call rest api
    EmployeeService.getEmployees().then((res)=>{
        this.setState({employees: res.data});

    });
  }
// from here we are routing to ListEmployee component to add employee 
  addEmployee=(id)=>{
    
    this.props.history.push('/add-employee/_add');
  };


  viewEmployee=(id)=>{
    this.props.history.push(`/view-employee/${id}`);

  };

  render() {
    return (
      <div>
        <h2 className="text-center">Employees List</h2>
         {/* <div className='row'>
                    <Link to='/add-employee' className='btn btn-primary ' style={{width:"auto"}}>Add Employee</Link>
               </div>  */}
               <button style={{marginBottom:"10px"}} className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
            

        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email Id</th>
                <th>Actions</th>
              </tr>
            </thead>

            {/* //to dynamically add rows */}
            <tbody>
              {this.state.employees.map((employee) => (
                <tr key={employee.id}>

                  <td> {employee.firstName}</td>
                  <td> {employee.lastName}</td>
                  <td> {employee.emailId}</td>
                  <td>
                    <button onClick={()=>this.editEmployee(employee.id)} className="btn btn-info">Update</button>
                    <button style={{marginLeft:"10px"}} onClick={()=>this.deleteEmployee(employee.id)} className="btn btn-danger">Delete</button>
                    <button style={{marginLeft:"10px"}} onClick={()=>this.viewEmployee(employee.id)} className="btn btn-info">View</button>
                    
                  </td>

                </tr>

              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
