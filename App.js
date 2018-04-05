var express = require('express');
var app = express();
var date = new Date();
var hours = date.getHours();
var mins = date.getMinutes();
var sec = date.getSeconds();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();

app.get('/messenger', function(req,res){
  var messenger =  {
    "user1" : 
    [
      {
      "name" : "Sara",
      "msg" : "Hello Sir",
      "time" : [hours, ":", mins, ":", sec],
      "date" : [day,month, ",", year]     
    }
  ],
    "user2": 
    [
      {
      "name" : "Hamza Sir",
      "msg" : "Hello Sara",
      "date and time" : Date(),
    }
  ]
  }
  return res.json(messenger)
});
app.listen(3000);