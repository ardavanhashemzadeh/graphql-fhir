const CodeScalar = require('../scalars/code.scalar');
const DateTimeScalar = require('../scalars/datetime.scalar');
const { GraphQLInputObjectType, GraphQLEnumType, GraphQLNonNull, GraphQLString, GraphQLList } = require('graphql');

const { extendSchema } = require('../../../utils/schema.utils');

let PaymentReconciliationResourceInputType = new GraphQLEnumType({
	name: 'PaymentReconciliationResourceInputType',
	values: {
		PaymentReconciliation: { value: 'PaymentReconciliation' }
	}
});

/**
 * @name exports
 * @summary PaymentReconciliation Input Schema
 */
module.exports = new GraphQLInputObjectType({
	name: 'PaymentReconciliation_Input',
	description: 'Base StructureDefinition for PaymentReconciliation Resource.',
	fields: () => extendSchema(require('./domainresource.input'), {
		resourceType: {
			type: new GraphQLNonNull(PaymentReconciliationResourceInputType),
			description: 'Type of this resource.'
		},
		identifier: {
			type: new GraphQLList(require('./identifier.input')),
			description: 'The Response business identifier.'
		},
		request: {
			type: require('./reference.input'),
			description: 'Original request resource reference.'
		},
		// ValueSetReference: http://hl7.org/fhir/ValueSet/remittance-outcome
		outcome: {
			type: CodeScalar,
			description: 'Transaction status: error, complete.'
		},
		_outcome: {
			type: require('./element.input'),
			description: 'Transaction status: error, complete.'
		},
		disposition: {
			type: GraphQLString,
			description: 'A description of the status of the adjudication.'
		},
		_disposition: {
			type: require('./element.input'),
			description: 'A description of the status of the adjudication.'
		},
		// ValueSetReference: http://hl7.org/fhir/ValueSet/ruleset
		ruleset: {
			type: require('./coding.input'),
			description: 'The version of the style of resource contents. This should be mapped to the allowable profiles for this and supporting resources.'
		},
		// ValueSetReference: http://hl7.org/fhir/ValueSet/ruleset
		originalRuleset: {
			type: require('./coding.input'),
			description: 'The style (standard) and version of the original material which was converted into this resource.'
		},
		created: {
			type: DateTimeScalar,
			description: 'The date when the enclosed suite of services were performed or completed.'
		},
		_created: {
			type: require('./element.input'),
			description: 'The date when the enclosed suite of services were performed or completed.'
		},
		period: {
			type: require('./period.input'),
			description: 'The period of time for which payments have been gathered into this bulk payment for settlement.'
		},
		organization: {
			type: require('./reference.input'),
			description: 'The Insurer who produced this adjudicated response.'
		},
		requestProvider: {
			type: require('./reference.input'),
			description: 'The practitioner who is responsible for the services rendered to the patient.'
		},
		requestOrganization: {
			type: require('./reference.input'),
			description: 'The organization which is responsible for the services rendered to the patient.'
		},
		detail: {
			type: new GraphQLList(require('./paymentreconciliationdetail.input')),
			description: 'List of individual settlement amounts and the corresponding transaction.'
		},
		// ValueSetReference: http://hl7.org/fhir/ValueSet/forms
		form: {
			type: require('./coding.input'),
			description: 'The form to be used for printing the content.'
		},
		total: {
			type: new GraphQLNonNull(require('./quantity.input')),
			description: 'Total payment amount.'
		},
		note: {
			type: new GraphQLList(require('./paymentreconciliationnote.input')),
			description: 'Suite of notes.'
		}
	})
});
