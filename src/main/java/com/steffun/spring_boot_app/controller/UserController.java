package com.steffun.spring_boot_app.controller;

import com.steffun.spring_boot_app.service.RoleService;
import com.steffun.spring_boot_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.Principal;

@Controller
@RequestMapping("/user")
public class UserController {

    private UserService userService;
    private RoleService roleService;

    @Autowired
    public UserController(UserService userService, RoleService roleService) {
        this.roleService = roleService;
        this.userService = userService;
    }

    @GetMapping("")
    public String getWelcomePage(ModelMap modelMap, Authentication authentication) {
        modelMap.addAttribute("loggedUser", authentication.getName());
        modelMap.addAttribute("userRoles", userService.getUserByName(authentication.getName()).getRolesToString());
        modelMap.addAttribute("listUsers", userService.getUserByName(authentication.getName()));
        modelMap.addAttribute("listRoles", roleService.getAllRoles());
        return "/userinfo";
    }

}
