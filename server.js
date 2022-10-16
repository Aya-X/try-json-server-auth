const jsonServer = require('json-server');
const auth = require('json-server-auth');

const app = jsonServer.create();
const router = jsonServer.router('data/db.json');

// /!\ Bind the router db to the app
app.db = router.db;

const rules = auth.rewriter({
  // Permission rules
  // users: 600,
  users: 640,
  posts: 664,

  // Other rules
  // '/posts/:category': '/posts?category=:category',
});

app.use(rules);

// You must apply the auth middleware before the router
app.use(auth);
// app.use(router);
app.use('/api', router)
// app.listen(3000);
app.listen(3000, () => {
  console.log('JSON Server is running');
});
