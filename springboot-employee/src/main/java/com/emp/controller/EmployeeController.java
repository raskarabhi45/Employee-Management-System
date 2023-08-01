package com.emp.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.emp.model.Employee;
import com.emp.repository.EmployeeRepository;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {
	
	@Autowired //to inject this repository by spring container
	private EmployeeRepository employeeRepository;
	
	//get all employees rest api
	//this will return List of employee to the client
	@GetMapping("/employees")
	public List<Employee> getAllEmployees(){
		return employeeRepository.findAll();
	}
	
	
//	//create employee rest api
//	@PostMapping("/employees")
//	public Employee createEmployee(@RequestBody Employee employee) {
//		return employeeRepository.save(employee);
//	}
	@PostMapping("/employees")
	public ResponseEntity<?> createEmployee(@RequestBody Employee employee) {
	    // Check if the email already exists in the database
	    boolean emailExists = employeeRepository.existsByEmailId(employee.getEmailId());
	    if (emailExists) {
	        return ResponseEntity.badRequest().body("Email address already exists.");
	    }

	    // If the email doesn't exist, save the new employee
	    Employee createdEmployee = employeeRepository.save(employee);
	    return ResponseEntity.ok(createdEmployee);
	}

	
	//get employee by id rest api
	//Exception handling remaining
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee>  getEmployeeById(@PathVariable Long id) {
		
		Employee employee = employeeRepository.findById(id)
				.orElseThrow();//(()-> new RescourceNotFoundException("Employee not exists with id : "+id));
		return ResponseEntity.ok(employee);
	}
	
	//update employee rest api
	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id,@RequestBody Employee employeeDetails){
		Employee employee = employeeRepository.findById(id)
				.orElseThrow();//(()-> new RescourceNotFoundException("Employee not exists with id : "+id));
		
		employee.setFirstName(employeeDetails.getFirstName());
		employee.setLastName(employeeDetails.getLastName());
		employee.setEmailId(employeeDetails.getEmailId());
		
		employee.setAge(employeeDetails.getAge());
		employee.setCity(employeeDetails.getCity());
		employee.setSalary(employeeDetails.getSalary());
		
		
		Employee updatedEmployee=employeeRepository.save(employee);
		
		return ResponseEntity.ok(updatedEmployee);
		
	}
	
	//delete employee rest api
	@DeleteMapping("employees/{id}")
	public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable Long id){
		//first will retrive that employee by id
		Employee employee = employeeRepository.findById(id)
				.orElseThrow();
		
		employeeRepository.delete(employee);
		Map<String,Boolean> response =new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
		
	}
	
	// Check if email exists rest api
	@GetMapping("/employees/check-email/{email}")
	public ResponseEntity<Map<String, Boolean>> checkEmailExists(@PathVariable String email) {
	    boolean emailExists = employeeRepository.existsByEmailId(email);
	    Map<String, Boolean> response = new HashMap<>();
	    response.put("exists", emailExists);
	    return ResponseEntity.ok(response);
	}

	

}
