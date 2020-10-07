const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./util/database');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');// it by default goes to views folder if we dont specify this line

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// db.execute('SELECT * FROM products')
//   .then(result => {
//     console.log(result[0]);
//   })
//   .catch(err => {
//     console.log(err);
//   });//gets executed in case of any error

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

const server = app.listen(9000, () =>{
  console.log("listening on port %s-", server.address().port);
})
