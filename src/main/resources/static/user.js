/**
 *
 */
// $(document).ready(function () {
//     $('.table .btn').on('click', function (event) {
//         $('.myForm #exampleModal').modal()
//     })
// })
console.log('Мой JavaScript файл загружен!');


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
            document.querySelector('.user-id').textContent = json.id;
            document.querySelector('.user-name').textContent = json.name;
            document.querySelector('.user-surname').textContent = json.surname;
            document.querySelector('.user-age').textContent = json.age;
            document.querySelector('.user-email').textContent = json.email;
        })
}

