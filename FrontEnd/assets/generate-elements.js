//le token
const tokenModal = localStorage.getItem('token')
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
// afficher les elements dans la modal
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
                            Authorization: "Bearer " + tokenModal,
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
    modalIcon.className = 'fa-solid fa-xmark'
    modalTitle.className = 'modalTitle'
    modalTitle.innerHTML = 'Galerie photo'
    modalshowElements.className = 'modalShowElements'
    addElementBt.className = 'addElementBt'
    addElementBt.innerHTML = 'Ajouter une photo'
    modalBackground.appendChild(modal)
    modal.appendChild(modalIcon)
    modal.appendChild(modalTitle)
    modal.insertBefore(modalshowElements, modal.childNodes[2])


    getModalWorks()

    modal.insertBefore(addElementBt, modal.childNodes[3])
    document.getElementById('body').appendChild(modalBackground)
    addElementBt.addEventListener('click', generateModalContainerAdd)

}
// Modal pour ajouter des elements 
const generateModalContainerAdd = () => {
    console.log('Je suis la modal add')
    const modal = document.querySelector('.modal')

    var child = modal.lastElementChild;
    while (child) {
        modal.removeChild(child);
        child = modal.lastElementChild;
    }
    let returnArrow = document.createElement('i')
    let closeIcon = document.createElement('i')
    let modalAddTitle = document.createElement('h2')

    modal.classList.add('ModalAdd')
    returnArrow.className = 'fa-solid fa-arrow-left-long returnArrow'
    closeIcon.className = 'fa-solid fa-xmark closeIcon'
    modalAddTitle.className = 'modalAddTitle'
    modalAddTitle.innerHTML = 'Ajout photo'
    modal.appendChild(returnArrow)
    modal.appendChild(closeIcon)
    modal.appendChild(modalAddTitle)

    // <i class="fa-solid fa-arrow-left-long"></i> flèche return
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
