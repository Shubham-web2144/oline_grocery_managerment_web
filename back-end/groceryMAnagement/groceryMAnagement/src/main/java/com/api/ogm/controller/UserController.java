package com.api.ogm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.ogm.model.User;
import com.api.ogm.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
public class UserController {
    
    @Autowired
    private UserService userService;


    @GetMapping("/user")
    public ResponseEntity<?> getAllUsers() {
        List<User> list = userService.getAllUsers();
        if(list.isEmpty()) {
        	return new ResponseEntity<>("No users in list", HttpStatus.OK);
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    
    @PostMapping("/createUser")
    public ResponseEntity<?> createNewUser(@RequestBody User user) {
    	User u = userService.createNewUser(user);
    	if(u == null) {
    		return new ResponseEntity<>("User is not created", HttpStatus.BAD_REQUEST);
    	}
    	return new ResponseEntity<>(u, HttpStatus.CREATED);
    }
    
    @PutMapping("/updateUserData/{userId}")
    public ResponseEntity<?> updateUserData(@PathVariable String userId, @RequestBody User newUser) {
    	User u = userService.updateUserData(userId, newUser);
    	if(u != null) {
    		return new ResponseEntity<>(u, HttpStatus.OK);
    	}
    	return new ResponseEntity<>("User data is not updated", HttpStatus.NOT_FOUND);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> loginUserIntoApp(@Param("email") String email, @Param("password") String password) {
    	User u = userService.loginUserInApp(email, password);
    	if(u == null) {
    		return new ResponseEntity<>("User crediential is wrong or user does'nt exists", HttpStatus.NOT_FOUND);
    	}
    	return new ResponseEntity<>(u, HttpStatus.OK);
    }
    
    @GetMapping("/user/{email}") 
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
    	User u = userService.getUserByEmail(email);
    	if(u == null) {
    		return new ResponseEntity<>("User is not found", HttpStatus.NOT_FOUND);
    	}
    	return new ResponseEntity<>(u, HttpStatus.OK);
    }
    
    @PostMapping("/logOut/{email}")
    public ResponseEntity<?> logoutUser(@PathVariable String email) {
    	String msg = userService.logOutUser(email);
    	if(msg.equals("success")) {
    		return new ResponseEntity<>("Log out user", HttpStatus.OK);
    	}
    	return new ResponseEntity<>("Error", HttpStatus.FORBIDDEN);
    }
}
