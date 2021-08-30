const doWork = async () =>{
    //throw new Error('Something went wrong')
    return 'Work is done'

}

doWork().then((result) => {
    console.log('Result:',result);
}).catch(err => {
    console.log('Error: ',err);
})
