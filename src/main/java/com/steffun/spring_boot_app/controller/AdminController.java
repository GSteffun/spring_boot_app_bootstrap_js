package com.steffun.spring_boot_app.controller;

import com.steffun.spring_boot_app.model.Role;
import com.steffun.spring_boot_app.model.User;
import com.steffun.spring_boot_app.service.RoleService;
import com.steffun.spring_boot_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("")
    public String listAllUsers(ModelMap modelMap) {
        modelMap.addAttribute("listUsers", userService.getAllUsers());
        return "/users";
    }

    @GetMapping("/new")
    public String addUser(@ModelAttribute(name = "user") User user, ModelMap modelMap) {
        modelMap.addAttribute("listRoles", roleService.getAllRoles());
        return "/new";
    }

    @PostMapping("/create")
    public String createUser(@ModelAttribute(name = "user") User user,
                             @RequestParam(value = "listRoles") String[] roles) {
        userService.saveUser(user, roleService.getRoleSet(roles));
        return "redirect:/admin";
    }

    @GetMapping("/{id}/edit")
    public String editUser(@PathVariable(value = "id") Long id, ModelMap modelMap, Model model) {
        Map<String, Boolean> userRoles = new HashMap<>();
        for (Role role : roleService.getAllRoles()) userRoles.put(role.getRole(), false);
        for (Role role : userService.getUserRoles(userService.getUserById(id))) userRoles.put(role.getRole(), true);
        modelMap.addAttribute("userRoles", userRoles);
        model.addAttribute("user", userService.getUserById(id));
        return "/edit";
    }


    @PatchMapping("/{id}/update")
    public String updateUser(@ModelAttribute(name = "user") User user,
                             @RequestParam(value = "userRoles") String[] roles) {
        userService.saveUser(user, roleService.getRoleSet(roles));
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}/remove")
    public String removeUser(@PathVariable(value = "id") Long id) {
        userService.removeUserById(id);
        return "redirect:/admin";
    }

}