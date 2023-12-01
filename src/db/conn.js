const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/todolist")
.then(()=>{
    console.log("connected to database");
}).catch((e)=>{
    console.log("not connected",e);
})