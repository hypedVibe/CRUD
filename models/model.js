(function() {
  var fs = require('fs');

  function readFromJSON(){
    var users = fs.readFileSync('./usersList.json', 'utf-8');
    users = JSON.parse(users);
    return users;
  }

  function findId(id){
    var users = readFromJSON();
    for (var i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        return i;
      }
    }
  }

  exports.getAllUsers = function() {
    var users = readFromJSON();
    return users;
  };

  exports.findNewId = function() {
    var users = readFromJSON();
    var max = 0;
    for (var i = 0; i < users.length; i++) {
      if (users[i].id > max) {
        max = users[i].id;
      } 
    }
    return max + 1;
  }

  exports.addUser = function(newUser) {
    var users = readFromJSON();
    users.push(newUser);
    var newUsersList = JSON.stringify(users);
    fs.writeFileSync('./usersList.json', newUsersList);
  }

  exports.findUser = function(id) {
    var users = readFromJSON();
    for (var i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        return users[i];
      }
    }
  }

  exports.updateUser = function(id, name, username, age) {
    var users = readFromJSON();
    var userId = findId(id);
    users[userId].name = name;
    users[userId].username = username;
    users[userId].age = age;
    var newUsersList = JSON.stringify(users);
    fs.writeFileSync('./usersList.json', newUsersList);
  };

  exports.deleteUser = function(id) {
    var users = readFromJSON();
    for(var i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        delete users[i];
      }
    }
    users = users.filter(function(e) {
      return e;
    });
    var newUsersList = JSON.stringify(users);
    fs.writeFileSync('./usersList.json', newUsersList);
    return users;
  };
})();
