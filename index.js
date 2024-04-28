import table from './table.js';
import express from 'express';

const app = express();
const port = process.env.PORT || 3300;

app.get('/', (req, res) => {
	res.send(table);
});

app.listen(port, () => console.log(`Servidor rodando http://localhost:${port}`));
