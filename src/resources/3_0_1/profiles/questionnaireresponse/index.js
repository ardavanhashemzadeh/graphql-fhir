const {
	QuestionnaireResponseQuery,
	QuestionnaireResponseListQuery,
	QuestionnaireResponseInstanceQuery
} = require('./query');

const {
	QuestionnaireResponseCreateMutation,
	QuestionnaireResponseUpdateMutation,
	QuestionnaireResponseDeleteMutation
} = require('./mutation');

/**
 * @name exports
 * @static
 * @summary GraphQL Configurations. This is needed to register this profile
 * with the GraphQL server.
 */
module.exports = {
	/**
	* Define Query Schema's here
	* Each profile will need to define the two queries it supports
	* and these keys must be unique across the entire application, like routes
	*/
	query: {
		QuestionnaireResponse: QuestionnaireResponseQuery,
		QuestionnaireResponseList: QuestionnaireResponseListQuery
	},
	/**
	* Define Mutation Schema's here
	* Each profile will need to define the supported mutations
	* and these keys must be unique across the entire application, like routes
	*/
	mutation: {
		QuestionnaireResponseCreate: QuestionnaireResponseCreateMutation,
		QuestionnaireResponseUpdate: QuestionnaireResponseUpdateMutation,
		QuestionnaireResponseDelete: QuestionnaireResponseDeleteMutation
	},
	/**
	* These properties are so the core router can setup the approriate endpoint
	* for a direct query against a resource
	*/
	instance_query: {
		name: 'QuestionnaireResponse',
		path: '/3_0_1/QuestionnaireResponse/:id',
		query: QuestionnaireResponseInstanceQuery
	}
};
