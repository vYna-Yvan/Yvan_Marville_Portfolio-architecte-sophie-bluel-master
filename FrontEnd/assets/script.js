const token = localStorage.getItem('token')

const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    let header = document.getElementById('header')
    header.classList.remove('mt30')
    document.querySelector('.top-bar').remove()

    generateLoginBt()

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

