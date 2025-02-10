const url = "./assets/data/clothe.json"
const clotheCardTemplate = document.querySelector("[clothe-card-template]")
const searchInput = document.querySelector("[data-search]")
const clotheCardsContainer = document.querySelector("[clothe-cards-container]")

let clothesArray = []

const detectInput = e => {
    const value = e.target.value.toLowerCase()
    clothesArray.forEach(clothe => {
        if(clothe.name.toLowerCase().includes(value)){
            console.log(clothe.element)
            clothe.element.classList.remove('hide')
        }else{
            clothe.element.classList.add('hide')
        }
    })
    console.log(value)
}

fetch(url)
.then(response => response.json())
.then(data => {
    clothesArray = data.map(element => {
        const card = clotheCardTemplate.content.cloneNode(true).children[0];
        const header = card.querySelector("[clothe-header]")
        const body = card.querySelector("[clothe-body]")
        const image = card.querySelector("[clothe-image]")
        header.textContent = element.name
        image.src = element.image
        image.alt = element.name.toLowerCase()
        body.textContent = element.price + ' '+element.coin
        clotheCardsContainer.append(card)
        return {name: element.name, price: element.price, image: element.image, element: card}
    });
})

searchInput.addEventListener("input", detectInput)    