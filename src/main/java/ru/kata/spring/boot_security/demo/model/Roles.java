package ru.kata.spring.boot_security.demo.model;

import java.util.List;

public class Roles {

    List<Role> roles;

    public Roles() {

    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
}
