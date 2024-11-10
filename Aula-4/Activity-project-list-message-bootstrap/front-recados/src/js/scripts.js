const notesContainer = document.getElementById('notes-list')
const prevPage = document.getElementById('prev-page')
const nextPage = document.getElementById('next-page')

let currentPage = 1
let totalPages = 1

async function fetchNotes(page) {
  try {
    notesContainer.innerHTML = ''
    const email = localStorage.getItem('email')

    if (!email) {
      alert('Você precisa fazer login para visualizar os recados.')
       location.href = 'login.html'
      return
    }

    const params = {
      page,
      perPage: 3
    }

    const response = await api.get(`/messages/get/${email}`, { params })
    const notes = response.data.message

    totalPages = response.data.totalPages

    notes.forEach((note) => {
      const noteCard = document.createElement('div')
      noteCard.classList.add('card')

      noteCard.innerHTML = `
        <h3 class="card-title">${note.title}</h3>
        <p class="card-description">${note.description}</p>

        <div class="card-icons">
          <i class="bi bi-trash" data-id=${note.id}></i>
          <i class="bi bi-pencil" data-id=${note.id}></i>
        </div>
      `
      
      notesContainer.appendChild(noteCard)

      const editIcon = noteCard.querySelector('.bi-pencil')
      editIcon.addEventListener('click', () => {
        const noteId = editIcon.getAttribute('data-id')

        navigateToEditPage(noteId)
      })

      const deleteIcon = noteCard.querySelector('.bi-trash')
      deleteIcon.addEventListener('click', () => {
        const noteId = deleteIcon.getAttribute('data-id')

        deleteNote(noteId)
      })

      if (notes.length === 0) {
        console.log('Nenhum recado para mostar')
      }
      
      updatePaginationButtons()

    })
  } catch (error) {
    console.error('Erro ao buscar recados.', error)
  }
}

function navigateToEditPage(noteId) {
  location.href = `edit-note.html?id=${noteId}`
}

fetchNotes(currentPage)

prevPage.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--

    fetchNotes(currentPage)
  }

})

nextPage.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++

    fetchNotes(currentPage)
  }
})

function updatePaginationButtons() {
  prevPage.disabled = currentPage === 1 
  nextPage.disabled = currentPage === totalPages
}


const newNoteButton = document.getElementById('btn-new-note')

newNoteButton.addEventListener('click', (event) => {  
  event.preventDefault()
  location.href = 'new-note.html'
})

document.getElementById('btn-logout').addEventListener('click', () => {
  localStorage.removeItem('email')
  location.href = 'login.html'
})
