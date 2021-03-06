const {
	MedicationOrderQuery,
	MedicationOrderListQuery,
	MedicationOrderInstanceQuery
} = require('./query');

const {
	MedicationOrderCreateMutation,
	MedicationOrderUpdateMutation,
	MedicationOrderDeleteMutation
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
		MedicationOrder: MedicationOrderQuery,
		MedicationOrderList: MedicationOrderListQuery
	},
	/**
	* Define Mutation Schema's here
	* Each profile will need to define the supported mutations
	* and these keys must be unique across the entire application, like routes
	*/
	mutation: {
		MedicationOrderCreate: MedicationOrderCreateMutation,
		MedicationOrderUpdate: MedicationOrderUpdateMutation,
		MedicationOrderDelete: MedicationOrderDeleteMutation
	},
	/**
	* These properties are so the core router can setup the approriate endpoint
	* for a direct query against a resource
	*/
	instance_query: {
		name: 'MedicationOrder',
		path: '/1_0_2/MedicationOrder/:id',
		query: MedicationOrderInstanceQuery
	}
};
