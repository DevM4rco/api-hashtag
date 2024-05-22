import express from 'express';
import table from './table.js';
import { schema, teamUpdated } from './validate.js';

const app = express();
app.use(express.json());
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

app.put('/:acronym', (req, res) => {
	const acronym = req.params.acronym.toUpperCase();
	const teamSelected = table.find(team => team.sigla === acronym);
	const { error } = teamUpdated.validate(req.body);
	const tableKeys = Object.keys(req.body);

	if (!teamSelected) {
		res
			.status(404)
			.send('Não existe na série A do Brasileirão um time com a sigla informada');
		return;
	}

	if (error) {
		res.status(400).send(error);
	}

	tableKeys.forEach(key => (teamSelected[key] = req.body[key]));

	res.status(200).send(teamSelected);
});

app.post('/', (req, res) => {
	const newTeam = req.body;
	const { error } = schema.validate(newTeam);

	if (error) {
		res.status(400).send(error);
		return;
	}

	table.push(newTeam);
	res.status(201).send(newTeam);
});

app.delete('/:acronym', (req, res) => {
	const acronym = req.params.acronym.toUpperCase();
	const indexSelected = table.findIndex(team => team.sigla === acronym);
	const teamDeleted = table.splice(indexSelected, 1);

	if (indexSelected === -1) {
		res
			.status(404)
			.send('Não existe na série A do Brasileirão um time com a sigla informada');
		return;
	}

	res.status(200).send(teamDeleted);
});

app.listen(port, () => console.log(`Servidor rodando http://localhost:${port}`));
