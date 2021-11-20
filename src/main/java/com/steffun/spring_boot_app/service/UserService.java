package com.steffun.spring_boot_app.service;

import com.steffun.spring_boot_app.model.Role;
import com.steffun.spring_boot_app.model.User;

import java.util.List;
import java.util.Set;

public interface UserService {

    User getUserById(Long id);

    User getUserByName(String username);

    void saveUser(User user, Set<Role> roles);

    void removeUserById(Long id);

    List<User> getAllUsers();

    Set<Role> getUserRoles(User user);

}
