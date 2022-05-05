// write your code here
let currentRamen = null;

function ramenInfo(ramen) {
    const ramenDiv = document.querySelector('#ramen-detail');
    const ramenImg = ramenDiv.querySelector('img');
    const ramenName = ramenDiv.querySelector('h2');
    const ramenRestaurant = ramenDiv.querySelector('h3');
    const ramenRating = document.querySelector('#rating-display');
    const ramenComment = document.querySelector('#comment-display');
    
    ramenImg.src = ramen.image;
    ramenName.textContent = ramen.name;
    ramenRestaurant.textContent = ramen.restaurant;
    ramenRating.textContent = ramen.rating;
    ramenComment.textContent = ramen.comment;

    currentRamen = ramen;
    console.log(currentRamen);
}

function clearRamenInfo() {
    const ramenDiv = document.querySelector('#ramen-detail');
            const ramenImg = ramenDiv.querySelector('img');
            const ramenName = ramenDiv.querySelector('h2');
            const ramenRestaurant = ramenDiv.querySelector('h3');
            const ramenRating = document.querySelector('#rating-display');
            const ramenComment = document.querySelector('#comment-display');
            
            ramenImg.src = "";
            ramenName.textContent = "";
            ramenRestaurant.textContent = "";
            ramenRating.textContent = "";
            ramenComment.textContent = "";
}

function showRamenImage(ramen) {
    const img = document.createElement("img");
    const btn = document.createElement("btn");

    img.src = ramen.image;
    btn.textContent = " X ";
    btn.className = "button";

    img.addEventListener('click', () => {
        ramenInfo(ramen);
    });

    btn.addEventListener('click', () => {
        btn.remove();
        img.remove();
        if (currentRamen === ramen) {
            clearRamenInfo();
        }
    });

    document.querySelector("#ramen-menu").append(img, btn);
}

function newRamenForm(e) {
    e.preventDefault();
    const ramen = {
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        comment: e.target["new-comment"].value
    }
    ramenInfo(ramen);
    showRamenImage(ramen);
    e.target.reset();
}

function updateRamenForm(e) {
    e.preventDefault();
   
    const ramenRating = document.querySelector('#rating-display');
    const ramenComment = document.querySelector('#comment-display');

    ramenRating.textContent = e.target.rating.value;
    ramenComment.textContent = e.target["new-comment"].value;

    e.target.reset();
}

document.addEventListener("DOMContentLoaded", () => {
    fetch(`http://localhost:3000/ramens`)
    .then(resp => resp.json())
    .then(ramens => {
        ramenInfo(ramens[0]); 
        ramens.forEach((ramen) => (showRamenImage(ramen)));
    });
    document.querySelector('#new-ramen').addEventListener('submit', newRamenForm);
    document.querySelector('#edit-ramen').addEventListener('submit', updateRamenForm);
});


// updating form using if statement:
// new object in updateRamenForm function:
// const updatedRamen = {
//     rating: e.target.rating.value,
//     comment: e.target["new-comment"].value
// }

// if statement within ramenInfo function:
// if (ramen.image !== undefined) {
//     ramenImg.src = ramen.image;
// }
// if (ramen.name !== undefined) {
//     ramenName.textContent = ramen.name;
// }
// if (ramen.restaurant !== undefined) {
//     ramenRestaurant.textContent = ramen.restaurant;
// }
// if (ramen.rating !== undefined) {
//     ramenRating.textContent = ramen.rating;
// }
// if (ramen.comment !== undefined) {
//     ramenComment.textContent = ramen.comment;
// }