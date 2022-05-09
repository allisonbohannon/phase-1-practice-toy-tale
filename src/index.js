let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  renderToys(); 
  renderNewToy(); 
  
});
//getch toy data
function renderToys() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => data.forEach(toy => renderToyCard(toy)))
}

function renderToyCard(toy) {
 //Render card
  const card = document.createElement('div'); 
    card.className = 'card';
    card.id = toy.id 

    card.innerHTML = `
      <h2>${toy.name}</h2>
      <img class = 'toy-avatar' src = '${toy.image}'/>
      <p>${toy.likes} likes    </p>
      <button class = ${toy.id}> Like ❤️ </button>
      `
    card.querySelector('button').addEventListener('click', (e) => {
      toy.likes ++
      console.log(toy.likes)
      card.querySelector('p').textContent = `${toy.likes} likes    `
      const likedToyId = e.target.className
      updateLikes(toy); 
    } )

    //Append all cards to the DOM
    document.getElementById('toy-collection').appendChild(card); 
  
  }

  //Create new Toy cards
  function renderNewToy() {
    //add eventListener wiht new toy object from input data
    document.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault(); 

      const newToy = {
        name: e.target.name.value, 
        image: e.target.image.value,
        likes: 0,
        };
    
       //Post request; then render the DOM using the initial renderToyCards function 
      fetch('http://localhost:3000/toys', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(newToy),
      })
      .then(response => response.json())
      .then(renderToyCard(newToy))
    })
  }

  function updateLikes(toy) {
    //Create new number of likes
    const newNumberOfLikes = toy.likes + 1
    
    //Patch request for updatedObj
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH', 
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": newNumberOfLikes
      })
    })
    .then(response => response.json())
    .then(data => console.log(data))

    //update DOM
  }



