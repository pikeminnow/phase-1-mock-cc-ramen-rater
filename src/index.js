// write your code here
//sample object:
// {
//     "id": 1,
//     "name": "Shoyu Ramen",
//     "restaurant": "Nonono",
//     "image": "./assets/ramen/shoyu.jpg",
//     "rating": 7,
//     "comment": "Delish. Can't go wrong with a classic!"
//   },

// - See all ramen images in the `div` with the id of `ramen-menu`. 
//When the page loads, request the data from the server to get all the ramen objects.

document.addEventListener('DOMContentLoaded', main);

function main() {

    //variables deck of elements from the page
    const ramenMenuDiv = document.getElementById('ramen-menu');
    const ramenDetailDiv = document.getElementById('ramen-detail');
    const detailImageClass = document.getElementsByClassName('detail-image')[0];
    const detailNameClass = document.getElementsByClassName('name')[0];
    const detailRestaurantClass = document.getElementsByClassName('restaurant')[0];
    const detailRating = document.getElementById('rating-display');
    const detailComment = document.getElementById('comment-display');
    const newRamenForm = document.getElementById('new-ramen');


    // Then, display the image for each of the ramen using an `img` tag inside the `#ramen-menu` div.

    const data1 = fetch('http://localhost:3000/ramens')
        .then(ramenJson)
        .then(function (data) {
            console.log(data[1]);
            data.forEach(displayImageForRamen);
            // displayImageForRamen(data[1]);
        });


    function displayImageForRamen(ramenObject) {
        let ramenImageElement = document.createElement('img');
        ramenImageElement.src = ramenObject.image;
        ramenImageElement.metaID = ramenObject.id;
        ramenMenuDiv.append(ramenImageElement);
        ramenImageElement.addEventListener('click', displayRamenInfo);
    }

    // - Click on an image from the `#ramen-menu` div and see all the info about that
    //   ramen displayed inside the `#ramen-detail` div and where it says
    //   `insert comment here` and `insert rating here`.

    function displayRamenInfo(ramenEvent) {
        console.log(ramenEvent);
        const data2 = fetch(`http://localhost:3000/ramens/${ramenEvent.currentTarget.metaID}`)
            .then(ramenJson)
            .then((ramenObject) => {
                detailImageClass.src = ramenObject.image;
                detailNameClass.innerText = ramenObject.name;
                detailRestaurantClass.innerText = ramenObject.restaurant;
                detailRating.innerText = ramenObject.rating;
                detailComment.innerText = ramenObject.comment;
            });
    }


    // - Create a new ramen after submitting the `new-ramen` form. The new ramen should
    //   be added to the`#ramen-menu` div. The new ramen does not need to persist; in
    //   other words, if you refresh the page, it's okay that the new ramen is no
    //   longer on the page.

    //sample response meta
    // target: form#new-ramen
    // 0: input#new-name
    // 1: input#new-restaurant
    // 2: input#new-image
    // 3: input#new-rating
    // 4: textarea#new-comment


    newRamenForm.addEventListener('submit', addNewRamen);

    function addNewRamen(ramenSubmit) {
        ramenSubmit.preventDefault();
        console.log(ramenSubmit);
        displayImageForNewRamen(ramenSubmit.target);
        displayNewRamenInfo(ramenSubmit.target);


    }
    function displayImageForNewRamen(ramenArray) {
        let ramenImageElement = document.createElement('img');
        ramenImageElement.src = ramenArray[2].value;
        // ramenImageElement.metaID = ramenObject.id;
        ramenMenuDiv.append(ramenImageElement);
        ramenImageElement.addEventListener('click', displayRamenInfo);
    }
    function displayNewRamenInfo(ramenArray){
        detailNameClass.innerText = ramenArray[0].value;
        detailRestaurantClass.innerText = ramenArray[1].value;
        detailImageClass.src = ramenArray[2].value;
        detailRating.innerText = ramenArray[3].value;
        detailComment.innerText = ramenArray[4].value;
    }


    //hoist zone
    function ramenJson(response) {
        let ramenDataJson = response.json();
        console.log(ramenDataJson);
        return ramenDataJson;
    }

}