package com.api.ogm.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.api.ogm.model.User;

@Service
public interface UserService {
	// get all user
	public List<User> getAllUsers();

	// create user
	public User createNewUser(User user);

	// update user
	public User updateUserData(String userId, User newUser);

	// login user
	public User loginUserInApp(String email, String password);

	// get user by userEmail
	public User getUserByEmail(String email);
	
	public String logOutUser(String email);
}
