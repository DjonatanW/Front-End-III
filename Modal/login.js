


(() => {

  const formLogin = document.getElementById('form-login')
  const emailLogin = document.getElementById('email-login')
  const passwordLogin = document.getElementById('password-login')

  //Alerts
  const successAlert = document.getElementById('success-alert-login')
  const errorAlert = document.getElementById('error-alert-login')

  formLogin.addEventListener('submit', async (event) => {
    event.preventDefault()

    const data = {
      email: emailLogin.value,
      password: passwordLogin.value
    }

    try {
      const response = await api.post('/users/login', data)
      if (response.status === 200) {
        const userData = response.data

        localStorage.setItem('userId', userData.userId)

        successAlert.classList.remove('d-none')
        errorAlert.classList.add('d-none')
        
        
        setTimeout(() => {
          location.href = './notes.html'
        },3000)
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.errorMessage ?? 'Erro ao fazer o login. Por favor, tente novamente.'

      errorAlert.innertText = errorMessage

      errorAlert.classList.remove('d-none')
      successAlert.classList.add('d-none')
    }
  })
})()