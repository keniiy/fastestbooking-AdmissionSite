const server = require('./api/routes/index');

const port = process.env.PORT || 4000;

const db = require('./database/config/db');

db()
	.then(() => {
		console.log('database is connected')
	})
	.catch((err) => {
		console.log(err);
	});


server.listen(port, () => console.log(`app listening at ${port}`));