insert into roles SET id = 1, role = "ROLE_ADMIN";
insert into roles SET id = 2, role = "ROLE_USER";
insert into users SET id = 1, username = "admin", password = "$2a$12$7cTdjKfhT3KV1W11TFUvwOo7W6bkw4davyrtDLrT9IU2BugrHKVRq";
insert into users SET id = 2, username = "user", password = "$2a$12$uNx1CbrAO2YhNRDv.rNAi.w0qyj4ejUO4VTWX84Lv6H.YJCG0wR6m";
insert into users_roles SET users_id = 1, roles_id = 1;
insert into users_roles SET users_id = 1, roles_id = 2;
insert into users_roles SET users_id = 2, roles_id = 2;