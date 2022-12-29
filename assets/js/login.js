let loginForm = document.querySelector('#logInUser');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let email = document.querySelector('#userEmail').value;
  let password = document.querySelector('#password').value;

  if (email == '' || password == '') {
    alert('Please input your email and/or password');
  } else {
    fetch('https://odd-hosiery-deer.cyclic.app/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // add if-else which will verify our users that they have logged in successfully and got their tokens. If the user cannot login successfully, they will get an alert. If the user has logged in successfully, we will save his token into the web browser and get his details using fetch. To save data into the web browser, we access the localStorage. The localStorage is used to save the data into the web browser. This storage is read only, therefore, we set our data into the localStorage through javascript by providing a key/value pair into the storage. The method setItem() allows us to save data into the localStorage. This is the syntax: localStorage.setItem("key",data)
        //To get an item from the localStorage, syntax: localStorage.getItem("key")
        if (data.accessToken) {
          localStorage.setItem('token', data.accessToken);
          //send a fetch request to decode the JWT and obtain the user ID and isAdmin property.
          //Note: GET requests do not NEED its method defined in the options
          fetch('https://odd-hosiery-deer.cyclic.app/api/users/details', {
            headers: {
              Authorization: `Bearer ${data.accessToken}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              //set user's id and isAdmin property into localStorage
              localStorage.setItem('id', data._id);
              localStorage.setItem('isAdmin', data.isAdmin);

              //window.location.replace = this allows us to redirect our user to another page
              window.location.replace('../index.html');
            });
        } else {
          alert('Login Failed. Something went wrong');
        }
      });
  }
});
