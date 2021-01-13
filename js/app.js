'use strict';

// Feature #2: Filter images
// Why are we implementing this feature?
// As a user, I want to be able to filter the images so that I can view only images that match a keyword.
// What are we going to implement?
// Given that a user clicks on the dropdown menu When the user selects one of the options Then only the images whose keyword matches the option should be displayed

// How are we implementing it?
// Create a <select> element which contains unique <option> elements extracted dynamically from the JSON file, one for each keyword.
// Use an event handler to respond when the user chooses an option from the select menu. Hide all of the images, then show those whose keyword matches the option chosen.

// Animals constructor function
function Animals(name, url, description, keyword, horns) {
  this.title = name;
  this.image_url = url;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

// Renders to page
Animals.prototype.render = function () {
// console.log(this);
  const tempVar = $('#photo-template').html();
  const $animalRender = $(`<section>${tempVar}</section>`);
  const $h2 = $animalRender.find('h2');
  $h2.text(this.title);

  const $img = $animalRender.find('img');
  $img.attr('src', this.image_url);
  // console.log('src', this.image_url);
  $img.attr('alt', this.title);
  const $description = $animalRender.find('p');
  $description.text(this.description);

  $('main').append($animalRender);

};

// Dog.prototype.render = function(){
//   const $dogClone2 = $('li:first-child').clone(); // only get the first li
//   // Goal: target the h2 of the cloned li
//   // getter method .find();
//   // `.find()` === `$()` except it only looks inside the object we call it on
//   const $h2 = $dogClone2.find('h2');
//   $h2.text(this.name);

//   const $img = $dogClone2.find('img');
//   $img.attr('src', this.image_url);
//   $img.attr('alt', this.hobbies);

//   $dogClone2.find('p').text(this.hobbies);

//   $('ul').append($dogClone2);
// };

/* <main>
<template id="photo-template">
  <h2></h2>
  <img src="" alt="">
  <p></p>
</template>
</main> */

// ajax retrieves objecrts from json file and puts it in new array, calls render function
$.ajax('/data/page-1.json').then(stuffThatComesBack => {
  // console.log(stuffThatComesBack);
  const animalsArray = [];
  stuffThatComesBack.forEach((animal) => {
    animalsArray.push(new Animals(animal.title, animal.image_url, animal.description, animal.keyword, animal.horns));
    // console.log(animalsArray[]);
  });
  // console.log(animalsArray);
  //New animal constructor complete, code is finished, next step is animalsArray that we made loops through and calls render function at each instance of loop
  animalsArray.forEach((animalImg) => {
    if 
    animalImg.render();
  });
});

