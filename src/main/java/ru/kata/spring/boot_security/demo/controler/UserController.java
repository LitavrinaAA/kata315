package ru.kata.spring.boot_security.demo.controler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;

//@Controller
//@RequestMapping("/user")

public class UserController {
//
//    private final UserService userService;
//
////    @Autowired
//    public UserController(UserService userService) {
//        this.userService = userService;
//    }
//
//    @GetMapping("")
//    public String userInfoPage(Principal principal, Model model) {
//        User user = userService.findUserByEmail(principal.getName());
//        model.addAttribute("user", user);
//        return "user";
//    }


}
