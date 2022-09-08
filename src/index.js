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


    // Then, display the image for each of the ramen using an `img` tag inside the `#ramen-menu` div.

    const data1 = fetch('http://localhost:3000/ramens')
        .then(function (response) {
            let data1json = response.json();
            console.log(data1json);
            return data1json;
        })
        .then(function (data) {
            console.log(data[1]);
            displayImageForRamen(data[1]);
        }
        );






    // - Click on an image from the `#ramen-menu` div and see all the info about that
    //   ramen displayed inside the `#ramen-detail` div and where it says
    //   `insert comment here` and `insert rating here`.



    // - Create a new ramen after submitting the `new-ramen` form. The new ramen should
    //   be added to the`#ramen-menu` div. The new ramen does not need to persist; in
    //   other words, if you refresh the page, it's okay that the new ramen is no
    //   longer on the page.




    function displayImageForRamen(ramenObject) {
        let ramenImageElement = document.createElement('img');
        ramenImageElement.src = ramenObject.image;
        ramenMenuDiv.append(ramenImageElement);
    }

}