const DateTimeScalar = require('../scalars/datetime.scalar');
const { GraphQLObjectType, GraphQLEnumType, GraphQLNonNull, GraphQLString, GraphQLList } = require('graphql');

const { extendSchema } = require('../../../utils/schema.utils');

let ProcessResponseResourceType = new GraphQLEnumType({
	name: 'ProcessResponseResourceType',
	values: {
		ProcessResponse: { value: 'ProcessResponse' }
	}
});

/**
 * @name exports
 * @summary ProcessResponse Schema
 */
module.exports = new GraphQLObjectType({
	name: 'ProcessResponse',
	description: 'Base StructureDefinition for ProcessResponse Resource.',
	fields: () => extendSchema(require('./domainresource.schema'), {
		resourceType: {
			type: new GraphQLNonNull(ProcessResponseResourceType),
			description: 'Type of this resource.'
		},
		identifier: {
			type: new GraphQLList(require('./identifier.schema')),
			description: 'The Response business identifier.'
		},
		request: {
			type: require('./reference.schema'),
			description: 'Original request resource reference.'
		},
		// ValueSetReference: http://hl7.org/fhir/ValueSet/process-outcome
		outcome: {
			type: require('./coding.schema'),
			description: 'Transaction status: error, complete, held.'
		},
		disposition: {
			type: GraphQLString,
			description: 'A description of the status of the adjudication or processing.'
		},
		_disposition: {
			type: require('./element.schema'),
			description: 'A description of the status of the adjudication or processing.'
		},
		// ValueSetReference: http://hl7.org/fhir/ValueSet/ruleset
		ruleset: {
			type: require('./coding.schema'),
			description: 'The version of the style of resource contents. This should be mapped to the allowable profiles for this and supporting resources.'
		},
		// ValueSetReference: http://hl7.org/fhir/ValueSet/ruleset
		originalRuleset: {
			type: require('./coding.schema'),
			description: 'The style (standard) and version of the original material which was converted into this resource.'
		},
		created: {
			type: DateTimeScalar,
			description: 'The date when the enclosed suite of services were performed or completed.'
		},
		_created: {
			type: require('./element.schema'),
			description: 'The date when the enclosed suite of services were performed or completed.'
		},
		organization: {
			type: require('./reference.schema'),
			description: 'The organization who produced this adjudicated response.'
		},
		requestProvider: {
			type: require('./reference.schema'),
			description: 'The practitioner who is responsible for the services rendered to the patient.'
		},
		requestOrganization: {
			type: require('./reference.schema'),
			description: 'The organization which is responsible for the services rendered to the patient.'
		},
		// ValueSetReference: http://hl7.org/fhir/ValueSet/forms
		form: {
			type: require('./coding.schema'),
			description: 'The form to be used for printing the content.'
		},
		notes: {
			type: new GraphQLList(require('./processresponsenotes.schema')),
			description: 'Suite of processing note or additional requirements is the processing has been held.'
		},
		// ValueSetReference: http://hl7.org/fhir/ValueSet/adjudication-error
		error: {
			type: new GraphQLList(require('./coding.schema')),
			description: 'Processing errors.'
		}
	})
});
