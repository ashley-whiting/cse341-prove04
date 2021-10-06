const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const { Console } = require('console');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('615e15e1281b388598282aa3')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));

});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://ashleyw:Citihealth89@cluster0.nrjfq.mongodb.net/shop?retryWrites=true&w=majority')
.then(result => {
  User.findOne()
  .then(user => {
    if (!user){
    const user = new User(
      {
        name: 'Ashley',
        email: 'ashley@books.org',
        cart: {
          items: []
        }
      });
    user.save();
  }
});  
  app.listen(3000);
})

.catch(err => {
  console.log(err);
});
// mongoConnect(() => {
//   app.listen(PORT, () => console.log('Listening on ${PORT}'));
// });
