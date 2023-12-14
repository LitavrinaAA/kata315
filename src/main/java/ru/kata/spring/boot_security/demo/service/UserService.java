package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repositories.UserRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {
    private UserRepository userRepository;

    public PasswordEncoder getBCryptPasswordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("User '%s' not found", username));
        }
        UserDetails u_test = new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                mapRolesToAuthorities(user.getRoles()));

        return u_test;
    }

    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles) {
        return roles.stream().map(r -> new SimpleGrantedAuthority(r.getName())).collect(Collectors.toList());
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Transactional
    public User saveUser(User user) {
        if (!user.getPassword().isEmpty()) {
            user.setPassword(getBCryptPasswordEncoder().encode(user.getPassword()));
        }
        return userRepository.save(user);
    }

    @Transactional
    public void deleteUser(long id) {
        userRepository.deleteById(id);
    }

    public User getUser(long id) {
        User user = userRepository.getById(id);
        return user;
    }

    public Optional<User> findById(long id) {
        return userRepository.findById(id);
    }

    public User getUser(String name) {

        return userRepository.findByUsername(name);
    }

    @Transactional
    public User updateUser(int id, User user1) {

            User userToBeUpdated = getUser(id);
            userToBeUpdated.setName(user1.getName());
            userToBeUpdated.setSurname(user1.getSurname());
            userToBeUpdated.setAge(user1.getAge());
            userToBeUpdated.setEmail(user1.getEmail());
            if (!user1.getPassword().isEmpty()) {
                userToBeUpdated.setPassword(getBCryptPasswordEncoder().encode(user1.getPassword()));
            }
            userToBeUpdated.setRoles(user1.getRoles());
            return userRepository.save(userToBeUpdated);

    }
}
