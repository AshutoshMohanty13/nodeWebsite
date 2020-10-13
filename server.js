// const path = require('path');
// const express = require('express');
// const bodyParser = require('body-parser');
// const sequelize = require('./util/database');

// const app = express();
// app.set('view engine', 'ejs');
// app.set('views', 'views');// it by default goes to views folder if we dont specify this line

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
// const Product = require('./models/product');
// const User = require('./models/user');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

// // db.execute('SELECT * FROM products')
// //   .then(result => {
// //     console.log(result[0]);
// //   })
// //   .catch(err => {
// //     console.log(err);
// //   });//gets executed in case of any error

// app.use((req, res, next) => {
//   res.status(404).render('404', { pageTitle: 'Page Not Found' });
// });

// //establishing connections or relations
// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
// User.hasMany(Product);


// //it syncs you model to the database by creating the tables if its not already there, and if its already
// //present then it doesnt overwrite it.
// sequelize.sync()
//   .then(result => {
//     //console.log(result);
//     return User.findAll({where: { id: 1}});
//   })
//   .then(user => {
//     if(!user){
//       return User.create({ name: 'Ashutosh', email: 'test@test.com'});
//     }
//     return user;
//   })
//   .then(user => {
//     console.log('@@@@@@',user);
//     //only if the database is synced then only the server starts.
//     const server = app.listen(9000, () =>{
//       console.log("listening on port %s-", server.address().port);
//     });
//   })
//   .catch(err => {
//     console.log(err);
//   });

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Ashutosh', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {
    //console.log(user);
    const server = app.listen(9000, () =>{
          console.log("listening on port %s-", server.address().port);
        });
    
  })
  .catch(err => {
    console.log(err);
  });
