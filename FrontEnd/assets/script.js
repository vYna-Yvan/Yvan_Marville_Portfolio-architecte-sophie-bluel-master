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
    modeEdition.className = 'top-bar-box'
    let modeEditionIcon = document.createElement('i')
    modeEditionIcon.className = 'fa-regular fa-pen-to-square'
    let modeEditionTexte = document.createElement('p')
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
    portfolioTitle.className = 'portfolioTitle'
    let titleEditBox = document.createElement('div')
    titleEditBox.className = 'titleEditBox'
    let editBox = document.createElement('div')
    editBox.className = 'editBox'
    let titleEditBoxIcon = document.createElement('i')
    titleEditBoxIcon.className = 'titleEditBoxIcon fa-regular fa-pen-to-square'
    let titleEditBoxTexte = document.createElement('p')
    titleEditBoxTexte.className = 'titleEditBoxTexte'
    titleEditBoxTexte.innerHTML = 'Modifier'

    editBox.addEventListener('click', generateModaleContainerSupp)
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
    modalBackground.className = 'modalBackground'
    let modal = document.createElement('div')
    modal.className = 'modal'
    modal.addEventListener('click', (e) => {
        e.stopPropagation()
    })
    let modalContainer = document.createElement('div')
    modalContainer.className = 'modalContainer'
    let modalIcon = document.createElement('i')
    modalIcon.className = 'fa-solid fa-xmark closeFirstModal'
    let modalTitle = document.createElement('h2')
    modalTitle.className = 'modalTitle'
    modalTitle.innerHTML = 'Galerie photo'
    let modalshowElements = document.createElement('div')
    modalshowElements.className = 'modalShowElements'
    let addElementBt = document.createElement('div')
    addElementBt.className = 'addElementBt'
    addElementBt.innerHTML = 'Ajouter une photo'


    modalBackground.appendChild(modal)
    modal.appendChild(modalContainer)
    modalContainer.appendChild(modalIcon)
    modalContainer.appendChild(modalTitle)
    modalContainer.insertBefore(modalshowElements, modalContainer.childNodes[2])
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
                        console.log(element.id)
                        fetch(`http://localhost:5678/api/works/${element.id}`, {
                            method: 'DELETE',
                            headers: {
                                Authorization: "Bearer " + token,
                                "Content-Type": "application/json",
                                Accept: "application/json",
                            },

                        })

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

    modalContainer.insertBefore(addElementBt, modalContainer.childNodes[3])
    document.getElementById('body').appendChild(modalBackground)
    addElementBt.addEventListener('click', generateModalContainerAdd)

    const closeModal = document.querySelector(".closeFirstModal")
    closeModal.addEventListener("click", () => {
        modalBackground.style.display = "none";
        let child = modalBackground.lastElementChild;
        while (child) {
            modalBackground.removeChild(child);
            child = modalBackground.lastElementChild;
        }
    })

    modalBackground.addEventListener('click', () => {

        modalBackground.style.display = "none";
        let child = modalBackground.lastElementChild;
        while (child) {
            modalBackground.removeChild(child);
            child = modalBackground.lastElementChild;
        }

    })



}
const addWork = (e) => {
    e.preventDefault()
    // récupère les inputs 
    const image = document.querySelector('.input-addpic')
    const title = document.querySelector('.inputTitle')
    const category = document.querySelector('.inputCategorySelect')
    const previewImage = document.querySelector('.preview-image')
    const importPictures = document.querySelector('.import-pictures')





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
    // console.log('Je suis la modal add')
    const modalBackground = document.querySelector('.modalBackground')
    const modal = document.querySelector('.modal')
    modal.addEventListener('click', (e) => {
        e.stopPropagation()
    })

    var child = modal.lastElementChild;
    while (child) {
        modal.removeChild(child);
        child = modal.lastElementChild;
    }
    const categoriesList = await fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(categories => {
            return categories
        })


    let modalCaontainer = document.createElement('div')
    modalCaontainer.className = 'ModalAdd'


    let closeReturnbox = document.createElement('div')
    closeReturnbox.className = 'close-return-box'

    let arrowReturn = document.createElement('i')
    arrowReturn.className = 'fa-solid fa-arrow-left arrow-return'

    let closeModal = document.createElement('i')
    closeModal.className = 'fa-solid fa-xmark close-modal-X'

    let modalAddTitle = document.createElement('h2')
    modalAddTitle.className = 'title-modalAdd'
    modalAddTitle.innerHTML = 'Ajout photo'

    let formContainer = document.createElement('div')
    formContainer.className = 'form-container'

    let form = document.createElement('form')
    form.className = 'form-modalAdd'

    let ajoutPicture = document.createElement('div')
    ajoutPicture.className = 'ajout-picture'

    let previewImage = document.createElement('div')
    previewImage.className = 'preview-image'

    let importPicture = document.createElement('img')
    importPicture.className = 'import-pictures'
    importPicture.alt = 'user image'
    importPicture.src = ''

    let iconPicture = document.createElement('i')
    iconPicture.className = 'fa-regular fa-image icon-picture'

    let labelFile = document.createElement('label')
    labelFile.className = 'label-addpic'
    labelFile.innerHTML = '+ Ajouter photo'

    let inputFile = document.createElement('input')
    inputFile.className = 'input-addpic'
    inputFile.type = 'file'
    inputFile.accept = 'image/png , image/jpeg, image/jpg'
    inputFile.onchange = (e) => {
        const [file] = inputFile.files
        importPicture.src = URL.createObjectURL(file)
        previewImage.style.setProperty("visibility", "visible")
        iconPicture.style.setProperty('display', 'none')
        labelFile.style.setProperty('display', 'none')
        textAdvice.style.setProperty('display', 'none')

    }

    let textAdvice = document.createElement('p')
    textAdvice.className = 'textAdvice'
    textAdvice.innerHTML = 'jpg, png : 4mo max'

    let labelTitle = document.createElement('label')
    labelTitle.innerHTML = 'titre'
    labelTitle.className = 'labelInputTitle'

    let inputTitle = document.createElement('input')
    inputTitle.id = 'title'
    inputTitle.className = 'inputTitle'

    let labelCategorie = document.createElement('label')
    let selectcategory = document.createElement('select')
    selectcategory.className = 'inputCategorySelect'
    selectcategory.value = ''
    categoriesList.map(categories => {
        let categorieOption = document.createElement('option')
        categorieOption.value = categories.id
        categorieOption.innerHTML = categories.name
        selectcategory.appendChild(categorieOption)
    })
    let button = document.createElement('button')
    button.className = 'button-valider'
    button.innerHTML = 'Valider'

    button.addEventListener('click', addWork)
    formContainer.appendChild(modalAddTitle)
    formContainer.appendChild(form)
    form.appendChild(ajoutPicture)
    //form.appendChild(inputFile)
    form.appendChild(labelTitle)
    form.appendChild(inputTitle)
    form.appendChild(labelCategorie)
    form.appendChild(selectcategory)
    form.appendChild(button)
    ajoutPicture.appendChild(previewImage)
    ajoutPicture.appendChild(iconPicture)
    ajoutPicture.appendChild(labelFile)
    ajoutPicture.appendChild(inputFile)
    ajoutPicture.appendChild(textAdvice)
    previewImage.appendChild(importPicture)
    modal.appendChild(modalCaontainer)
    modalCaontainer.appendChild(closeReturnbox)
    modalCaontainer.appendChild(formContainer)
    closeReturnbox.appendChild(arrowReturn)
    closeReturnbox.appendChild(closeModal)
    //modalBackground.appendChild(modal)

    // si les input son remplis changement de couleur button
    form.addEventListener('change', () => {
        if (inputFile.value !== '' && inputTitle.value !== '') {
            button.style.backgroundColor = '#1D6154'

            button.style.cursor = 'pointer'
        }
    })
    //retour a la première modal
    const arrowBack = document.querySelector('.arrow-return')
    arrowBack.addEventListener('click', () => {
        console.log('KFC')
        var child = modal.lastElementChild
        while (child) {
            modal.removeChild(child)
            child = modal.lastElementChild
            modal.remove(child)
            modalBackground.remove(modalBackground)
        }
        generateModaleContainerSupp()
    })
    // fermeture de modal 
    const closeModalAdd = document.querySelector(".close-modal-X")
    closeModalAdd.addEventListener("click", () => {
        modalBackground.style.display = "none";
        let child = modalBackground.lastElementChild;
        while (child) {
            modalBackground.removeChild(child);
            child = modalBackground.lastElementChild;
        }
    })

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

