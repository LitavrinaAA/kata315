package ru.kata.spring.boot_security.demo.controler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.model.User2;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

@RestController
@RequestMapping("/api")
public class UserResource {
    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public UserResource(UserService userService, RoleService roleService) {

        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/{userId}")
    public User getUser(@PathVariable long userId
                        , Model model) {

        System.out.println("JSON попросили...");
        try {
//            model.addAttribute("allRolles",roleService.getRolesList());
//            model.addAttribute("user", userService.findById(userId) );
            User user = userService.findById(userId).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
            return user; //userService.findById(userId).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        } catch (ChangeSetPersister.NotFoundException e) {
            return null;
        }

    }

    @PostMapping("/save")
    public User updateUser(@RequestBody User user){

        System.out.println("!!!!JSON прислали, сохранить просят...");
        System.out.println(user);
        int id = (int) user.getId();
            User userUp = userService.updateUser( id, user);
            return userUp ;
    }
    @PostMapping("/deleteUser")
    public User deleteUser(@RequestBody User user){

        System.out.println("!!!!JSON прислали, удалить просят...");
        System.out.println(user);
        int id = (int) user.getId();
        userService.deleteUser(user.getId());
        return null ;
    }
    @GetMapping("/save1/{userId}")
    public User updateUser(@PathVariable long userId){

        System.out.println(userId + "JSON прислали, сохранить просят...");

//        userService.saveUser(user);
//        return new ResponseEntity<>("Пользователь сохранен", HttpStatus.OK);
        return new User();
//        return userService.saveUser(user);
    }
}
