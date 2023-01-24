require('dotenv').config();
const app = require('./app');

app.listen(process.env.PORT, (err) => {
	console.log('Server connection success!');
});
0