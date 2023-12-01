const express = require('express');
const mongoose = require('mongoose');
const app = express()

const schema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    done:{
        default:false,
        type:Boolean
    }
})

const model = new mongoose.model('todos',schema)
module.exports = model;