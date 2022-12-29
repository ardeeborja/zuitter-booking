let navItems = document.querySelector('#navSession');
let registerLink = document.querySelector('#register');
let profileLink = document.querySelector('#profile');

let userToken = localStorage.getItem('token');

if (!userToken) {
  navItems.innerHTML = `
		<li class="nav-item ">
			<a href="./pages/login.html" class="nav-link"> Login </a>
		</li>
	`;
  registerLink.innerHTML = `
		<li class="nav-item ">
			<a href="./pages/register.html" class="nav-link"> Register </a>
		</li>

	`;
} else {
  navItems.innerHTML = `
		<li class="nav-item ">
			<a href="./pages/logout.html" class="nav-link"> Log Out </a>
		</li>
	`;
}

fetch(`https://odd-hosiery-deer.cyclic.app/api/users/details`, {
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    if (data.auth !== 'failed' && !data.isAdmin) {
      profileLink.innerHTML = `
		<li class="nav-item ">
			<a href="./pages/profile.html" class="nav-link"> Profile </a>
		</li>
	`;
    }
  });
