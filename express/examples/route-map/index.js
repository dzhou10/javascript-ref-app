/**
 * Module dependencies.
 */

var express = require('../../lib/express');
const circle = require('./circle.js');
console.log('here' + circle.area(4));
//var m = require('wtest');
//m.myFunc1();
function makeFunc(){ //this is closure
   var name ="hijs";
  function display() {
    console.log(name);
  }
  return display;
}

var myFunc = makeFunc();
myFunc();

var verbose = process.env.NODE_ENV != 'test';

var app = module.exports = express();

app.map = function(a, route){
  route = route || '';
  for (var key in a) {
    switch (typeof a[key]) {
      // { '/path': { ... }}
      case 'object':
        app.map(a[key], route + key);
        break;
      // get: function(){ ... }
      case 'function':
        if (verbose) console.log('%s %s', key, route);
        app[key](route, a[key]);
        break;
    }
  }
};

var person ={
  firstname: 'wei',
  lastname: 'zhou'
};

var users = {
  list: function(req, res){
    res.send('user list');
  },

  get: function(req, res){
    res.send('user ' + req.params.uid);
  },

  delete: function(req, res){
    res.send('delete users');
  }
};

var pets = {
  list: function(req, res){
    res.send('user ' + req.params.uid + '\'s pets');
  },

  delete: function(req, res){
    res.send('delete ' + req.params.uid + '\'s pet ' + req.params.pid);
  }
};

app.map({
  '/users': {
    get: users.list,
    delete: users.delete,
    '/:uid': {
      get: users.get,
      '/pets': {
        get: pets.list,
        '/:pid': {
          delete: pets.delete
        }
      }
    }
  }
});


/* istanbul ignore next */
if (!module.parent) {
  console.log('test');
  console.log(person.firstname)
  app.listen(3003);
  console.log('Express started on port 3003');
}
