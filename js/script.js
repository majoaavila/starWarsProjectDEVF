console.log('holi')

class Character {
    constructor(name, image) {
        //se inicializan las propiedades
        this.name = name;
        this.image = image;
    }

    getName() {
        return this.name
    }

    getImage() {
        return this.image
    }

}


async function getCharacters() {
    let url = 'https://akabab.github.io/starwars-api/api/all.json'
    let element = document.getElementById('app');
    // let characters = [];
    // const characters =  awaitfetch(url) 
    // .then(res => res.json())
    // .then(data => {
    //     console.log('respuestas server', data)
    //     characters = data
    // })
    const data = await fetch(url);
    let characters = await data.json();

    character = new Character(characters[0].name,characters[0].image)

    element.innerHTML = `
    <p>${character.getName()}</p>
    
    <p><img src=${character.getImage()} height='400' width='350' /></p>`
}

getCharacters()