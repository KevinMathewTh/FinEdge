const express = require('express');

const userRoutes = require('./routes/userRoutes');
const userController = require('./controllers/userController');

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.post('/login', userController.login);
// alias: support singular `/user` paths (e.g. GET /user/:id)
app.use('/user', userRoutes);

if (require.main === module) {
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => console.log(`FinEdge server listening on port ${PORT}`));
}

module.exports = app;

