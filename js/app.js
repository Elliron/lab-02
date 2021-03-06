'use strict';

let toggleVariable = 'data/page-1.json';
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
// Animals.prototype.render = function () {

//   const photoTemplate = $('#photo-template').html();
//   const $animalRender = $(`<section>${photoTemplate}</section>`);
//   $animalRender.addClass(`${this.keyword}`);
//   const $h2 = $animalRender.find('h2');

//   $h2.text(this.title);

//   const $img = $animalRender.find('img');
//   $img.attr('src', this.image_url);
//   $img.attr('alt', this.title);
//   const $description = $animalRender.find('p');
//   $description.text(this.description);

//   $('main').append($animalRender);

// };

Animals.prototype.render = function () {
  // console.log('rendering');
  const photoTemplate = $('#photo-template').html();
  // const $animalRender = $(`<section>${photoTemplate}</section>`);
  // const object = this;

  const renderHtml = Mustache.render(photoTemplate, this);
  // return renderHtml;
  $('main').append(renderHtml);
  // console.log();
};

// Dog.prototype.render = function(){
//   const htmlTemplateString = $('#dog-template').html();
//   const object = this;

//   const renderedHtml = Mustache.render(htmlTemplateString, object);
//   $('ul').append(renderedHtml);
// };

{/* <template id="dog-template" type="text/x-tmpl-mustache">
<li>
  <h2>{{name}}</h2>
  <img src="{{image_url}}" alt="{{hobbies}}">
  <p>{{hobbies}}</p>
</li>
</template> */}

// ajax retrieves objects from json file and puts it in new array, calls render function
function ajaxFunction() {

  $.ajax(toggleVariable).then(stuffThatComesBack => {

    stuffThatComesBack.forEach((animal) => {
      Animals.animalsArray.push(new Animals(animal.title, animal.image_url, animal.description, animal.keyword, animal.horns));
    });
    // console.log(Animals.animalsArray);

    //New animal constructor complete, code is finished, next step is Animals.animalsArray that we made loops through and calls render function at each instance of loop
    const filterKeyword = [];

    Animals.animalsArray.forEach((animal) => {

      // populate filter
      if (!filterKeyword.includes(animal.keyword)) {
        const $option = $(`<option>${animal.keyword}</option>`);
        $option.attr('value', animal.keyword);
        $('select').append($option);
        filterKeyword.push(animal.keyword);
      }

      // console.log(filterKeyword);
      animal.render();

    });
  });
  $('.sort').on('click', (event) => {
    event.preventDefault();
    let sortingBy;
    if ($(event.target).text() === 'Sort by Title'){
      sortingBy = 'title';
    } else {
      sortingBy = 'horns';
    }
    //sort by alphabet
    Animals.animalsArray.sort((left, right) => {
      $('div').remove();
      if (left[sortingBy] < right[sortingBy]) {
        return -1;
      } else if (left[sortingBy] > right[sortingBy]) {
        return 1;
      } else {
        return 0;
      }
      // console.log(Animals.animalsArray);
    });
    Animals.animalsArray.forEach(animal => animal.render());
  });
}
ajaxFunction();
// .then(Animals.populateFilter);

Animals.populateFilter = () => {
  // console.log('populateFilter');
  const filterKeyword = [];

  // for each loop animals array - inside of it, push the keyword into the filterKeyword array
  Animals.animalsArray.forEach((animalImg) => {
    filterKeyword.push(animalImg.keyword);
  });
};

$('select').on('change', (event) => {
  // event.preventDefault();
  $('div').hide();
  let userValue = event.target.value;
  console.log(userValue);

  // documentation: Sara Russert showed us how she targeted a section by class
  $(`div[class=${userValue}]`).show();
});

$('.toggle-page').on('click', (event) => {
  event.preventDefault();
  toggleVariable = toggleVariable === 'data/page-1.json' ? 'data/page-2.json' : 'data/page-1.json';
  // if (toggleVariable === 'data/page-1.json') {
  //   toggleVariable = 'data/page-2.json';
  // } else if (toggleVariable === 'data/page-2.json') {
  //   toggleVariable = 'data/page-1.json';
  // }
  $('div').remove();
  $('option').not(':first').remove();
  Animals.animalsArray = [];
  ajaxFunction();
});


