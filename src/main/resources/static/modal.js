/**
 *
 */
// $(document).ready(function () {
//     $('.table .btn').on('click', function (event) {
//         $('.myForm #exampleModal').modal()
//     })
// })


var exampleModal = document.getElementById('exampleModal')
var delModal = document.getElementById('delModal');
var saveButton = exampleModal.querySelector('.save-button');
var delButton = delModal.querySelector('.del-button')

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

    fetch('/api/' + recipient)
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
    var userId = exampleModal.querySelector('.user-id').value
    // fetch('/api/user/save1/' + userId)

    let selectedRoles = [];
    let roleOptions = exampleModal.querySelectorAll('.user-roles option:checked');

    roleOptions.forEach((option) => {
        selectedRoles.push({
            id: option.value,
            name: option.textContent
        });
    });

    let user = {
        id: exampleModal.querySelector('.user-id').value,
        username: exampleModal.querySelector('.user-username').value,
        name: exampleModal.querySelector('.user-name').value,
        surname: exampleModal.querySelector('.user-sur-name').value,
        age: exampleModal.querySelector('.user-age').value,
        email: exampleModal.querySelector('.user-email').value,
        password: exampleModal.querySelector('.user-password').value,
        roles: selectedRoles

    };

    fetch('/api/save', {
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
exampleModal.addEventListener('show.bs.modal', function (event) {

    var button = event.relatedTarget

    var recipient = button.getAttribute('data-bs-whatever')
    var modalTitle = exampleModal.querySelector('.modal-title')
    var modalUserId = exampleModal.querySelector('.user-id')
    var modalBodyUserName = exampleModal.querySelector('.user-username')
    var modalBodyName = exampleModal.querySelector('.user-name')
    var modalBodySurName = exampleModal.querySelector('.user-sur-name') //указать класс там вверху, у поля
    var modalBodyAge = exampleModal.querySelector('.user-age')
    var modalBodyEmail = exampleModal.querySelector('.user-email')
    var modalBodyPassword = exampleModal.querySelector('.user-password')
    var modalBodyRoles = exampleModal.querySelector('.user-roles')

    modalTitle.textContent = 'Обновить пользователя с ID:' + recipient

    fetch('/api/' + recipient)
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
