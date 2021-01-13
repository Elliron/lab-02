'use strict';


// Feature #2: Filter images
// Why are we implementing this feature?
// As a user, I want to be able to filter the images so that I can view only images that match a keyword.
// What are we going to implement?
// Given that a user clicks on the dropdown menu When the user selects one of the options Then only the images whose keyword matches the option should be displayed

// How are we implementing it?
// Create a <select> element which contains unique <option> elements extracted dynamically from the JSON file, one for each keyword.
// Use an event handler to respond when the user chooses an option from the select menu. Hide all of the images, then show those whose keyword matches the option chosen.

Animals.animalsArray = [];

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
  
  // const $dropList = $('option:first-child').clone();
  // $dropList.
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

// ajax retrieves objects from json file and puts it in new array, calls render function
$.ajax('/data/page-1.json').then(stuffThatComesBack => {
  // console.log(stuffThatComesBack);
  stuffThatComesBack.forEach((animal) => {
    Animals.animalsArray.push(new Animals(animal.title, animal.image_url, animal.description, animal.keyword, animal.horns));
  });
  console.log(Animals.animalsArray);
  //New animal constructor complete, code is finished, next step is Animals.animalsArray that we made loops through and calls render function at each instance of loop
  Animals.animalsArray.forEach((animalImg) => {
    console.log('animal image', animalImg.title);
    // const dropList = $('select').html();
    // const $listRender = $(`<select>${dropList}</select>`);
    // const $option = $listRender.find('option');
    // $option.attr('value', Animals.animalsArray[animalImg].keyword);
    animalImg.render();
  });


})
// .then(Animals.populateFilter);

Animals.populateFilter = () => {
  const filterKeyword = [];
  console.log('populateFilter');
  // for each loop animals array - inside of it, push the keyword into the filterKeyword array
  Animals.animalsArray.forEach((animalImg) => {
    filterKeyword.push(animalImg.keyword);
  });

  filterKeyword.forEach((keyword) => {
    const dropList = $('option').clone()[0];
    const $listRender = $(`<select>${dropList}</select>`);
    const $option = $listRender.find('option');
    $option.attr('value', this.keyword);
  });
  // for (let i = 0; i < Animals.animalsArray.length; i++) {
  //   const dropList = $('option').clone()[0];
  //   const $listRender = $(`<select>${dropList}</select>`);
  //   const $option = $listRender.find('option');
  //   $option.attr('value', Animals.animalsArray.keyword);
  // }

  // for each over the filterKeyword array; for each of those keywords, create an <option> tag and dynamically add the value using a template literal
};

  // // Clicking and 'filtering'
  // $('button').on('click', () => { // In today's lab you need to filter only the images with the specific keyword
  //   //goal is to only show The Clifford li

  //   // get rid of the other ones
  //   // iterate and check if the name is clifford
  //   // if the name is clifford : render

  //   // OR

  //   // target all the list items and hide them
  //   // target the one with an h2 with text of 'clifford' and show it
  //   $('li').hide();
  //   $('li:contains(Clifford)').show();

  // });

  // $('select').on('click', () => {

// });
