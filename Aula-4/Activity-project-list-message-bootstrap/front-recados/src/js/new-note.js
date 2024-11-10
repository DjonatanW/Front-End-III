const formNewNote = document.getElementById('form-new-note')
const title = document.getElementById('title')
const description = document.getElementById('description')

async function createNewNote(note) {
  try {
    const response = await api.post('/messages/message', note)

    if (response.status === 201) {
      alert('Recado cadastrado com sucesso!')

      title.value = ''
      description.value = ''

      location.href = 'list-note.html'
    }
  } catch (error) {
    console.error('Erro ao cadastar recado', error)
  }
}

formNewNote.addEventListener('submit', (event) => {
  event.preventDefault()

  const email = localStorage.getItem('email')

  const newNote = {
    title: title.value,
    description: description.value,
    email
  }

  createNewNote(newNote)
})
