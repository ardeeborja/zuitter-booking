let name = document.querySelector('#user-name');
let mobile = document.querySelector('#mobile');
let email = document.querySelector('#email');
let userCourses = document.querySelector('.enroll-container');
let editButton = document.querySelector('#edit-button');
let coursesEnrolled = document.querySelector('.courses-enrolled');
let borderTopList = document.querySelector('#border-top-list');
let token = localStorage.getItem('token');
let courseArray = [];

fetch(`https://odd-hosiery-deer.cyclic.app/api/users/details`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    if (data.auth != 'failed') {
      let user = data;
      name.innerHTML = ` ${user.firstName}  ${user.lastName}`;
      mobile.innerHTML = `Mobile Number: ${user.mobileNo}`;
      email.innerHTML = `Email: ${user.email}`;

      editButton.innerHTML = `<a href="./editProfile.html?userId=${user._id}" value={user._id} class="edit-profile my-3">Edit Profile &#8594</a>`;

      if (data.enrollments.length === 0) {
        coursesEnrolled.innerHTML = 'No Courses Enrolled';
      }

      data.enrollments.forEach((course) => {
        console.log('rd', course);
      });

      data.enrollments.forEach((course) => {
        let courseId = course.courseId;

        fetch(`https://odd-hosiery-deer.cyclic.app/api/courses/${courseId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log('ardee', data);

            if (data) {
              borderTopList.classList.add('border-top-list');

              userCourses.innerHTML += ` 
			
							<div class="my-4">
								<div class="card-enrolled-course">
                  <span class=''>${data.name}</span> 
                  <span class='mb-4'>Enrolled On: ${new Date(
                    course.enrolledOn
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
    } else {
      alert('Please login first');
      window.location.replace('./login.html');
    }
  });
