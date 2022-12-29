//URL Query parameters
// ? - start of query string
// courseId = (parameter name)
// 6020ed1a15feb4410491446c = value

//window.location.search returns the query string in the URL
// console.log(window.location.search)

// instantiate or create a new URLSearchParams object.
// This object, URLSearchParams, is used an interface to gain access to methods that allow us to specific parts of the query string
let params = new URLSearchParams(window.location.search);

//the has method has URLSeachParams checks if the courseId key exists in our URL Query string
// console.log(params.has('courseId')) //true, if has key

//the get method for URLSearchParams returns the value of the key passed in as an argument.
// console.log(params.get('courseId'))

//store the courseID from the URL Query String in a variable
let courseId = params.get('courseId');

//get the token from localStorage
let token = localStorage.getItem('token');

let adminUser = localStorage.getItem('isAdmin') === 'true';

let cardEnroll = document.querySelector('#card-enroll');
let courseName = document.querySelector('#course-name');
let courseDesc = document.querySelector('#course-desc');
let coursePrice = document.querySelector('#course-price');
let enrollContainer = document.querySelector('#enroll-course-btn');
let enrollees = document.querySelector('#enrollees');
let borderTopList = document.querySelector('#border-top-list');

//for admin user, display the list of names of enrollees
if (adminUser === true) {
  fetch(`https://odd-hosiery-deer.cyclic.app/api/courses/${courseId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      courseName.innerHTML = data.name;
      courseDesc.innerHTML = data.description;
      coursePrice.innerHTML = `Price: ₱ ${data.price}`;
      cardEnroll.classList.add('card-enroll-admin');

      if (data.enrollees.length === 0) {
        enrollees.innerHTML = `<h3 class="card-title">No Enrollees Available</h3>`;
      } else {
        data.enrollees.forEach((enrollee) => {
          let d = new Date(enrollee.enrolledOn);
          console.log(d.toLocaleString());
          console.log(d.toString());

          let userId = enrollee.userId;

          fetch(
            `https://odd-hosiery-deer.cyclic.app/api/users/details/${userId}`
          )
            .then((res) => res.json())
            .then((data) => {
              let enrolleeName = `${data.firstName} ${data.lastName}`;

              if (data) {
                borderTopList.classList.add('border-top-list');
                enrollees.innerHTML += ` 
								<div class="my-4">                
									<div class="text-left enrollees-list">
                      <span>${enrolleeName}</span>
                      <span class='mb-4'>Enrolled On: ${new Date(
                        enrollee.enrolledOn
                      ).toLocaleDateString('en-AU')}
                      </span>
									</div>
								</div>
							`;
              } else {
                alert('Something went wrong');
              }
            });
        });
      }
    });
} else {
  console.log('QQQQ');
  fetch(`https://odd-hosiery-deer.cyclic.app/api/courses/${courseId}`)
    .then((res) => res.json())
    .then((data) => {
      console.log('data', data);
      courseName.innerHTML = data.name;
      courseDesc.innerHTML = data.description;
      coursePrice.innerHTML = `Price: ₱ ${data.price}`;
      enrollContainer.innerHTML = `<button id="enroll-button" class="btn btn-block enroll-button text-white my-5">Enroll</button>`;
      cardEnroll.classList.add('card-enroll');
      // marginTopEnrollees.classList.remove('border-top-list');
      borderTopList.classList.remove('border-top-list');

      document.querySelector('#enroll-button').addEventListener('click', () => {
        if (token) {
          fetch('https://odd-hosiery-deer.cyclic.app/api/users/enroll', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              courseId: courseId,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data) {
                alert('Thank you for enrolling to the course!');
                window.location.replace('./courses.html');
              } else {
                alert(
                  'You were already enrolled in this course previously. Please choose another one.'
                );
                window.location.replace('./courses.html');
              }
            });
        } else {
          window.location.replace('./register.html');
        }
      });
    });
}
