const token = localStorage.getItem('token')


const categoriesChoice = () => {

    fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(categories => {
            const categoriesBt = document.getElementsByClassName('listElement')
            const setChoises = new Set()


        })
}


const checkToken = () => {
    console.log(token)
    if (token) {
        generateLogoutButton()
        generateTobar()

    } else {
        generateCategoriesList()
        //categoriesChoice()
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

