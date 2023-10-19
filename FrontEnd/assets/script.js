const token = localStorage.getItem('token')


const categoriesChoice = () => {

    fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(categories => {

            const setChoises = new Set()

            categories.forEach(setChoises => {
                setChoises.add({
                    id: 1,
                    name: "Objets"
                })
                setChoises.add({
                    id: 2,
                    name: "Appartements"
                })
                setChoises.add({
                    id: 3,
                    name: "Hotels & restaurants"
                })

            })

        })

}







const checkToken = () => {
    console.log(token)
    if (token) {
        generateLogoutButton()
        generateTobar()
        generateModifierBt()

    } else {
        generateCategoriesList()


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

        })
}
getWorks()

