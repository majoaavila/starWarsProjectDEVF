class Character {
    constructor(name, image) {
        //initializing properties
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

let characters = [];
let element = document.getElementById('appContainer');

const searchingInput = document.getElementById('searchInput');
searchingInput.addEventListener('keyup', search);

//building the characters cards
function characterCard(name, image) {
    return `
      <div class="column">
        <div class="card">
          <h3 class="tpersonaje">${name}</h3>
          <p>
            <img src="${image}" height="300" width="250" />
          </p>
        </div>
      </div>
    `
}

async function getCharacters() {
    let url = 'https://akabab.github.io/starwars-api/api/all.json';
    const response = await fetch(url);
    const data = await response.json();

    data.forEach(datum => {
        let newCharacter = new Character(datum.name, datum.image);
        characters.push(newCharacter);
    });

    characters.forEach((character) => {
        element.innerHTML += characterCard(
            character.getName(),
            character.getImage()
        )
    });
}

function refreshData() {
    characters.length = 0;
    element.innerHTML = null;
    document.getElementById("searchInput").value = "";
    getCharacters();
}


function search() {
    setTimeout(() => {
        const request = document.getElementById('searchInput').value;
        const filteredCharacters = characters.filter(character => character.name.toLowerCase().includes(request.toLowerCase()))

        if (filteredCharacters.length > 0) {
            element.innerHTML = null
            filteredCharacters.forEach((filteredCharacter) => {
                element.innerHTML += characterCard(
                    filteredCharacter.getName(),
                    filteredCharacter.getImage()
                )
            })
        }
    }, 500);
}

function toOrderCharacters() {
    const selector = document.getElementById('sort').value 

    if(selector === 'none') {
        refreshData();
        return null;
    }

    const orderedCharacters = characters.sort((a, b) => {
        let aCharacter = a.name.toLowerCase();
        let bCharacter = b.name.toLowerCase();

        if(selector === 'ascending') {
            if(aCharacter < bCharacter) {
                return -1;
            }
        } else if (selector === 'descending') {
            if(aCharacter > bCharacter) {
                return -1;
            }
        } else {
            return 0;
        }
    });

    if(orderedCharacters.length > 0) {
        element.innerHTML = null
        orderedCharacters.forEach((orderedCharacter) => {
            element.innerHTML += characterCard(
                orderedCharacter.getName(),
                orderedCharacter.getImage()
            )
        })
    }
}

getCharacters();

// async function getCharacters() {
//     let url = 'https://akabab.github.io/starwars-api/api/all.json'
//     let element = document.getElementById('app');
//     // let characters = [];
//     // const characters =  awaitfetch(url) 
//     // .then(res => res.json())
//     // .then(data => {
//     //     console.log('respuestas server', data)
//     //     characters = data
//     // })
//     const data = await fetch(url);
//     let characters = await data.json();

//     character = new Character(characters[0].name,characters[0].image)

//     element.innerHTML = `
//     <p>${character.getName()}</p>
    
//     <p><img src=${character.getImage()} height='400' width='350' /></p>`
// }

// getCharacters()