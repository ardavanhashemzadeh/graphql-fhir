const UriScalar = require('../scalars/uri.scalar');
const CodeScalar = require('../scalars/code.scalar');
const DateTimeScalar = require('../scalars/datetime.scalar');
const { GraphQLInputObjectType, GraphQLEnumType, GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLList } = require('graphql');

const { extendSchema } = require('../../../utils/schema.utils');

let OperationDefinitionResourceInputType = new GraphQLEnumType({
	name: 'OperationDefinitionResourceInputType',
	values: {
		OperationDefinition: { value: 'OperationDefinition' }
	}
});

/**
 * @name exports
 * @summary OperationDefinition Input Schema
 */
module.exports = new GraphQLInputObjectType({
	name: 'OperationDefinition_Input',
	description: 'Base StructureDefinition for OperationDefinition Resource.',
	fields: () => extendSchema(require('./domainresource.input'), {
		resourceType: {
			type: new GraphQLNonNull(OperationDefinitionResourceInputType),
			description: 'Type of this resource.'
		},
		url: {
			type: UriScalar,
			description: 'An absolute URL that is used to identify this operation definition when it is referenced in a specification, model, design or an instance. This SHALL be a URL, SHOULD be globally unique, and SHOULD be an address at which this operation definition is (or will be) published.'
		},
		_url: {
			type: require('./element.input'),
			description: 'An absolute URL that is used to identify this operation definition when it is referenced in a specification, model, design or an instance. This SHALL be a URL, SHOULD be globally unique, and SHOULD be an address at which this operation definition is (or will be) published.'
		},
		version: {
			type: GraphQLString,
			description: 'The identifier that is used to identify this version of the profile when it is referenced in a specification, model, design or instance. This is an arbitrary value managed by the profile author manually and the value should be a timestamp.'
		},
		_version: {
			type: require('./element.input'),
			description: 'The identifier that is used to identify this version of the profile when it is referenced in a specification, model, design or instance. This is an arbitrary value managed by the profile author manually and the value should be a timestamp.'
		},
		name: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'A free text natural language name identifying the operation.'
		},
		_name: {
			type: require('./element.input'),
			description: 'A free text natural language name identifying the operation.'
		},
		// ValueSetReference: http://hl7.org/fhir/ValueSet/conformance-resource-status
		status: {
			type: new GraphQLNonNull(CodeScalar),
			description: 'The status of the profile.'
		},
		_status: {
			type: require('./element.input'),
			description: 'The status of the profile.'
		},
		// ValueSetReference: http://hl7.org/fhir/ValueSet/operation-kind
		kind: {
			type: new GraphQLNonNull(CodeScalar),
			description: 'Whether this is an operation or a named query.'
		},
		_kind: {
			type: require('./element.input'),
			description: 'Whether this is an operation or a named query.'
		},
		experimental: {
			type: GraphQLBoolean,
			description: 'This profile was authored for testing purposes (or education/evaluation/marketing), and is not intended to be used for genuine usage.'
		},
		_experimental: {
			type: require('./element.input'),
			description: 'This profile was authored for testing purposes (or education/evaluation/marketing), and is not intended to be used for genuine usage.'
		},
		publisher: {
			type: GraphQLString,
			description: 'The name of the individual or organization that published the operation definition.'
		},
		_publisher: {
			type: require('./element.input'),
			description: 'The name of the individual or organization that published the operation definition.'
		},
		contact: {
			type: new GraphQLList(require('./operationdefinitioncontact.input')),
			description: 'Contacts to assist a user in finding and communicating with the publisher.'
		},
		date: {
			type: DateTimeScalar,
			description: 'The date this version of the operation definition was published. The date must change when the business version changes, if it does, and it must change if the status code changes. In addition, it should change when the substantive content of the Operation Definition changes.'
		},
		_date: {
			type: require('./element.input'),
			description: 'The date this version of the operation definition was published. The date must change when the business version changes, if it does, and it must change if the status code changes. In addition, it should change when the substantive content of the Operation Definition changes.'
		},
		description: {
			type: GraphQLString,
			description: 'A free text natural language description of the profile and its use.'
		},
		_description: {
			type: require('./element.input'),
			description: 'A free text natural language description of the profile and its use.'
		},
		requirements: {
			type: GraphQLString,
			description: 'Explains why this operation definition is needed and why it\'s been constrained as it has.'
		},
		_requirements: {
			type: require('./element.input'),
			description: 'Explains why this operation definition is needed and why it\'s been constrained as it has.'
		},
		idempotent: {
			type: GraphQLBoolean,
			description: 'Operations that are idempotent (see [HTTP specification definition of idempotent](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html)) may be invoked by performing an HTTP GET operation instead of a POST.'
		},
		_idempotent: {
			type: require('./element.input'),
			description: 'Operations that are idempotent (see [HTTP specification definition of idempotent](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html)) may be invoked by performing an HTTP GET operation instead of a POST.'
		},
		code: {
			type: new GraphQLNonNull(CodeScalar),
			description: 'The name used to invoke the operation.'
		},
		_code: {
			type: require('./element.input'),
			description: 'The name used to invoke the operation.'
		},
		notes: {
			type: GraphQLString,
			description: 'Additional information about how to use this operation or named query.'
		},
		_notes: {
			type: require('./element.input'),
			description: 'Additional information about how to use this operation or named query.'
		},
		base: {
			type: require('./reference.input'),
			description: 'Indicates that this operation definition is a constraining profile on the base.'
		},
		system: {
			type: new GraphQLNonNull(GraphQLBoolean),
			description: 'Indicates whether this operation or named query can be invoked at the system level (e.g. without needing to choose a resource type for the context).'
		},
		_system: {
			type: require('./element.input'),
			description: 'Indicates whether this operation or named query can be invoked at the system level (e.g. without needing to choose a resource type for the context).'
		},
		// ValueSetReference: http://hl7.org/fhir/ValueSet/resource-types
		type: {
			type: new GraphQLList(CodeScalar),
			description: 'Indicates whether this operation or named query can be invoked at the resource type level for any given resource type level (e.g. without needing to choose a resource type for the context).'
		},
		_type: {
			type: require('./element.input'),
			description: 'Indicates whether this operation or named query can be invoked at the resource type level for any given resource type level (e.g. without needing to choose a resource type for the context).'
		},
		instance: {
			type: new GraphQLNonNull(GraphQLBoolean),
			description: 'Indicates whether this operation can be invoked on a particular instance of one of the given types.'
		},
		_instance: {
			type: require('./element.input'),
			description: 'Indicates whether this operation can be invoked on a particular instance of one of the given types.'
		},
		parameter: {
			type: new GraphQLList(require('./operationdefinitionparameter.input')),
			description: 'The parameters for the operation/query.'
		}
	})
});
