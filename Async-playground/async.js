const add = (a, b) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
            //just to check what happend when a await function get rejected in async function in doWork method
            if(a<0 || b<0){
                return reject("Numbers must be non negative")
            }
			resolve(a + b);
		}, 2000);
	});
};


const doWork = async () =>{
    
    const sum = await add(1,99)
    const sum2 = await add(sum,50)
    const sum3 = await add(sum2, -3)
    //if anything gets rejected, the catch of doWork chaining will catch the error and will stop the code executuion
    return sum3;

}

doWork().then((result) => {
    console.log('Result:',result);
}).catch(err => {
    console.log('Error: ',err);
})
