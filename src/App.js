//git commands
//git add .
//git commit -m "react js spring boot crud applicatio"
// git push -u origin main 
// git status

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListEmployee from "./components/ListEmployee";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateEmployee from "./components/CreateEmployee";
import UpdateEmployee from "./components/UpdateEmployee";
import ViewEmployee from "./components/ViewEmployee";

//react functional component
//jsx javascript xml code extension of javascript
//root component we confugure routing here
function App() {
  return (
    <>
      <Router> 
      {/* header and footer are outside the switch  */}
        
          <Header />
          <div className="container">
          {/* inside the switch we configure the routing  */}
          {/* http://localhost:3000/employees  */}
            <Routes>   
            <Route path="/" Component={ListEmployee}></Route>
            <Route path="/employees" Component={ListEmployee}></Route>
            <Route path="/add-employee" Component={CreateEmployee}></Route>
            <Route path="/update-employee/:id" Component={UpdateEmployee}> </Route> 
            <Route path="/view-employee/:id" Component={ViewEmployee}></Route>

            
            </Routes>
          </div>
          <Footer />
    
      </Router>
    </>
  );
}

export default App;
