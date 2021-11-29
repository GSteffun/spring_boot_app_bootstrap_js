$(document).ready(async function () {
    await getAllUsers();
});

async function getAllUsers() {
    const htmlUsersTable = document.querySelector('#allUsersTable tbody');
    let usersTable = "";
    await fetch("/api/v1/admin")
        .then((response) => response.json())
        .then((users) =>
            users.forEach(user => {
                let usersRolesString = "";
                let userRoles = "";
                user.roles.forEach(role => usersRolesString += role.role.replace(/^.+_/, "") + " ");
                user.roles.forEach(role => userRoles += role.role + " ");
                usersTable += "<tr>";
                usersTable += "<td>" + user.id + "</td>";
                usersTable += "<td>" + user.firstName + "</td>";
                usersTable += "<td>" + user.lastName + "</td>";
                usersTable += "<td>" + user.age + "</td>";
                usersTable += "<td>" + user.username + "</td>";
                usersTable += "<td>" + usersRolesString + "</td>";
                usersTable += "<td>";
                usersTable += "<button class='btn btn-info' type='button' data-toggle='modal' onclick='getModalEditWindow(" + user.id + ")'>Edit</button>";
                usersTable += "</td>";
                usersTable += "<td>";
                usersTable += "<button class='btn btn-danger' data-toggle='modal' onclick='getModalDeleteWindow(" +
                    user.id + ")'>Delete</button>";
                usersTable += "</td>";
            }));
    htmlUsersTable.innerHTML = usersTable;
    $("#allUsersTable");
}

async function createUser() {
    let userRolesArr = [];
    let userRoles = document.getElementById("listRoles").getElementsByTagName("option");
    for (let i = 0; i < userRoles.length; i++) {
        if (userRoles[i].selected) {
            let role = {
                id: userRoles[i].id,
                role: userRoles[i].value
            }
            userRolesArr.push(role);
        }
    }
    let user = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        age: document.getElementById("age").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        roles: userRolesArr
    };
    await fetch("/api/v1/admin/create", {
        method: "POST",
        headers: {
            "Content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(user)
    });
    await getAllUsers();
}

function getModalEditWindow(userId) {
    fetch('/api/v1/admin/' + userId)
        .then(response => response.json())
        .then(user => {
            let modalWindow = document.getElementById('modalDiv');
            modalWindow.innerHTML = "<div class='modal fade' id='modalWindowData' tabindex='-1' role='dialog'\n" +
                "     aria-hidden='true'>\n" +
                "    <div class='modal-dialog'>\n" +
                "        <div class='modal-content'>\n" +
                "            <div class='modal-header'>\n" +
                "                <h5 class='modal-title' id='ModalHeader'>Edit user</h5>\n" +
                "                <button type='button' class='close' data-dismiss='modal'\n" +
                "                        aria-label='Close'>\n" +
                "                    <span aria-hidden='true'>&times;</span>\n" +
                "                </button>\n" +
                "            </div>\n" +
                "            <div class='modal-body'>\n" +
                "                <div style='text-align: center' class='form-group'>\n" +
                "                    <form class='UserForm' method='PATCH' id='idUserForm'>\n" +
                "                        <label for='idModal' name='id'>ID</label>\n" +
                "                        <br/>\n" +
                "                        <input id='idModal' name='id' value='" + user.id + "'" + " required disabled/>\n" +
                "                        <br/>\n" +
                "                        <label for='firstNameModal' name='firstName'>First name</label>\n" +
                "                        <br/>\n" +
                "                        <input type='text' id='firstNameModal' name='firstName' value='" + user.firstName + "'" + " required/>\n" +
                "                        <br/>\n" +
                "                        <label for='lastNameModal' name='lastName'>Last name</label>\n" +
                "                        <br/>\n" +
                "                        <input type='text' id='lastNameModal' name='lastName' value='" + user.lastName + "'" + " required/>'\n" +
                "                        <br/>\n" +
                "                        <label for='ageModal' name='age'>Age</label>\n" +
                "                        <br/>\n" +
                "                        <input type='text' id='ageModal' name='age'  value='" + user.age + "'" + " required/>\n" +
                "                        <br/>\n" +
                "                        <label for='usernameModal' name='username'>Username</label>\n" +
                "                        <br/>\n" +
                "                        <input type='text' id='usernameModal' name='username' value='" + user.username + "'" + " required/>\n" +
                "                        <br/>\n" +
                "                        <label for='passwordModal' name='password'>Password</label>\n" +
                "                        <br/>\n" +
                "                        <input type='password' id='passwordModal' name='password'/>\n" +
                "                        <br/>\n" +
                "                        <span>Roles:</span>\n" +
                "                        <br/>\n" +
                "                        <select class='userRolesSelect' required multiple style='width: 200px' size='2'\n" +
                "                                id='listRolesModal'>\n" +
                "                                   <option value='ROLE_ADMIN' id='1'>ADMIN</option>\n" +
                "                                   <option value='ROLE_USER' id='2'>USER</option>\n" +
                "                        </select>\n" +
                "                        <br/>\n" +
                "                        <br/>\n" +
                "                    </form>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "            <div class='modal-footer'>\n" +
                "                <button type='button' class='btn btn-secondary'\n" +
                "                        data-dismiss='modal'>Close\n" +
                "                </button>\n" +
                "                <button type='submit' data-dismiss='modal' class='btn btn-info' onclick='editUser()'>Edit</button>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</div>";
            $("#modalWindowData").modal();
        });
}

async function editUser() {
    let userRolesArr = [];
    let userRoles = document.getElementById("listRolesModal").getElementsByTagName("option");
    for (let i = 0; i < userRoles.length; i++) {
        if (userRoles[i].selected) {
            let role = {
                id: userRoles[i].id,
                role: userRoles[i].value
            }
            userRolesArr.push(role);
        }
    }
    let user = {
        id: document.getElementById("idModal").value,
        firstName: document.getElementById("firstNameModal").value,
        lastName: document.getElementById("lastNameModal").value,
        age: document.getElementById("ageModal").value,
        username: document.getElementById("usernameModal").value,
        password: document.getElementById("passwordModal").value,
        roles: userRolesArr
    };
    await fetch("/api/v1/admin/update", {
        method: "PATCH",
        headers: {
            "Content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(user)
    });
    await getAllUsers();
}

function getModalDeleteWindow(userId) {
    fetch('/api/v1/admin/' + userId)
        .then(response => response.json())
        .then(user => {
            let modalWindow = document.getElementById('modalDiv');
            modalWindow.innerHTML = "<div class='modal fade' id='modalWindowData' tabindex='-1' role='dialog'\n" +
                "     aria-hidden='true'>\n" +
                "    <div class='modal-dialog'>\n" +
                "        <div class='modal-content'>\n" +
                "            <div class='modal-header'>\n" +
                "                <h5 class='modal-title' id='ModalHeader'>Delete user</h5>\n" +
                "                <button type='button' class='close' data-dismiss='modal'\n" +
                "                        aria-label='Close'>\n" +
                "                    <span aria-hidden='true'>&times;</span>\n" +
                "                </button>\n" +
                "            </div>\n" +
                "            <div class='modal-body'>\n" +
                "                <div style='text-align: center' class='form-group'>\n" +
                "                    <form class='UserForm' method='PATCH' id='idUserForm'>\n" +
                "                        <label for='idModal' name='id'>ID</label>\n" +
                "                        <br/>\n" +
                "                        <input id='idModal' name='id' value='" + user.id + "'" + " required disabled/>\n" +
                "                        <br/>\n" +
                "                        <label for='firstNameModal' name='firstName'>First name</label>\n" +
                "                        <br/>\n" +
                "                        <input type='text' id='firstNameModal' name='firstName' value='" + user.firstName + "'" + " required disabled/>\n" +
                "                        <br/>\n" +
                "                        <label for='lastNameModal' name='lastName'>Last name</label>\n" +
                "                        <br/>\n" +
                "                        <input type='text' id='lastNameModal' name='lastName' value='" + user.lastName + "'" + " required disabled/>'\n" +
                "                        <br/>\n" +
                "                        <label for='ageModal' name='age'>Age</label>\n" +
                "                        <br/>\n" +
                "                        <input type='text' id='ageModal' name='age'  value='" + user.age + "'" + " required disabled/>\n" +
                "                        <br/>\n" +
                "                        <label for='usernameModal' name='username'>Username</label>\n" +
                "                        <br/>\n" +
                "                        <input type='text' id='usernameModal' name='username' value='" + user.username + "'" + " required disabled/>\n" +
                "                        <br/>\n" +
                "                        <label for='passwordModal' name='password'>Password</label>\n" +
                "                        <br/>\n" +
                "                        <input type='password' id='passwordModal' name='password' disabled/>\n" +
                "                        <br/>\n" +
                "                        <span>Roles:</span>\n" +
                "                        <br/>\n" +
                "                        <select class='userRolesSelect' required multiple style='width: 200px' size='2'\n" +
                "                                id='listRolesModal' disabled>\n" +
                "                                   <option value='ROLE_ADMIN' id='1'>ADMIN</option>\n" +
                "                                   <option value='ROLE_USER' id='2'>USER</option>\n" +
                "                        </select>\n" +
                "                        <br/>\n" +
                "                        <br/>\n" +
                "                    </form>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "            <div class='modal-footer'>\n" +
                "                <button type='button' class='btn btn-secondary'\n" +
                "                        data-dismiss='modal'>Close\n" +
                "                </button>\n" +
                "                <button type='submit' data-dismiss='modal' class='btn btn-danger' onclick='deleteUser(" + user.id + ")'>Delete</button>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</div>";
            $("#modalWindowData").modal();
        });
}

async function deleteUser(userId) {
    await fetch("/api/v1/admin/" + userId + "/remove", {
        method: "DELETE",
        headers: {
            "Content-type": "application/json;charset=UTF-8"
        }
    });
    await getAllUsers();
}