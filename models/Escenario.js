const mongoose = require('mongoose');

Schema = mongoose.Schema;

const EscenarioSchema = new mongoose.Schema({
    model:{
        type: String,
        required:true
    },
    name:{
        type: String,
        required:true
    },
    region:{
        type: String,
        required:true
    },
    variable:{
        type: String,
        required:true
    },
    unit:{
        type: String,
        required:true
    },
    values: [{
        year: {
          type: Number,
          required: true
        },
        value: {
          type: Number,
          required: true
        }
      }]
});

const User=mongoose.model('User', UserSchema);

module.exports =User;