let formSubmit = document.querySelector('#createCourse');

//add event listener
formSubmit.addEventListener('submit', (e) => {
  e.preventDefault();

  let courseName = document.querySelector('#courseName').value;
  let description = document.querySelector('#courseDescription').value;
  let price = document.querySelector('#coursePrice').value;

  let allValid = true;

  courseName = courseName.replace(/^\s+/, '').replace(/\s+$/, '');
  if (courseName === '') {
    // text was all whitespace
    alert('Course Name is required');
    allValid = false;
  }

  description = description.replace(/^\s+/, '').replace(/\s+$/, '');
  if (description === '') {
    // text was all whitespace
    alert('Course Description is required');
    allValid = false;
  }

  let allZeros = /^0+$/;
  if (price.match(allZeros) || price < 0 || parseFloat(price) == 0) {
    // text was all whitespace
    alert('Valid amount is required');
    allValid = false;
  }

  if (allValid === true) {
    //get the JWT from our localStorage
    let token = localStorage.getItem('token');
    console.log(token);

    //create a request to add a new course
    fetch('https://odd-hosiery-deer.cyclic.app/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: courseName,
        description: description,
        price: price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //if the creation of the course is successful, redirect admin to the courses page
        if (data === true) {
          //redirect admin to courses page
          window.location.replace('./courses.html');
        } else {
          // error while creating a course
          alert('Course Creation Failed. Something Went Wrong.');
        }
      });
  }
});
