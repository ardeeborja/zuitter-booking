// window.location.search returns the query string part of the URL
// console.log(window.location.search);

// instantiate a URLSearchParams object so we can execute methods to access
// specific parts of the query string
let params = new URLSearchParams(window.location.search);

// get method returns the value of the key passed in as an argument
let userId = params.get('userId');
console.log(userId);

let firstName = document.querySelector('#firstName');
let lastName = document.querySelector('#lastName');
let mobileNumber = document.querySelector('#mobileNumber');
let email = document.querySelector('#email');

fetch(`https://odd-hosiery-deer.cyclic.app/api/users/details/${userId}`)
  .then((res) => res.json())
  .then((data) => {
    console.log('first', data);
    firstName.placeholder = data.firstName;
    lastName.placeholder = data.lastName;
    mobileNumber.placeholder = data.mobileNo;
    email.placeholder = data.email;
    firstName.value = data.firstName;
    lastName.value = data.lastName;
    mobileNumber.value = data.mobileNo;
    email.value = data.email;
  });

document.querySelector('#editProfile').addEventListener('submit', (e) => {
  e.preventDefault();

  console.log(email.placeholder);
  console.log(email.value);
  console.log(firstName);
  console.log(firstName.value);

  let fName = firstName.value;
  let lName = lastName.value;
  let mobile = mobileNumber.value;
  let emailAdd = email.value;

  let token = localStorage.getItem('token');
  console.log(token);
  console.log(userId);
  console.log(fName);

  let allValid = true;

  // check if whitespace start
  fName = fName.replace(/^\s+/, '').replace(/\s+$/, '');
  if (fName === '') {
    // text was all whitespace
    alert('First Name is required');
    allValid = false;
  }

  lName = lName.replace(/^\s+/, '').replace(/\s+$/, '');
  if (lName === '') {
    // text was all whitespace
    alert('Last Name is required');
    allValid = false;
  }

  let allZeros = /^0+$/;
  if (mobile.match(allZeros) || mobile < 0) {
    // text was all whitespace
    alert('Valid mobile is required');
    allValid = false;
  }

  if (mobile.length < 11 || mobile.length > 11) {
    // text was all whitespace
    alert('Mobile no length should be 11 characters');
    allValid = false;
  }

  //check if email is existing start
  if (allValid === true) {
    if (email.placeholder !== email.value) {
      fetch('https://odd-hosiery-deer.cyclic.app/api/users/email-exists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailAdd,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (data === false) {
            console.log('not existing');

            //update collection start
            fetch('https://odd-hosiery-deer.cyclic.app/api/users/${userId}', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                id: userId,
                firstName: fName,
                lastName: lName,
                email: emailAdd,
                mobileNo: mobile,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                //edit profile successful
                if (data === true) {
                  //redirect to courses index page
                  window.location.replace('./profile.html');
                } else {
                  //error in updating profile, redirect to error page
                  alert('Something went wrong');
                }
              });
          } else {
            alert('Account already existing. Please input another account.');
          }
        });
    } else {
      fetch('https://odd-hosiery-deer.cyclic.app/api/users/${userId}', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: userId,
          firstName: fName,
          lastName: lName,
          email: emailAdd,
          mobileNo: mobile,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          //update successful
          if (data === true) {
            //redirect to profile page
            window.location.replace('./profile.html');
          } else {
            //error in creating course, redirect to error page
            alert('Something went wrong');
          }
        });
    }
  }
});
