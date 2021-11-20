package com.steffun.spring_boot_app.service;

import com.steffun.spring_boot_app.model.Role;

import java.util.List;
import java.util.Set;

public interface RoleService {

    List<Role> getAllRoles();

    Role getRoleById(Long id);

    Role getByName(String roleName);

    Set<Role> getRoleSet(String[] roles);

}
