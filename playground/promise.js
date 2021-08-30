const add = (a, b) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(a + b);
		}, 2000);
	});
};

//normal promise calling function
add(1, 2)
	.then(sum => {
		console.log(sum);

		add(sum, 5)
			.then(sum2 => {
				console.log(sum2);
			})
			.catch(err => {
				console.log(err);
			});
	})
	.catch(e => {
		console.log(e);
	});

//good promise chainnig practice
console.log("New promise chainnig in effect \n\n");
add(2, 3)
	.then(sum => {
		console.log(sum);
		return add(sum, 5);
	})
	.then(sum2 => {
		console.log(sum2);
	})
	.catch(err => {
		console.log(err);
	});
