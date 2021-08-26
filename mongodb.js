const { MongoClient, ObjectId } = require('mongodb')
require('dotenv').config();

const uri = process.env.MONGO_URI;

const dbName = "udemy-task";

MongoClient.connect(uri, { useNewUrlParser: true}, (error,client) =>{
    if(error) return console.error(error);

    console.log("Connection successful!");

    const db = client.db(dbName);

    const collection = db.collection('users');

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Complete two  setup in SU',
    //         completed: true
    //     },
    //     {
    //         description: 'Fix connection error in MongoDB',
    //         completed: true
    //     },
    //     {
    //         description: 'Work at 5pm',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if(error) return console.log("Unable to insert")
    
    //     console.log(result);
    // })


    // db.collection('users').find({age:12}).toArray((error, user)=>{
    //     if(error) return console.log("unable to fetch");

    //     console.log(user);
    // })


    // db.collection('tasks').find({completed: true}).toArray((error, task)=>{ console.log(task)});

    // collection.updateOne({
    //     _id: new ObjectId("61265bad37cf00561948a3e3")
    // }, {
    //     $inc: {
    //         age: 2
    //     }
    // }).then((result)=>{
    //     console.log(result);
    // }).catch(error=>{
    //     console.log(error);
    // })

    db.collection('tasks').updateMany({},{
        $set: {
            completed: true
        }
    }).then((result)=>{console.log(result)}).catch(error=>{console.log(error)})

})

