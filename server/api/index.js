import { version } from '!json!../../package.json';
import { Router } from 'express';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	// api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
    console.log("Here");

		res.json({ version });
	});

	return api;
}
