import table from './table.js';
import express from 'express';

const app = express();
const port = process.env.PORT || 3300;

app.get('/', (req, res) => {
	res.send(table);
});

app.get('/:acronym', (req, res) => {
	const acronym = req.params.acronym.toUpperCase();
	const team = table.find(info => info.sigla === acronym);
	res.send(team);
});

app.listen(port, () => console.log(`Servidor rodando http://localhost:${port}`));
