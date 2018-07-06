const { configureRoutes, parseVersionFromUrl } = require('../utils/router.utils');
const errorUtils = require('../utils/error.utils');
const compression = require('compression');
const bodyParser = require('body-parser');
const Winston = require('./winston');
const express = require('express');
const helmet = require('helmet');
const https = require('https');
const http = require('http');
const fs = require('fs');

class Server {

	constructor (config = {}) {
		// Store the config
		this.config = config;

		// Create an application logger
		this.logger = new Winston(config.logging);

		// Create our express instance
		this.app = express();

		// Store some environment settings
		this.env = {
			IS_PRODUCTION: process.env.NODE_ENV === 'production',
			USE_HTTPS: config.ssl && config.ssl.key && config.ssl.cert
		};
		// return self for chaining
		return this;
	}

	// Initialize a database connection
	initializeDatabaseConnection (options = {}) {
		// Store the db on this somehow

		// return self for chaining
		return this;
	}

	// Configure session
	configureSession (session) {
		// Session config can come from the core config as well, let's handle both cases
		let { sessionStore } = this.config;
		// If a session was passed in the config, let's use it
		if (session || sessionStore) {
			this.app.use(session || sessionStore);
		}
		// return self for chaining
		return this;
	}

	// Configure middleware
	configureMiddleware () {
		// Enable stack traces
		this.app.set('showStackError', !this.env.IS_PRODUCTION);
		// Add compression
		this.app.use(compression({ level: 9 }));
		// Enable the body parser
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(bodyParser.json());
		// return self for chaining
		return this;
	}

	// Configure helmet
	configureHelmet (helmetConfig) {
		/**
		 * The following headers are turned on by default:
		 * - dnsPrefetchControl (Controle browser DNS prefetching). https://helmetjs.github.io/docs/dns-prefetch-control
		 * - frameguard (prevent clickjacking). https://helmetjs.github.io/docs/frameguard
		 * - hidePoweredBy (remove the X-Powered-By header). https://helmetjs.github.io/docs/hide-powered-by
		 * - hsts (HTTP strict transport security). https://helmetjs.github.io/docs/hsts
		 * - ieNoOpen (sets X-Download-Options for IE8+). https://helmetjs.github.io/docs/ienoopen
		 * - noSniff (prevent clients from sniffing MIME type). https://helmetjs.github.io/docs/dont-sniff-mimetype
		 * - xssFilter (adds small XSS protections). https://helmetjs.github.io/docs/xss-filter/
		 */
		this.app.use(helmet(helmetConfig || {
			// Needs https running first
			hsts: this.env.USE_HTTPS
		}));
		// return self for chaining
		return this;
	}

	// Setup a public directory for static assets
	setPublicDirectory (publicDir = '') {
		// Public config can come from the core config as well, let's handle both cases
		let { publicDirectory } = this.config;

		if (publicDir || publicDirectory) {
			this.app.use(express.static(publicDir || publicDirectory));
		}
		// return self for chaining
		return this;
	}

	// Setup profile routes
	setProfileRoutes () {
		// Pass this instance so I can grab the express app and any config
		// that may or may not be necessary for the router utils
		configureRoutes(this);
		// return self for chaining
		return this;
	}

	// Setup error routes
	setErrorRoutes () {
		// Generic catch all error handler
		// Errors should be passed through with next
		this.app.use((err, req, res, next) => {
			// If there is an internal error, log the error and pass it on
			// it should already be formatted as a GraphQL error at this point
			if (err) {
				this.logger.error(err);
				// Whenever a FHIR resource is sent back, the mimetype must be application/fhir+json
				res.type('application/fhir+json');
				return res.status(500).json(err);
			}
			// No error
			next();
		});

		// Nothing has responded by now, respond with 404
		this.app.use((req, res) => {
			// Create an operation outcome for this version
			let version = parseVersionFromUrl(req.path, this.config);
			let error = errorUtils.notFound(version);
			// Log the error and send the response
			this.logger.error(error);
			// Whenever a FHIR resource is sent back, the mimetype must be application/fhir+json
			res.type('application/fhir+json');
			res.status(404).json(error);
		});

		// return self for chaining
		return this;
	}

	// Start the server
	listen (port = process.env.PORT, callback) {
		let { ssl } = this.config;

		// Create our server
		this.app = !this.env.USE_HTTPS
			? http.createServer(this.app)
			: https.createServer({
					key: fs.readFileSync(ssl.key),
					cert: fs.readFileSync(ssl.cert)
				}, this.app);

		// Listen
		this.app.listen(port, callback);

		return this;
	}

}

module.exports = Server;