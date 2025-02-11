const url = "./assets/data/clothe.json"
const clotheTemplate = document.querySelector('[clothe-card-template]')
const clotheCardsContainer = document.querySelector('[clothe-cards-container]')
const searchInput = document.querySelector('[data-search]')

let clothesArray = []

const detectInput = e => {
    const value = e.target.value.toLowerCase()
    clothesArray.forEach(clothe =>{
        if(clothe.name.toLowerCase().includes(value)){
            clothe.element.classList.remove('hide')
        }else{
            clothe.element.classList.add('hide')
        }
    })
}

//Fetch
fetch(url)
.then(response => response.json())
.then(data => {
    //Recorrer el JSON
    clothesArray = data.map(element => {
        //Crear un Fragmento y añadir la info del JSON a los nodos hijos del fragmento
        const card = clotheTemplate.content.cloneNode(true).children[0]
        const image = card.querySelector('[clothe-image]')
        image.src = element.image
        const header = card.querySelector('[clothe-header]')
        header.textContent = element.name
        const body = card.querySelector('[clothe-body]')
        body.textContent = element.price
        clotheCardsContainer.append(card)
        return {name: element.name, price: element.price, image: element.image, element: card}
    })
})

searchInput.addEventListener('input', detectInput)