package com.integralab.auth;

import java.util.UUID;

public class UserDto {
    private UUID id;
    private String name;
    private String email;
    private String role;
    private Integer totalXp;
    private Integer level;

    public UserDto(UUID id, String name, String email, String role, Integer totalXp, Integer level) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.totalXp = totalXp;
        this.level = level;
    }

    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public Integer getTotalXp() { return totalXp; }
    public Integer getLevel() { return level; }
}
