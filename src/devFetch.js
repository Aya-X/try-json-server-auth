const app = document.querySelector('#app');
const AUTH = `Bearer ${localStorage.getItem('token')}`;

function getPosts(template = '') {
  fetch('http://localhost:3000/posts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((posts) => {
      console.log('posts:::', posts);
      console.log(JSON.stringify(posts, null, 2));

      posts.forEach((post) => {
        template += `
            <div class="post">
              <h2>${post.title}</h2>          
            </div>
          `;
      });

      app.innerHTML = template;
    });
}

function init() {
  getPosts();
}

document.querySelector('#js-create').addEventListener('click', () => {
  console.log('create!');

  fetch('http://localhost:3000/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'Good!',
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: AUTH,
    },
  })
    .then((response) => response.json())
    .then((post) => {
      console.log('post:::', post);
      console.log(JSON.stringify(post, null, 2));
    });
});

document.querySelector('#js-signup').addEventListener('click', () => {
  console.log('signup!');

  fetch('http://localhost:3000/signup', {
    method: 'POST',
    body: JSON.stringify({
      email: 'dev@admin.me',
      password: '12345678',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((user) => {
      console.log('user:::', user);
      console.log(JSON.stringify(user, null, 2));
    });
});

document.querySelector('#js-login').addEventListener('click', () => {
  console.log('login!');

  fetch('http://localhost:3000/login', {
    method: 'POST',
    body: JSON.stringify({
      email: 'dev@admin.me',
      password: '12345678',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((user) => {
      console.log('user:::', user);
      console.log(JSON.stringify(user, null, 2));

      app.innerHTML = JSON.stringify(user, null, 2);

      localStorage.setItem('token', user.accessToken);
    });
});

init();
