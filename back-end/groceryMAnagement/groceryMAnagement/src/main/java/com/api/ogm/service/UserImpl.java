package com.api.ogm.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.api.ogm.model.User;
import com.api.ogm.repo.UserRepo;

@Service
public class UserImpl implements UserService {

    @Autowired
    private UserRepo userRepo;
    
    
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

	@Override
	public User createNewUser(User user) {
		String userId = UUID.randomUUID().toString();
		user.setUserID(userId);
		user.setPassword(encoder.encode(user.getPassword()));
		user.setActive(true);
		User u = userRepo.save(user);
		
		return u;
	}

	@Override
	public User updateUserData(String userId, User newUser) {
		User u = userRepo.findById(userId).isPresent() ? userRepo.findById(userId).get() : null;
		if(u != null) {
			u.setEmail(newUser.getEmail());
			u.setName(newUser.getName());
			u.setMobile(newUser.getMobile());
			u.setPassword(encoder.encode(newUser.getPassword()));
			
			return userRepo.save(u);
		}
		return u;
	}

	@Override
	public User loginUserInApp(String email, String password) {
		User u = userRepo.findByEmail(email);
		
		if(u != null && encoder.matches(password, u.getPassword())) {
			u.setActive(true);
			return u;
		}
		return u;
	}

	@Override
	public User getUserByEmail(String email) {
		return userRepo.findByEmail(email);
	}

	@Override
	public String logOutUser(String email) {
		User u = userRepo.findByEmail(email);
		if(u != null) {
			u.setActive(false);
			return "success";
		}
		return null;
	}
	
    
}
