insert into roles SET id = 1, role = "ROLE_ADMIN";
insert into roles SET id = 2, role = "ROLE_USER";
-- insert into users SET id = 1, first_name = "admin", last_name = "admin", age = 33, username = "1", password = "$2a$12$aAqL4JVeAutsxlcEO3SYHOpw6P8CJJidisugYRzvL/rP5p5OJ1FJO";
insert into users SET id = 1, first_name = "admin", last_name = "admin", age = 33, username = "admin@mail.com", password = "$2a$12$7cTdjKfhT3KV1W11TFUvwOo7W6bkw4davyrtDLrT9IU2BugrHKVRq";
insert into users SET id = 2, first_name = "user", last_name = "user", age = 29, username = "user@mail.com", password = "$2a$12$uNx1CbrAO2YhNRDv.rNAi.w0qyj4ejUO4VTWX84Lv6H.YJCG0wR6m";
insert into users_roles SET users_id = 1, roles_id = 1;
insert into users_roles SET users_id = 1, roles_id = 2;
insert into users_roles SET users_id = 2, roles_id = 2;