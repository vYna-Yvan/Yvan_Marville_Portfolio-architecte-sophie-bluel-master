const token = localStorage.getItem('token')

const generateLoginBt = () => {
    console.log('1')
    document.querySelector('.navlogout').remove()
    console.log('2')
    let liElement = document.createElement('li')
    let aElement = document.createElement('a')
    aElement.innerHTML = 'login'

    aElement.href = './log-in/index.html'
    liElement.appendChild(aElement)
    const parentElement = document.getElementById('nav-menu')
    parentElement.insertBefore(liElement, parentElement.childNodes[4])


}
const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    let header = document.getElementById('header')
    header.classList.remove('mt30')
    document.querySelector('.top-bar').remove()

    generateLoginBt()


}

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
const generateTobar = () => {
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

const generateCategoriesList = () => {
    fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(categories => {
            const portfolio = document.getElementById('portfolio')
            const categoriesBox = document.createElement('nav')
            const listCategories = document.createElement('ul')
            categoriesBox.className = 'navCategories'
            listCategories.className = 'listCategories'
            portfolio.insertBefore(categoriesBox, portfolio.childNodes[2])
            categoriesBox.insertBefore(listCategories, categoriesBox.childNodes[0])
            const tous = document.createElement('li')
            tous.innerHTML = 'Tous'
            listCategories.insertBefore(tous, listCategories[0])
            tous.className = 'listElement'

            categories.forEach(element => {
                let listElement = document.createElement('li')
                listElement.className = 'listElement'
                listElement.innerText = element.name
                listCategories.insertBefore(listElement, listCategories[0])

            })

        })
}



const categoriesChoice = () => {
    fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(categories => {
            const choises = new Set()


        })

}


const checkToken = () => {
    console.log(token)
    if (token) {
        generateLogoutButton()
        generateTobar()

    } else {
        generateCategoriesList()
        categoriesChoice()
    }

}
checkToken()




const getWorks = () => {
    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(works => {
            const gallery = document.querySelector('.gallery')
            var child = gallery.lastElementChild;
            while (child) {
                gallery.removeChild(child);
                child = gallery.lastElementChild;
            }
            works.forEach(element => {
                var figureElement = document.createElement("figure")
                var imageElement = document.createElement("img")
                var figcaptionElement = document.createElement("figcaption")
                figcaptionElement.innerHTML = element.title
                imageElement.src = element.imageUrl
                imageElement.alt = element.title
                figureElement.appendChild(imageElement)
                figureElement.appendChild(figcaptionElement)
                gallery.appendChild(figureElement)
            })
            /*<figure>
                    <img src="http://localhost:5678/images/thumbnail_IMG_04111696506022220.jpg" alt="Abajour Tahina">
                    <figcaption>Abajour Tahina</figcaption>
                </figure>*/

        })
}
getWorks()