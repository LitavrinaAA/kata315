package ru.kata.spring.boot_security.demo.controler;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
public class MyController {
    @GetMapping("/logout")
    public String findAll(Model model) {
        System.out.println("выход");;
    return "logout";
    }
}