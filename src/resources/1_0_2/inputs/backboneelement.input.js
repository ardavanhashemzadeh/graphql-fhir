const { GraphQLInputObjectType, GraphQLList } = require('graphql');

const { extendSchema } = require('../../../utils/schema.utils');



/**
 * @name exports
 * @summary BackboneElement Input Schema
 */
module.exports = new GraphQLInputObjectType({
	name: 'BackboneElement_Input',
	description: 'Base StructureDefinition for BackboneElement Type.',
	fields: () => extendSchema(require('./element.input'), {
		modifierExtension: {
			type: new GraphQLList(require('./extension.input')),
			description: 'May be used to represent additional information that is not part of the basic definition of the element, and that modifies the understanding of the element that contains it. Usually modifier elements provide negation or qualification. In order to make the use of extensions safe and manageable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer is allowed to define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions.'
		}
	})
});
