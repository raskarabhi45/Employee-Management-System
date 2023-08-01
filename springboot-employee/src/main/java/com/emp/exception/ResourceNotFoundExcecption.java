package com.emp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

//whenever the record is not existing in the database 
//that time this custom exception will generate
//and API will return NOT_FOUND status to the client
@ResponseStatus(value=HttpStatus.NOT_FOUND)
public class ResourceNotFoundExcecption extends RuntimeException {
	
	private static final long serialVersionUID=1L;
	
	public ResourceNotFoundExcecption(String message) {
		super(message);
	}

}
