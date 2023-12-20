package ru.kata.spring.boot_security.demo.controler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserRestController {
    private final UserService userService;


    @Autowired
    public UserRestController(UserService userService) {

        this.userService = userService;

    }
    @GetMapping("/user")
    public ResponseEntity<User> getAuthenticatedUser(Principal principal) {
        User user = userService.getByEmail(principal.getName());
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
