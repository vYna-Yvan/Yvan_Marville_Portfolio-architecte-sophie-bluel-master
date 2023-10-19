const token = localStorage.getItem('token')
const logButton = document.getElementById('logBt')

const checkToken = () => {
    console.log(token)
    if (token) {
        window.location.href = '../index.html'

    }
}
checkToken()



//récupeérer le token sur swaggerconsole.log(passWordContent)
//console.log(userEmail, userPassWord);
const loginUser = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value
    const body = {
        email, password
    }
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then((res) => {

            if (res.ok) {
                return res.json()
            } else {
                return alert(res.statusText)

            }
        })
        .then((user) => {
            localStorage.setItem('token', user.token)
            localStorage.setItem('userId', user.userId)
            window.location.href = '../index.html'
        })
        .catch((err) => {
            console.log(err)
        })
}



logButton.addEventListener('click', loginUser)


