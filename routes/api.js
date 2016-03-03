var express = require('express');
var router = express.Router();

/////to data.js
var fs = require('fs');

var users = fs.readFileSync('./usersList.json', 'utf-8');
users = JSON.parse(users);

function getAllUsers(){
  return users;
};

function findId(){
  var max = 0;
  for(var i = 0; i < users.length; i++){
    if(users[i].id > max){
      max = users[i].id;
    } 
  }
  return max+1;
}

function addUser(newUser){
  users.push(newUser);
  var newUsersList = JSON.stringify(users);
  fs.writeFileSync('./usersList.json', newUsersList);
}

function findUser(id){
  for(var i = 0; i < users.length; i++){
    if (users[i].id == id){
      return users[i];
    }
  }
}

function updateUser(user, name, username, age){
  user.name = name;
  user.username = username;
  user.age = age;
  var id = user.id;
  console.log(users[id]);
  users[id] = user;
  console.log(users);
  users = users.filter(function(e){
    return e;
  });
  var newUsersList = JSON.stringify(users);
  fs.writeFileSync('./usersList.json', newUsersList);

  /*return user;*/
};

function deleteUser(id){
  for(var i = 0; i < users.length; i++){
    if (users[i].id == id){
      delete users[i];
    }
  }
  users = users.filter(function(e){
    return e;
  });
  var newUsersList = JSON.stringify(users);
  fs.writeFileSync('./usersList.json', newUsersList);
  return users;
};

////////


router.get('/allUsers', function(req, res) {
  var users = getAllUsers();
  res.render('api', {title: 'CRUD', users});
});

router.post('/allUsers', function(req, res) {
  var length = users.length;
  var newUser = {
    'id': findId(),
    'name': req.body.name,
    'username': req.body.username,
    'age': req.body.age
  };
  addUser(newUser);
  res.redirect('/api/allUsers');
});

router.get('/user/:id', function(req, res) {
  var id = req.params.id;
  var user = findUser(id);
  res.render('user', {title: 'CRUD Updating user', user});
});

router.put('/user/:id', function(req, res){
  var id = req.params.id;
  var user = findUser(id);
  user = updateUser(user, req.body.name, req.body.username, req.body.age);
  res.redirect('/api/allUsers');
});

router.delete('/user/:id', function(req, res){
  var id = req.params.id;
  deleteUser(id);
  res.redirect('/api/allUsers');
});


module.exports = router;