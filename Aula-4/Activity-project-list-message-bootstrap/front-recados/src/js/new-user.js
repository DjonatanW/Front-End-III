const formNewUser = document.getElementById('form-new-user')

const name = document.getElementById('name')
const email = document.getElementById('email')
const password = document.getElementById('password')

async function addNewUser(data) {
  try {
    const response = await api.post('/users/signup', data)

    if (response.status === 201) {
      location.href = 'login.html'
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error('Erro 400: Requisição inválida:', error.response.data.message)
    } else {
      console.error('Erro ao cadastrar usuário', error)
    }
  }
}

formNewUser.addEventListener('submit', (event) => {
  event.preventDefault()

  const data = {
    name: name.value,
    email: email.value,
    password: password.value
  }

  addNewUser(data)
})