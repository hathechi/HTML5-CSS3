var username = document.getElementById('username')
var password = document.getElementById('password')
var form = document.querySelector('#button_login')


function showError(input, message) {
    let parent = input.parentElement
    let small = parent.querySelector('small')
    small.innerHTML = message
}
function showSuccess(input) {
    let parent = input.parentElement
    let small = parent.querySelector('small')
    small.innerHTML = ''
}
function check_rong(lishInput) {
    let isRequired = false
    lishInput.forEach(input => {
        if (input.value == '') {
            showError(input, `Không được bỏ trống dòng này !`)
            isRequired = true
        } else {
            showSuccess(input)
        }
    });

    return isRequired

}

function checkLength(input) {
    if (input.value.length < 2) {
        showError(
            input,
            `Password không được nhỏ hơn 2 kí tự !`
        )
    } else if (input.value.length > 25) {
        showError(
            input,
            `Password không được lớn hơn 25 kí tự !`
        )
    } else {
        showSuccess(input)
    }
}

form.addEventListener('click', function (e) {
    e.preventDefault()
    if (!check_rong([username, password])) {
        checkLength(password)
    }
})

// //------------------------- register----------------------
// var form1 = document.querySelector('#btn_register')
// var tendangnhap = document.querySelector('#tendangnhap')
// var email = document.querySelector('#email')
// var password1 = document.querySelector('#password1')
// var confirm_password = document.querySelector('#confirm_password')



// form1.addEventListener('click', function (e) {
//     e.preventDefault()

//     if (!check_rong([tendangnhap, email, password1, confirm_password])) {
//         checkEmail(email)
//         checkPasswordsMatch(password1, confirm_password)

//     }
// })

// function checkEmail(input) {
//     let re =
//         /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

//     let isEmail = !re.test(input.value.trim())
//     if (re.test(input.value.trim())) {
//         showSuccess(input)
//     } else {
//         showError(input, 'Email sai định dạng !')
//     }
//     return isEmail
// }
// function checkPasswordsMatch(password1, confirm_password) {

//     if (password1.value !== confirm_password.value) {
//         showError(confirm_password, 'Hai password không trùng nhau !')

//     } else {
//         showSuccess(input)
//     }

// }
// ------------------------------------------------



class users {
    constructor(username, password, confirm_password, email) {

        this.username = username
        this.password = password
        this.confirm_password = confirm_password
        this.email = email

    }

    xuatthongtin() {

        console.log(`username: ${this.username}`);
        console.log(`password: ${this.password}`);
        console.log(`confirm_password: ${this.confirm_password}`);
        console.log(`email: ${this.email}`);

    }
    getUserName() {
        return this.username
    }
    getPassWord() {
        return this.password
    }
}

class StoreUser {
    constructor() {
        this.users = []
    }
    addUser(users) {
        let check = false
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].getUserName() === users.getUserName()) {
                return false
            }
        }
        this.users.push(users)
        return true
    }
    login(username, password) {
        console.log('this.user', this.users)
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].username === username && this.users[i].password === password) {
                return this.users[i];
            }
        }
        return null
    }
    save() {
        const user2 = JSON.stringify(this.users)
        localStorage.setItem('users', user2)
    }
    getData() {
        const data = localStorage.getItem('users')
        if (data) {
            const userLish = JSON.parse(data)
            const arrUser = []
            // lay lai class User 
            for (let i = 0; i < userLish.length; i++) {
                const user_temp = new users(userLish[i].username, userLish[i].password, userLish[i].confirm_password, userLish[i].email)
                arrUser.push(user_temp)
            }
            this.users = arrUser
        }
    }
    getLishUser() {
        return this.users
    }
}
const store = new StoreUser()


store.getData()
console.log('store', store)



for (let i = 0; i < store.getLishUser().length; i++) {
    store.getLishUser()[i].xuatthongtin()
}
document.querySelector('#btn_register') &&
    document.querySelector('#btn_register').addEventListener('click', function (e) {
        e.preventDefault()

        let username = document.querySelector('#tendangnhap').value
        let password = document.querySelector('#password1').value
        let confirm_password = document.querySelector('#confirm_password').value
        let email = document.querySelector('#email').value

        // tạo user mới 
        const user1 = new users(username, password, confirm_password, email)
        // add user
        const isCheck = store.addUser(user1)

        if (isCheck) {
            alert("register thanh cong")
            store.save()
        } else {
            alert("register false")

        }

    })
///// xu ly dang nhap
document.querySelector('#button_login') &&
    document.querySelector('#button_login').addEventListener('click', function (e) {
        e.preventDefault()
        let username = document.querySelector('#username').value
        let password = document.querySelector('#password').value
        // let role = document.querySelector('#role').value

        // add user
        const isCheck = store.login(username, password)
        if (isCheck) {
            // window.location = "../Home/index.html"
            window.location = "https://hathechi.github.io/HTML5-CSS3"

        } else {
            document.querySelector('#error').innerHTML = 'Sai UserName or PassWord!'
            setTimeout(remove, 1500)
            function remove() {
                document.querySelector('#error').innerHTML = ''
            }
        }

    })
//----------------------------------------end -----------------------------------------------------
