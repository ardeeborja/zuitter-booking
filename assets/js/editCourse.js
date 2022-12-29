// window.location.search returns the query string part of the URL
console.log(window.location.search);

// instantiate a URLSearchParams object so we can execute methods to access
// specific parts of the query string
let params = new URLSearchParams(window.location.search);

// spread the values to sey the key-value pairs of the object URLSearchParams
// console.log(...courseId);

// the has method checks if the courseId key exists in the URL query string
// true means that the key exists
// console.log(params.has('courseId'));

// get method returns the value of the key passed in as an argument
// console.log(params.get('courseId'))

let courseId = params.get('courseId');

let name = document.querySelector('#courseName');
let price = document.querySelector('#coursePrice');
let description = document.querySelector('#courseDescription');

fetch(`https://odd-hosiery-deer.cyclic.app/api/courses/${courseId}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    // assign the current values as placeholders
    name.placeholder = data.name;
    price.placeholder = data.price;
    description.placeholder = data.description;
    name.value = data.name;
    price.value = data.price;
    description.value = data.description;
  });

document.querySelector('#editCourse').addEventListener('submit', (e) => {
  e.preventDefault();

  let courseName = name.value;
  let desc = description.value;
  let priceValue = price.value;

  let allValid = true;

  courseName = courseName.replace(/^\s+/, '').replace(/\s+$/, '');
  if (courseName === '') {
    // text was all whitespace
    alert('Course Name is required');
    allValid = false;
  }

  desc = desc.replace(/^\s+/, '').replace(/\s+$/, '');
  if (desc === '') {
    // text was all whitespace
    alert('Course Description is required');
    allValid = false;
  }

  let allZeros = /^0+$/;
  if (
    priceValue.match(allZeros) ||
    priceValue < 0 ||
    parseFloat(priceValue) == 0
  ) {
    // text was all whitespace
    alert('Valid amount is required');
    allValid = false;
  }

  if (allValid === true) {
    let token = localStorage.getItem('token');

    fetch('https://odd-hosiery-deer.cyclic.app/api/courses', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: courseId,
        name: courseName,
        description: desc,
        price: priceValue,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        //creation of new course successful
        if (data === true) {
          //redirect to courses index page
          window.location.replace('./courses.html');
        } else {
          //error in creating course, redirect to error page
          alert('something went wrong');
        }
      });
  }
});
