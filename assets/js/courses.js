let token = localStorage.getItem('token');

let adminUser = localStorage.getItem('isAdmin') === 'true';

let addButton = document.querySelector('#adminButton');

let cardFooter;

//will allow us to show a button for adding a course/a button to redirect us to the addCourse page if the user is admin, however, if he is a guest/regular user, they should not see a button
if (adminUser === false || adminUser === null) {
  addButton.innerHTML = null;
} else {
  addButton.innerHTML = `
		<div class="col-md-2 offset-md-10">
			<a href="./addCourse.html" class="btn btn-block btn-primary add-course-button">Add Course</a>
		</div>	
	`;
}

//check if admin, if admin, show all courses and button should be archive course and activate course
if (adminUser !== false && adminUser !== null) {
  fetch('https://odd-hosiery-deer.cyclic.app/api/courses/all')
    .then((res) => res.json())
    .then((data) => {
      console.log('admin', data);

      let courseData;

      if (data.length < 1) {
        courseData = 'No courses available';
      } else {
        courseData = data
          .map((course) => {
            if (course.isActive === true) {
              cardFooter = `
		 				<a href="./editCourse.html?courseId=${course._id}" value={course._id} class="btn btn-primary text-white btn-block edit-button">
		 					Edit
		 				</a>
						<a href="./course.html?courseId=${course._id}" value={course._id} class="btn text-white btn-block go-to-button">
							Go To Course
		 				</a>		 				
		 				<a href="./deleteCourse.html?courseId=${course._id}" value={course._id} class="btn btn-danger text-white btn-block delete-button">
		 					Archive Course
		 				</a>
		 			`;
            } else {
              console.log('else');
              cardFooter = `
		 				<a href="./editCourse.html?courseId=${course._id}" value={course._id} class="btn btn-primary text-white btn-block edit-button">
		 					Edit
		 				</a>
						<a href="./course.html?courseId=${course._id}" value={course._id} class="btn text-white btn-block go-to-button">
							Go To Course
		 				</a>		 				
		 				<a href="./activateCourse.html?courseId=${course._id}" value={course._id} class="btn btn-warning text-white btn-block activate-button">
		 					Activate Course
		 				</a>
		 			`;
            }
            return `
						<div class="col-md-6 my-3">
							<div class="card course-select">
								<div class="card-body card-body-element ">
									<h5 class="card-title">${course.name}</h5>
									<p class="card-text text-left">
										${course.description}
									</p>
									<p class="card-text text-right">
										₱ ${course.price}
									</p>
								</div>
								<div class="card-footer">
									${cardFooter}
								</div>
							</div>
						</div>
					`;
          })
          .join('');
      }
      let container = document.querySelector('#coursesContainer');
      container.innerHTML = courseData;
    });
} else {
  fetch('https://odd-hosiery-deer.cyclic.app/api/courses')
    .then((res) => res.json())
    .then((data) => {
      //a variable that will store the data to be rendered
      let courseData;
      if (data.length < 1) {
        courseData = 'No courses available';
      } else {
        courseData = data
          .map((course) => {
            if (adminUser == false || !adminUser) {
              cardFooter = `
		 				<a href="./course.html?courseId=${course._id}" value={course._id} class="btn text-white btn-block edit-button">
		 					Select Course
		 				</a>
		 			`;
            } else {
              cardFooter = `
		 				<a href="./editCourse.html?courseId=${course._id}" value={course._id} class="btn btn-primary text-white btn-block edit-button">
		 					Edit
		 				</a>
						<a href="./course.html?courseId=${course._id}" value={course._id} class="btn text-white btn-block go-to-button">
							Go To Course
		 				</a>		 				
		 				<a href="./deleteCourse.html?courseId=${course._id}" value={course._id} class="btn btn-danger text-white btn-block delete-button">
		 					Delete
		 				</a>
		 			`;
            }

            return `
						<div class="col-md-6 my-3">
							<div class="card course-select">
								<div class="card-body card-body-element">
									<h3 class="card-title">${course.name}</h3>
									<p class="card-text text-left">
										${course.description}
									</p>
									<p class="card-text text-right">
										₱ ${course.price}
									</p>
								</div>
								<div class="card-footer">
									${cardFooter}
								</div>
							</div>
						</div>
					`;
            //since the collection is an array, we can use the join method to indicate the separator for each element
          })
          .join('');
      }

      let container = document.querySelector('#coursesContainer');
      container.innerHTML = courseData;
    });
}
