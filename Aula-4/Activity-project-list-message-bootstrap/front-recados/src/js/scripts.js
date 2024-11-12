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
      noteCard.classList.add('mb-3')
      alert("aqui")
      
      noteCard.innerHTML = `
        <h3 class="card-title">${note.title}</h3>
        <p class="card-description">${note.description}</p>

        <div class="card-icons mb-2 b-4">
          <i class="bi bi-trash p-2 fs-4" data-id=${note.id}></i>
          <i class="bi bi-pencil p-2 fs-4" data-bs-toggle="modal" data-bs-target="#form-edit-note" data-id=${note.id}></i>
        </div>
          <div class="modal fade" id="form-edit-note" tabindex="-1" aria-labelledby="form-edit-note" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-body">
                  <img src="src/images/logo.svg" alt="" class="logo" />

                  <h1 class="title">Edite seu recado</h1>
                  <h2 class="subtitle">Você pode alterar um recado já cadastrado</h2>
                  <form id="form-edit-note">
                    <div class="form-control">
                      <label for="title-edit">Título</label>
                      <input type="text" id="title-edit" placeholder="Insira um título para o recado" />
                    </div>

                    <div class="form-control">
                      <label for="description-edit">Descrição</label>
                      <textarea id="description-edit"></textarea>
                    </div>

                    <button class="btn-submit">Atualizar recado</button>
                    <button class="btn-submit" type="reset">Limpar campos</button>
                  </form>
                </div>
              </div>
            </div>
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

prevPage.addEventListener('click', (event) => {
  event.preventDefault()

  if (currentPage > 1) {
    currentPage--
    nextPage.classList.remove('active')
    prevPage.classList.remove('disabled')
    prevPage.classList.add('active')
    
    fetchNotes(currentPage)
  }
  prevPage.classList.remove('disabled')

})

nextPage.addEventListener('click', (event) => {
  event.preventDefault()

  if (currentPage < totalPages) {
    currentPage++
    prevPage.classList.remove('active')
    nextPage.classList.remove('disabled')
    nextPage.classList.add('active')
    fetchNotes(currentPage)
  }
  nextPage.classList.remove('disabled')
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
