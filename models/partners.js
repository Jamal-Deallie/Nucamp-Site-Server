const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Below I updated the way timestamps are set in the schema.
// There is the first object arugment to the Schema that defines the rules for the fields
// Then an optional second object argument for configuration options
const partnerSchema = new Schema(
	// First Object Argument for field rules
	{
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		featured: {
			type: Boolean,
			default: false,
		},
		description: {
			type: String,
			required: true,
		},
	},
	// Second Object Argument for configuration
	{
		timestamps: true,
	}
);
// 	timestamps: true,
// });

// Must pass in the upper cased, singular version of the collection
// name you want to use (e.g. Partner for partners collection)
// along with a Schema
// const Partners = mongoose.model('Partners', partnerSchema);
const Partner = mongoose.model('Partner', partnerSchema);

// Here we would then want to export Partner instead of Partners
// module.exports = Partners;
module.exports = Partner;
