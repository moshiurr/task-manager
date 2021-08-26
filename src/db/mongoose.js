const mongoose = require('mongoose');
const validator = require('validator');
require('dotenv').config();

const uri = process.env.MONGOOSE_URI;


mongoose.connect(uri, {
    useNewUrlParser: true
})

const User = mongoose.model('User',{
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,

        //email validation using Validator package
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        }
    },
    age: {
        type: Number,

        //number validation using built-in validators
        validate(value){
            if(value < 0) throw new Error('Age must be a positive number')
        }
    }
})


const me = new User({
    name: "moshiur",
    email: "abc@d.ca",
    age: 23
})

me.save().then(()=>{
    console.log(me)
}).catch((err)=>{
    console.log(err);
})

const Task = mongoose.model('Task',{
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

// const t = new Task({
//     description: 'Complete Mongo Portion',
//     completed: true
// })


// t.save().then(()=>{
//     console.log(t);
// }).catch((err)=>{
//     console.log(err);
//})
