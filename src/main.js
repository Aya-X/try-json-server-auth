const app = document.querySelector('#app');
const msg = document.querySelector('#msg');

const BASE_URL = 'http://localhost:3000';

function createPost() {
  const userId = localStorage.getItem('userId');
  const AUTH = `Bearer ${localStorage.getItem('token')}`;
  axios.defaults.headers.common.Authorization = AUTH;

  const url = `${BASE_URL}/api/posts`;

  const data = {
    title: `ya! ${Date.now()}`,
    userId,
  };

  axios
    .post(url, data)
    .then(function (response) {
      console.log('post:::', response);
      console.log(JSON.stringify(response, null, 2));

      msg.innerHTML = response.statusText;
    })
    .catch(function (error) {
      console.log('error:::', error);
      console.log(JSON.stringify(error, null, 2));

      msg.innerHTML = error.response.data;
    });
  /*  end of axios */
}

function saveUserToLocal({ accessToken, user }) {
  localStorage.setItem('token', accessToken);
  localStorage.setItem('userId', user.id);
}

function login() {
  const url = `${BASE_URL}/login`;
  const data = {
    email: 'dev@admin.me',
    password: '12345678',
  };

  axios
    .post(url, data)
    .then(function (response) {
      console.log('signup:::', response);
      console.log(JSON.stringify(response, null, 2));

      saveUserToLocal(response.data);

      msg.innerHTML = response.statusText;
    })
    .catch(function (error) {
      console.log('error:::', error);
      console.log(JSON.stringify(error, null, 2));

      msg.innerHTML = error.response.data;
    });
  /*  end of axios */
}

function signup() {
  const url = `${BASE_URL}/signup`;
  const data = {
    email: 'dev@admin.me',
    password: '12345678',
  };

  axios
    .post(url, data)
    .then(function (response) {
      console.log('signup:::', response);
      console.log(JSON.stringify(response, null, 2));

      saveUserToLocal(response.data);


      msg.innerHTML = response.statusText;
    })
    .catch(function (error) {
      console.log('error:::', error);
      console.log(JSON.stringify(error, null, 2));

      msg.innerHTML = error.response.data;
    });
  /*  end of axios */
}

function postsTemplate(posts, template = '') {
  posts.forEach((post) => {
    template += `
        <div class="post">
          <h2>${post.title}</h2>
        </div>
      `;
  });

  return template;
}
/* end of postsTemplate() */

function getPosts() {
  const url = `${BASE_URL}/api/posts`;

  axios
    .get(url)
    .then(function (response) {
      console.log('posts:::', response);
      console.log(JSON.stringify(response, null, 2));

      app.innerHTML = postsTemplate(response.data);
    })
    .catch(function (error) {
      console.log('error:::', error);
      console.log(JSON.stringify(error, null, 2));

      msg.innerHTML = error.response.data;
    });
  /*  end of axios */
}

function getUsers() {
  const AUTH = `Bearer ${localStorage.getItem('token')}`;
  axios.defaults.headers.common.Authorization = AUTH;

  const url = `${BASE_URL}/api/users`;

  axios
    .get(url)
    .then(function (response) {
      console.log('users:::', response);
      console.log(JSON.stringify(response, null, 2));

      msg.innerHTML = `<pre>USERS:::${response.data.length}</pre>`;
    })
    .catch(function (error) {
      console.log('error:::', error);
      console.log(JSON.stringify(error, null, 2));

      msg.innerHTML = error.response;
    });
  /*  end of axios */
}

function init() {
  getPosts();
  getUsers();

  document
    .querySelector('#js-signup')
    .addEventListener('click', () => signup());

  document.querySelector('#js-login').addEventListener('click', () => login());

  document
    .querySelector('#js-create')
    .addEventListener('click', () => createPost());
}

init();
