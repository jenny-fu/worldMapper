const { model, Schema, ObjectId } = require('mongoose');

const itemSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		capital: {
			type: String,
			required: true
		},
		leader: {
			type: String,
			required: true
		},
        landmarks: {
            type: [String],
            required: true
        },
		parent: {
			type: ObjectId,
			required: true
		},
		region: [ObjectId]
	}
);

const Item = model('Item', itemSchema);
module.exports = Item;