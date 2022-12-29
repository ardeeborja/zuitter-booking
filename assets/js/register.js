let registerForm = document.querySelector('#registerUser');

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let firstName = document.querySelector('#firstName').value;
  let lastName = document.querySelector('#lastName').value;
  let mobileNo = document.querySelector('#mobileNumber').value;
  let email = document.querySelector('#userEmail').value;
  let password1 = document.querySelector('#password1').value;
  let password2 = document.querySelector('#password2').value;

  if (
    password1 !== '' &&
    password2 !== '' &&
    password1 === password2 &&
    mobileNo.length === 11
  ) {
    fetch('https://odd-hosiery-deer.cyclic.app/api/users/email-exists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data === false) {
          fetch('https://odd-hosiery-deer.cyclic.app/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password1,
              mobileNo: mobileNo,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);

              if (data === true) {
                alert('Registered successfully');

                //redirect to login page
                window.location.replace('./login.html');
              } else {
                //error in creating registration
                alert('Something went wrong');
              }
            });
        } else {
          alert(
            'Account already existing. Please login or register another account.'
          );
        }
      });
  }
});
