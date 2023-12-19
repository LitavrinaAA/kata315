
let allRoles = [];
var updateModal = document.getElementById('updateModal')
var delModal = document.getElementById('delModal');
let newUserForm = document.getElementById('newUserForm');

var updateButton = updateModal.querySelector('.update-button');
var delButton = delModal.querySelector('.del-button')



var allUsersTable = $("#allUsersTable")
document.addEventListener('DOMContentLoaded', async function () {
    try {
    await getAuthenticatedUser();
    await getRoles();
    await fillUsersTable();
    await fillNewUserRoles();
    console.log('пользователи загружены!');
    } catch (error) {
        console.error('There has been a problem:', error);
    }
});
function fillUsersTable() {
    // allUsersTable.empty()
    fetch('/api/users')
        .then(res => res.json())
        .then(data =>
            data.forEach(user => {
                // console.log(user.id, user.name, user.surname, user.age, user.email );

                    let tableRow = `$(
                    <tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.surname}</td>
                            <td>${user.age}</td>
                            <td>${user.email}</td>
                            <td>${user.roles.map(role => ' ' + role.name)}</td>
                            <td>
                              <button type="button" class="btn btn-primary" 
                              data-bs-toggle="modal"
                              data-bs-target="#updateModal" 
                              data-bs-whatever="${user.id}">
                              Обновить
                              </button>

                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" 
                                data-bs-toggle="modal"
                                data-bs-target="#delModal"
                                data-bs-whatever="${user.id}">
                                Удалить
                                </button>                                
                            </td>
                        </tr>)`
                allUsersTable.append(tableRow);
                    // allUsersTable.append('<tr><td>my data</td><td>more data</td></tr>');
                // allUsersTable.append(user.id);

                }
            ))
}
function fillNewUserRoles() {

    const userRoles = document.querySelector('.new-user-roles');

    // Очистка списка перед добавлением новых элементов, иначе задваивается
    userRoles.innerHTML = '';
    console.log("Заполнить ролями");
    console.log(allRoles);

    // Добавление новых элементов из allRoles
    allRoles.forEach(role => {
        const option = document.createElement('option');
        option.value = role.id;
        option.text = role.name;
        console.log("роль: " + role);
        userRoles.appendChild(option);
    });
}

document.getElementById("save-user-button").addEventListener("click", function() {
    console.log("кнопка создать ");
    let selectedRoles = [];
    let roleOptions = document.querySelectorAll('.new-user-roles option:checked');

    roleOptions.forEach((option) => {
        selectedRoles.push({
            id: option.value,
            name: option.textContent
        });
    });
    let user = {
        name: document.getElementById("newUserName").value,
        surname: document.getElementById("newUserSurName").value,
        age: document.getElementById("newUserAge").value,
        email: document.getElementById("newUserEmail").value,
        password: document.getElementById("newUserPassword").value,
        roles: selectedRoles
    };


    fetch('/api/addNewUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
            confirm('Ошибка, не удалось сохранить.');
        }
        return response.json();
    })
        .then(data => {
            console.log('Ура! Пользователь успешно сохранен:', data);
            confirm('Пользователь успешно сохранен:', data);
            location.reload();
        })
        .catch(error => {
            console.error('Произошла ошибка при сохранении пользователя:', error);
            confirm('Произошла ошибка при сохранении пользователя:', error);

        });

});
delModal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;
    var userId = button.getAttribute('data-bs-whatever')

    var modalTitle = delModal.querySelector('.del-modal-title')
    modalTitle.textContent = 'Удалить пользователя с ID: ' + userId

    //проля ввода
    var modalUserId = delModal.querySelector('.del-user-id')
    var modalBodyName = delModal.querySelector('.del-user-name')
    var modalBodySurName = delModal.querySelector('.del-user-sur-name') //указать класс  у поля
    var modalBodyAge = delModal.querySelector('.del-user-age')
    var modalBodyEmail = delModal.querySelector('.del-user-email')
    var modalBodyPassword = delModal.querySelector('.del-user-password')

    //роли
    var modalBodyRoles = delModal.querySelector('.del-user-roles')
    var modalBodyRolesAll = document.querySelector('.del-user-roles');
    modalBodyRolesAll.innerHTML = '';
    allRoles.forEach(role => {
        const option = document.createElement('option');
        option.value = role.id;
        option.text = role.name;
        modalBodyRolesAll.appendChild(option);
    });

    //получить все данные для отображения перед удалением
    console.log("получаю данные пользователя для удаления")
    fetch('/api/user/' + userId)
        .then(response => response.json()
            .then(function (json) {
                console.log(json.name)
                modalUserId.value = json.id
                modalBodyName.value = json.name
                modalBodySurName.value = json.surname
                modalBodyAge.value = json.age
                modalBodyEmail.value = json.email
                modalBodyPassword.value = json.password
                Array.from(modalBodyRoles.options).forEach(option => {
                    option.selected = false;
                });
                for (var i = 0; i < json.roles.length; i++) {
                    var roleId = json.roles[i].id;
                    Array.from(modalBodyRoles.options).forEach(option => {
                        if (parseInt(option.value) === roleId) {
                            option.selected = true;
                        }
                    });
                }


            }))

})

delButton.addEventListener('click', function (){
    var userId = delModal.querySelector('.del-user-id').value
if (confirm('Are you sure you want to delete this user?')) {
    fetch('/api/deleteUser/' + userId)
        .then(response => {
            if (response.ok) {
                confirm('Пользователь успешно удален');
                location.reload()
            } else {
                confirm('Ошибка удаления');
            }
        })
        .catch(error => {
            confirm('Сетевая ошибка');
        });
}
})
updateButton.addEventListener('click', function () {


    let selectedRoles = [];
    let roleOptions = updateModal.querySelectorAll('.user-roles option:checked');
    roleOptions.forEach((option) => {
        selectedRoles.push({
            id: option.value,
            name: option.textContent
        });
    });

    let user = {
        id: updateModal.querySelector('.user-id').value,
        name: updateModal.querySelector('.user-name').value,
        surname: updateModal.querySelector('.user-sur-name').value,
        age: updateModal.querySelector('.user-age').value,
        email: updateModal.querySelector('.user-email').value,
        password: updateModal.querySelector('.user-password').value,
        roles: selectedRoles

    };

    fetch('/api/updateUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(data => {
            console.log('Ура! Пользователь успешно сохранен:', data);
            location.reload()
        })
        .catch(error => {
            console.error('Произошла ошибка при сохранении пользователя:', error);
            // Дополнительные действия при ошибке сохранения пользователя
        });

})
updateModal.addEventListener('show.bs.modal', function (event) {

    var button = event.relatedTarget
    var recipient = button.getAttribute('data-bs-whatever')
    var modalTitle = updateModal.querySelector('.modal-title')
    var modalUserId = updateModal.querySelector('.user-id')

    var modalBodyName = updateModal.querySelector('.user-name')
    var modalBodySurName = updateModal.querySelector('.user-sur-name') //указать класс там вверху, у поля
    var modalBodyAge = updateModal.querySelector('.user-age')
    var modalBodyEmail = updateModal.querySelector('.user-email')
    var modalBodyPassword = updateModal.querySelector('.user-password')
    var modalBodyRoles = updateModal.querySelector('.user-roles')

    modalTitle.textContent = 'Обновить пользователя с ID:' + recipient

    var modalBodyRolesAll = document.querySelector('.user-roles');
    modalBodyRolesAll.innerHTML = '';
    allRoles.forEach(role => {
        const option = document.createElement('option');
        option.value = role.id;
        option.text = role.name;
        modalBodyRolesAll.appendChild(option);
    });


    console.log("пробую получить данные пользователя")
    fetch('/api/user/' + recipient)
        .then(response => response.json()
            .then(function (json) {
                console.log(json.name)
                modalUserId.value = json.id
                modalBodyName.value = json.name
                modalBodySurName.value = json.surname
                modalBodyAge.value = json.age
                modalBodyEmail.value = json.email
                modalBodyPassword.value = json.password

                Array.from(modalBodyRoles.options).forEach(option => {
                    option.selected = false;
                });
                // опции по ролями
                for (var i = 0; i < json.roles.length; i++) {
                    var roleId = json.roles[i].id;
                    Array.from(modalBodyRoles.options).forEach(option => {
                        if (parseInt(option.value) === roleId) {
                            option.selected = true;
                        }
                    });
                }

            }))
})


async function getAuthenticatedUser() {

    let response =   await fetch('/api/user');
    let user1 =  await response.json();

    document.getElementById('authenticatedUserEmail').textContent = user1.email;

    let rolesArray = user1.roles.map(role => role.name)
    let rolesStr = rolesArray.join(', ')
    document.querySelector('.admin-roles').textContent = rolesStr;

    rolesArray.forEach(role => {
        console.log(role);
        if (role === 'ROLE_ADMIN') {
            document.querySelector('.user-role-admin').style.display = 'block';
        }
        if (role === 'ROLE_USER') {
            document.querySelector('.user-role-user').style.display = 'block';
        }
    });

    console.log("роли в шапку" + user1.roles.map(role => role.name))
}
// Функция для получения списка ролей
async function getRoles() {
    //заполнить глобальную переменную  allRoles.
    // Из нее заполняются роли в : 1) модальные окна удаления и 2) обновления 3) форма создания пользователя

    try {
        const response = await fetch('/api/roles');

        if (!response.ok) {
            console.error('Network response was not ok');
        }

        allRoles = await response.json();

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
