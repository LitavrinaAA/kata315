/**
 *
 */
// $(document).ready(function () {
//     $('.table .btn').on('click', function (event) {
//         $('.myForm #exampleModal').modal()
//     })
// })

console.log("загрузился");

    if (window.jQuery) {
    var vJq = jQuery.fn.jquery;
    console.log(vJq);
}

var updateModal = document.getElementById('updateModal')
var delModal = document.getElementById('delModal');
var saveButton = updateModal.querySelector('.save-button');
var delButton = delModal.querySelector('.del-button')

// var allUsersTable = document.getElementById('allUsersTable')
var allUsersTable = $("#allUsersTable")
document.addEventListener('DOMContentLoaded', function () {
    getAuthenticatedUser();
    fillUsersTable();
    console.log('пользователи загружены!');
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
                              <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                              data-bs-target="#updateModal" data-bs-whatever="${user.id}">
                              Обновить
                              </button>

                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" 
                                data-toggle="modal"
                                data-bs-target="#delModal"
                                onclick="openDeleteModal(${user.id})">Delete</button>
                            </td>
                        </tr>)`
                allUsersTable.append(tableRow);
                    // allUsersTable.append('<tr><td>my data</td><td>more data</td></tr>');
                // allUsersTable.append(user.id);

                }
            ))
}
// function openDeleteModal(userId) {
//     // Ваша логика здесь (если она нужна)
//     $('#delModal').modal('show'); // Вызываем отображение модального окна с id "delModal"
// }
delModal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;
    var recipient = button.getAttribute('data-bs-whatever')
    var modalTitle = delModal.querySelector('.del-modal-title')
    modalTitle.textContent = 'Удалить пользователя с ID: ' + recipient
    var modalUserId = delModal.querySelector('.del-user-id')
    var modalBodyDelUserName = delModal.querySelector('.del-user-username')
    var modalBodyName = delModal.querySelector('.del-user-name')
    var modalBodySurName = delModal.querySelector('.del-user-sur-name') //указать класс там вверху, у поля
    var modalBodyAge = delModal.querySelector('.del-user-age')
    var modalBodyEmail = delModal.querySelector('.del-user-email')
    var modalBodyPassword = delModal.querySelector('.del-user-password')
    var modalBodyRoles = delModal.querySelector('.del-user-roles')

    fetch('/api/user/' + recipient)
        .then(response => response.json()
            .then(function (json) {
                console.log(json.name)
                modalUserId.value = json.id
                modalBodyDelUserName.value = json.username
                modalBodyName.value = json.name
                modalBodySurName.value = json.surname
                modalBodyAge.value = json.age
                modalBodyEmail.value = json.email
                modalBodyPassword.value = json.password
                // Array.from(modalBodyRoles.options).forEach(option => {
                //     option.selected = false;
                // });
                // for (var i = 0; i < json.roles.length; i++) {
                //     var roleId = json.roles[i].id;
                //     Array.from(modalBodyRoles.options).forEach(option => {
                //         if (parseInt(option.value) === roleId) {
                //             option.selected = true;
                //         }
                //     });
                // }


            }))

})
delButton.addEventListener('click', function (event){
    var userId = delModal.querySelector('.del-user-id').value
if (confirm('Are you sure you want to delete this user?')) {
    fetch('/api/deleteUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: userId })
    })
        .then(response => {
            if (response.ok) {
                // Обработка успешного удаления пользователя
                location.reload()
            } else {
                // Обработка ошибки удаления пользователя
            }
        })
        .catch(error => {
            // Обработка сетевой ошибки
        });
}
})
saveButton.addEventListener('click', function (event) {
    var userId = updateModal.querySelector('.user-id').value


    // let selectedRoles = [];
    // let roleOptions = updateModal.querySelectorAll('.user-roles option:checked');

    // roleOptions.forEach((option) => {
    //     selectedRoles.push({
    //         id: option.value,
    //         name: option.textContent
    //     });
    // });

    let user = {
        id: updateModal.querySelector('.user-id').value,
        username: updateModal.querySelector('.user-username').value,
        name: updateModal.querySelector('.user-name').value,
        surname: updateModal.querySelector('.user-sur-name').value,
        age: updateModal.querySelector('.user-age').value,
        email: updateModal.querySelector('.user-email').value,
        password: updateModal.querySelector('.user-password').value,
        // roles: selectedRoles

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
    var modalBodyUserName = updateModal.querySelector('.user-username')
    var modalBodyName = updateModal.querySelector('.user-name')
    var modalBodySurName = updateModal.querySelector('.user-sur-name') //указать класс там вверху, у поля
    var modalBodyAge = updateModal.querySelector('.user-age')
    var modalBodyEmail = updateModal.querySelector('.user-email')
    var modalBodyPassword = updateModal.querySelector('.user-password')
    var modalBodyRoles = updateModal.querySelector('.user-roles')

    modalTitle.textContent = 'Обновить пользователя с ID:' + recipient
    fetch('/api/roles')
        .then(response => response.json()
            . then(roles => {
                const selectElement = document.querySelector('.user-roles');
                roles.forEach(role => {
                    const option = document.createElement('option');
                    option.value = role.id;
                    option.text = role.name;
                    selectElement.appendChild(option);
                });
            }))
        // Находим элемент select по его классу
        const selectElement = document.querySelector('.user-roles');

    console.log("пробую получить данные пользователя")
    fetch('/api/user/' + recipient)
        .then(response => response.json()
            .then(function (json) {
                console.log(json.name)
                modalUserId.value = json.id
                modalBodyUserName.value = json.username
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
document.addEventListener('DOMContentLoaded', function () {
    getAuthenticatedUser();
});

function getAuthenticatedUser() {

    fetch('/api/user')
        .then(response => response.json())
        .then(json => {
            document.getElementById('authenticatedUserEmail').textContent = json.email;
            // Получаем массив имен ролей
            let roleNames = json.roles.map(role => role.name);
            // Преобразуем массив имен ролей в одну строку, разделяя их запятой
            const rolesString = roleNames.join(', ');
            // Устанавливаем полученную строку в соответствующий элемент
            document.querySelector('.user-roles').textContent = rolesString;
            roleNames.forEach(role => {
                console.log(role);
                if (role === 'ROLE_ADMIN') {
                    document.querySelector('.user-role-admin').style.display = 'block';
                }
                if (role === 'ROLE_USER') {
                    document.querySelector('.user-role-user').style.display = 'block';
                }
            });
            // document.querySelector('.user-id').textContent = json.id;
            // document.querySelector('.user-name').textContent = json.name;
            // document.querySelector('.user-surname').textContent = json.surname;
            // document.querySelector('.user-age').textContent = json.age;
            // document.querySelector('.user-email').textContent = json.email;
        })
}
