const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

// Below I updated the way timestamps are set in the schema.
// There is the first object arugment to the Schema that defines the rules for the fields
// Then an optional second object argument for configuration options
const promotionSchema = new Schema(
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
		cost: {
			type: Currency,
			required: true,
			min: 0,
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
// name you want to use (e.g. Promotion for promotions collection)
// along with a Schema
// const Promotions = mongoose.model('Promotions', promotionSchema);
const Promotion = mongoose.model('Promotion', promotionSchema);

// Here we would then want to export Promotion instead of Promotions
// module.exports = Promotions;
module.exports = Promotion;
