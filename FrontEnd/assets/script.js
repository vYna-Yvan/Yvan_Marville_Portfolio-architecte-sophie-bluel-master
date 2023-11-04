const token = localStorage.getItem('token')

const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    let header = document.getElementById('header')
    header.classList.remove('mt30')
    document.querySelector('.top-bar').remove()

    generateLoginBt()

}
//button log-out
const generateLogoutButton = () => {
    const navLogBt = document.querySelector('.navLogin')
    navLogBt.remove()
    let liElement = document.createElement('li')
    let aElement = document.createElement('a')
    aElement.innerHTML = 'logout'
    aElement.className = 'navlogout'
    aElement.addEventListener('click', logoutUser)
    liElement.appendChild(aElement)
    const parentElement = document.getElementById('nav-menu')
    parentElement.insertBefore(liElement, parentElement.childNodes[4])


}

//La top-bar 
const generateTopbar = () => {
    let topBar = document.createElement('div')
    topBar.className = 'top-bar'
    let body = document.getElementById('body')
    body.appendChild(topBar)
    let header = document.getElementById('header')
    header.className = 'mt30'
    let modeEdition = document.createElement('div')
    let modeEditionIcon = document.createElement('i')
    let modeEditionTexte = document.createElement('p')
    modeEdition.className = 'top-bar-box'
    modeEditionIcon.className = 'fa-regular fa-pen-to-square'
    modeEditionTexte.className = 'top-bar-text'
    topBar.appendChild(modeEdition)
    modeEdition.appendChild(modeEditionIcon)
    modeEdition.insertBefore(modeEditionTexte, modeEdition.childNodes[1])
    modeEditionTexte.innerHTML = 'Mode édition'

}
//button eidt
const generateModifierBt = () => {
    const portfolio = document.getElementById('portfolio')
    const portfolioTitle = document.querySelector('#portfolio h2')
    let titleEditBox = document.createElement('div')
    let editBox = document.createElement('div')
    let titleEditBoxIcon = document.createElement('i')
    let titleEditBoxTexte = document.createElement('p')
    portfolioTitle.className = 'portfolioTitle'
    titleEditBox.className = 'titleEditBox'
    editBox.className = 'editBox'
    editBox.addEventListener('click', generateModaleContainerSupp)
    titleEditBoxIcon.className = 'titleEditBoxIcon fa-regular fa-pen-to-square'
    titleEditBoxTexte.className = 'titleEditBoxTexte'
    titleEditBoxTexte.innerHTML = 'Modifier'
    portfolio.appendChild(titleEditBox)
    portfolio.insertBefore(titleEditBox, portfolio.childNodes[0])
    titleEditBox.appendChild(portfolioTitle)
    titleEditBox.insertBefore(portfolioTitle, titleEditBox.childNodes[0])
    titleEditBox.insertBefore(editBox, titleEditBox.childNodes[1])
    editBox.insertBefore(titleEditBoxIcon, editBox.childNodes[0])
    editBox.insertBefore(titleEditBoxTexte, editBox.childNodes[1])
}

// Modal pour surpprimer des elements
const generateModaleContainerSupp = () => {

    let modalBackground = document.createElement('div')
    let modal = document.createElement('div')
    let modalIcon = document.createElement('i')
    let modalTitle = document.createElement('h2')
    let modalshowElements = document.createElement('div')
    let addElementBt = document.createElement('div')
    modalBackground.className = 'modalBackground'
    modal.className = 'modal'
    modalIcon.className = 'fa-solid fa-xmark closeFirstModal'
    modalTitle.className = 'modalTitle'
    modalTitle.innerHTML = 'Galerie photo'
    modalshowElements.className = 'modalShowElements'
    addElementBt.className = 'addElementBt'
    addElementBt.innerHTML = 'Ajouter une photo'
    modalBackground.appendChild(modal)
    modal.appendChild(modalIcon)
    modal.appendChild(modalTitle)
    modal.insertBefore(modalshowElements, modal.childNodes[2])
    const getModalWorks = () => {
        fetch("http://localhost:5678/api/works")

            .then(response => response.json())
            .then(works => {
                const modalShowElements = document.querySelector('.modalShowElements')


                var child = modalShowElements.lastElementChild;
                while (child) {
                    modalShowElements.removeChild(child);
                    child = modalShowElements.lastElementChild;
                }
                console.log(works)

                works.forEach(element => {
                    const deleteWork = () => {
                        fetch(`http://localhost:5678/api/works/${element.id}`, {
                            method: 'DELETE',
                            headers: {
                                Authorization: "Bearer " + token,
                                "Content-Type": "application/json",
                                Accept: "application/json",
                            },

                        }).then(response => response.json())

                    }
                    var figureElement = document.createElement("figure")
                    var imageElement = document.createElement("img")
                    var trashContainerElement = document.createElement('div')
                    var trashElement = document.createElement('i')
                    figureElement.className = 'modalFigure'
                    imageElement.className = 'modalImage'
                    trashContainerElement.className = 'trashContainer'
                    trashElement.className = 'fa-solid fa-trash-can trashBt'
                    imageElement.src = element.imageUrl
                    imageElement.alt = element.title
                    figureElement.appendChild(imageElement)
                    trashContainerElement.appendChild(trashElement)
                    figureElement.appendChild(trashContainerElement)
                    modalShowElements.appendChild(figureElement)
                    trashContainerElement.addEventListener('click', deleteWork)




                })

            })
    }


    getModalWorks()

    modal.insertBefore(addElementBt, modal.childNodes[3])
    document.getElementById('body').appendChild(modalBackground)
    addElementBt.addEventListener('click', generateModalContainerAdd)

}
const addWork = (e) => {
    e.preventDefault()
    const image = document.querySelector('.input-addpic')
    const title = document.querySelector('.inputTitle')
    const category = document.querySelector('.inputCategorySelect')
    const formData = new FormData();

    if (image.files[0]) {
        formData.append("image", image.files[0]);
    }
    else {
        return alert('Une image est requise pour ajouter un travail')
    }
    if (title.value) {
        formData.append("title", title.value);
    }
    else {
        return alert('Un titre est requis pour ajouter un travail')
    }
    if (category.value) {
        formData.append("category", category.value);
    }
    else {
        return alert('Une catégorie est requise pour ajouter un travail')
    }
    console.log(token)

    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
        },
        body: formData,
    })
}
// modal pour ajouter des elements
const generateModalContainerAdd = async () => {
    console.log('Je suis la modal add')
    const modalBackground = document.querySelector('.modalBackground')

    var child = modalBackground.lastElementChild;
    while (child) {
        modalBackground.removeChild(child);
        child = modalBackground.lastElementChild;
    }
    const categoriesList = await fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(categories => {
            return categories
        })

    /*const modalAddiv = `<div class="ModalAdd">
    <div class="close-return-box" ><i class="fa-solid fa-arrow-left arrow-return">
    </i><i class="fa-solid fa-xmark close-modal-X"></i></div>
    
    
    <h2 class="title-modalAdd">Ajout photo</h2>
    
    <div class="form-container">
    <form class="form-modalAdd" method="post" >
      <div class="ajout-picture ">
          <div class="preview-image"><img alt="image user" src="" class="import-pictures"></div>
          <i class="fa-regular fa-image icon-picture" style="color: #b9c5cc;"></i>
          <label class="label-addpic" id="buttonAddPic" for="addPic">+ Ajouter photo</label>
          <input  type="file" class="input-addpic" id="addPic" name="addPic" accept="image/png , image/jpeg, image/jpg">
          <p>jpg, png : 4mo max</p>
      </div>
        <label class="labelInputTitle" for="title">Titre</label>
        <input class="inputTitle" id="title" type="text" >
        <label for="labelInputCategory">Catégorie</label>
        <select class="inputCategorySelect" id="category" name="category" >
        <option value="" disabled selected>veuillez selectionner une catégorie</option>
        ${categoriesList.map(item => (`<option id=${item.id} class="selectcategory">${item.name}</option> `))}
        </select>
        <div class="line-container">
          <div class="line"></div>
        </div>

        <input class="button-valider" type="submit" value="Valider" />
      </form>
      </div>
      <p class="msg-error"></p>
    </div>`*/
    // ${categories.map(item => (`<option id=${item.id} class="selectcategory">${item.name}</option> `))} ça va dans select en dessous d'option
    let modalAddDiv = document.createElement('div')
    modalAddDiv.className = 'ModalAdd'
    let formContainer = document.createElement('div')
    formContainer.className = 'form-container'
    let form = document.createElement('form')
    form.className = 'form-modalAdd'
    let inputFile = document.createElement('input')
    inputFile.className = 'input-addpic'
    inputFile.type = 'file'
    let labelTitle = document.createElement('label')
    labelTitle.innerHTML = 'titre'
    labelTitle.className = 'labelInputTitle'
    let inputTitle = document.createElement('input')
    inputTitle.id = 'title'
    inputTitle.className = 'inputTitle'
    let labelCategorie = document.createElement('label')
    let selectcategory = document.createElement('select')
    selectcategory.className = 'inputCategorySelect'
    categoriesList.map(categories => {
        let categorieOption = document.createElement('option')
        categorieOption.value = categories.id
        categorieOption.innerHTML = categories.name
        selectcategory.appendChild(categorieOption)
    })
    let button = document.createElement('button')
    button.innerHTML = 'valider'

    button.addEventListener('click', addWork)
    form.appendChild(inputFile)
    form.appendChild(labelTitle)
    form.appendChild(inputTitle)
    form.appendChild(labelCategorie)
    form.appendChild(selectcategory)
    form.appendChild(button)
    formContainer.appendChild(form)
    modalAddDiv.appendChild(formContainer)
    modalBackground.appendChild(modalAddDiv)

    // modalBackground.innerHTML = modalAddiv


}







// Liste de categorie 
const generateCategoriesList = () => {
    fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(categories => {

            let object = {
                id: 0,
                name: "Tous"
            }
            categories.push(object)
            categories.sort((a, b) => a.id - b.id);
            const portfolio = document.getElementById('portfolio')
            const categoriesBox = document.createElement('div')
            const listCategories = document.createElement('ul')
            categoriesBox.className = 'navCategories'
            listCategories.className = 'listCategories'
            portfolio.insertBefore(categoriesBox, portfolio.childNodes[2])
            categoriesBox.insertBefore(listCategories, categoriesBox.childNodes[0])



            categories.forEach(element => {
                let listElement = document.createElement('li')
                listElement.className = 'listElement'
                listElement.innerText = element.name
                listCategories.insertBefore(listElement, listCategories[0])
                listElement.addEventListener('click', () => getWorks(element.id))

            })

        })
}


const checkToken = () => {

    if (token) {
        generateLogoutButton()
        generateTopbar()
        generateModifierBt()

    } else {
        generateCategoriesList()

    }
}
checkToken()


const getWorks = (categoryId) => {

    fetch("http://localhost:5678/api/works")

        .then(response => response.json())
        .then(works => {
            const gallery = document.querySelector('.gallery')
            var child = gallery.lastElementChild;
            while (child) {
                gallery.removeChild(child);
                child = gallery.lastElementChild;
            }
            console.log(works)

            works.forEach(element => {
                if (categoryId === 0) {
                    var figureElement = document.createElement("figure")
                    var imageElement = document.createElement("img")
                    var figcaptionElement = document.createElement("figcaption")
                    figcaptionElement.innerHTML = element.title
                    imageElement.src = element.imageUrl
                    imageElement.alt = element.title
                    figureElement.appendChild(imageElement)
                    figureElement.appendChild(figcaptionElement)
                    gallery.appendChild(figureElement)
                } else {
                    if (element.categoryId === categoryId) {
                        var figureElement = document.createElement("figure")
                        var imageElement = document.createElement("img")
                        var figcaptionElement = document.createElement("figcaption")
                        figcaptionElement.innerHTML = element.title
                        imageElement.src = element.imageUrl
                        imageElement.alt = element.title
                        figureElement.appendChild(imageElement)
                        figureElement.appendChild(figcaptionElement)
                        gallery.appendChild(figureElement)

                    }
                }

            })

        })
}


getWorks(0)

