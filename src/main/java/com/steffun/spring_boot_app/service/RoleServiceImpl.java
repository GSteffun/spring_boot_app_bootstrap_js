package com.steffun.spring_boot_app.service;

import com.steffun.spring_boot_app.repository.RoleRepository;
import com.steffun.spring_boot_app.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role getRoleById(Long id) {
        return roleRepository.getById(id);
    }

    @Override
    public Role getByName(String roleName) {
        return roleRepository.getByName(roleName);
    }

    @Override
    public Set<Role> getRoleSet(String[] roles) {
        return Arrays.stream(roles)
                .map(role -> roleRepository.getByName(role))
                .collect(Collectors.toSet());
    }
}
