// window.location.search returns the query string part of the URL
// console.log(window.location.search)

// instantiate a URLSearchParams object so we can execute methods to access
// specific parts of the query string
let params = new URLSearchParams(window.location.search);

// spread the values to sey the key-value pairs of the object URLSearchParams
// console.log(...courseId);

// the has method checks if the courseId key exists in the URL query string
// true means that the key exists
// console.log(params.has('courseId'))

// get method returns the value of the key passed in as an argument
// console.log(params.get('courseId'))

let courseId = params.get('courseId');

let token = localStorage.getItem('token');

fetch(`https://odd-hosiery-deer.cyclic.app/api/courses/${courseId}`, {
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    //creation of new course successful
    if (data === true) {
      //redirect to courses index page
      window.location.replace('./courses.html');
    } else {
      //error in creating course, redirect to error page
      alert('something went wrong');
    }
  });
