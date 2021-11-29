package com.steffun.spring_boot_app.controller;


import com.steffun.spring_boot_app.model.User;
import com.steffun.spring_boot_app.service.RoleService;
import com.steffun.spring_boot_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/")
public class PageController {

    private UserService userService;
    private RoleService roleService;

    @Autowired
    public PageController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("admin")
    public String adminPage(@ModelAttribute("user") User user, Authentication auth, ModelMap modelMap) {
        modelMap.addAttribute("loggedUser", userService.getUserByName(auth.getName()));
        modelMap.addAttribute("isAdmin", userService.getUserByName(auth.getName()).getAuthorities().stream()
                .anyMatch(x -> x.getAuthority().equals("ROLE_ADMIN")));
        modelMap.addAttribute("listUsers", userService.getAllUsers());
        modelMap.addAttribute("listRoles", roleService.getAllRoles());
        return "users";
    }

    @GetMapping("user")
    public String userPage(Authentication auth, ModelMap modelMap) {
        modelMap.addAttribute("loggedUser", userService.getUserByName(auth.getName()));
        modelMap.addAttribute("userRoles", userService.getUserByName(auth.getName()).getRolesToString());
        modelMap.addAttribute("isAdmin", userService.getUserByName(auth.getName()).getAuthorities().stream().anyMatch(x -> x.getAuthority().equals("ROLE_ADMIN")));
        modelMap.addAttribute("user", userService.getUserByName(auth.getName()));
        modelMap.addAttribute("listRoles", roleService.getAllRoles());
        return "userinfo";
    }

}
