package ru.kata.spring.boot_security.demo.controler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Roles;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;

@Controller
@RequestMapping("/admin")
public class AdminContrroller {
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;

    @Autowired
    public AdminContrroller(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    public String findAll(Model model) {
        model.addAttribute("allUsers", userService.findAll());
        return "all-users";
    }

    @GetMapping("/addNewUser")
    public String addNewUser(Model model) {
        model.addAttribute("user", new User());
        model.addAttribute("allRoles", roleService.getRolesClass());
        return "new";
    }

    @PostMapping("/userNew/{id}")
    public String newUser(Model model,
                          @ModelAttribute("user") @Valid User user,
                          BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("allRoles", roleService.getRolesClass());
            return "new";
        }

        userService.saveUser(user);
        return "redirect:/admin";
    }

    @PostMapping("/userEdit/{id}")
    public String editUser(@PathVariable("id") int id,
                           Model model,
                           @ModelAttribute("allRoles") Roles allRoles,
                           @ModelAttribute("user") @Valid User user,
                           BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("allRoles", roleService.getRolesClass());
            return "edit";
        }

        userService.updateUser(id, user);
        return "redirect:/admin";
    }

    @PostMapping("/deleteUser")
    public String deleteUser(@RequestParam("userId") long id) {
        System.out.println("deleteUser: " + id);
        userService.deleteUser(id);
        return "redirect:/admin";
    }

    @PostMapping("/updateUser")
    public String updateUser(@RequestParam("userId") long id, Model model) {

        //как показать  пароль ?
        model.addAttribute("user", userService.getUser(id));
        model.addAttribute("allRoles", roleService.getRolesClass());
        return "edit";
    }
}
