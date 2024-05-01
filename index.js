import table from './table.js';
import express from 'express';

const app = express();
const port = process.env.PORT || 3300;

app.get('/', (req, res) => {
	res.status(200).send(table);
});

app.get('/:acronym', (req, res) => {
	const acronym = req.params.acronym.toUpperCase();
	const team = table.find(info => info.sigla === acronym);
	if (!team) {
		res
			.status(404)
			.send('Não existe na série A do Brasileirão um time com a sigla informada');
		return;
	}
	res.status(200).send(team);
});

app.listen(port, () => console.log(`Servidor rodando http://localhost:${port}`));
