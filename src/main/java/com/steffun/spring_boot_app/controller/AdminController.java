package com.steffun.spring_boot_app.controller;

import com.steffun.spring_boot_app.model.User;
import com.steffun.spring_boot_app.service.RoleService;
import com.steffun.spring_boot_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;


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
    public String listAllUsers(@ModelAttribute(name = "user") User user,
                               @ModelAttribute(name = "modalUser") User modalUser,
                               ModelMap modelMap,
                               Authentication authentication) {
        modelMap.addAttribute("loggedUser", authentication.getName());
        modelMap.addAttribute("userRoles", userService.getUserByName(authentication.getName()).getRolesToString());
        modelMap.addAttribute("listUsers", userService.getAllUsers());
        modelMap.addAttribute("listRoles", roleService.getAllRoles());
        return "/users";
    }

    @GetMapping("/userinfo")
    public String getWelcomePage(ModelMap modelMap, Authentication authentication) {
        modelMap.addAttribute("loggedUser", authentication.getName());
        modelMap.addAttribute("isAdmin", authentication.getAuthorities().stream().anyMatch(x -> x.getAuthority().equals("ROLE_ADMIN")));
        modelMap.addAttribute("userRoles", userService.getUserByName(authentication.getName()).getRolesToString());
        modelMap.addAttribute("listUsers", userService.getUserByName(authentication.getName()));
        modelMap.addAttribute("listRoles", roleService.getAllRoles());
        return "/userinfo";
    }

    @PostMapping("/create")
    public String createUser(@ModelAttribute(name = "user") User user,
                             @RequestParam(value = "listRoles") String[] roles) {
        userService.saveUser(user, roleService.getRoleSet(roles));
        return "redirect:/admin";
    }

    @PostMapping("/{id}/update")
    public String updateUser(@ModelAttribute(name = "modalUser") User modalUser,
                             @RequestParam(value = "listRoles", required = false) String[] roles) {
        userService.saveUser(modalUser, roleService.getRoleSet(roles));
        return "redirect:/admin";
    }

    @PostMapping("/{id}/remove")
    public String removeUser(@PathVariable(value = "id") Long id) {
        userService.removeUserById(id);
        return "redirect:/admin";
    }

}