const ObjectId = require('mongoose').Types.ObjectId;
const Todolist = require('../models/todolist-model');
const Sorting = require('../utils/sorting')

// The underscore param, "_", is a wildcard that can represent any value;
// here it is a stand-in for the parent parameter, which can be read about in
// the Apollo Server documentation regarding resolvers

module.exports = {
	Query: {
		/** 
			  @param 	 {object} req - the request object containing a user id
			@returns {array} an array of todolist objects on success, and an empty array on failure
		**/
		getAllMaps: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if (!_id) { return ([]) };
			const todolists = await Todolist.find({ owner: _id }).sort({ updatedAt: 'descending' });
			if (todolists) {
				return (todolists);
			}

		},
		/** 
			  @param 	 {object} args - a todolist id
			@returns {object} a todolist on success and an empty object on failure
		**/
		getTodoById: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const todolist = await Todolist.findOne({ _id: objectId });
			if (todolist) return todolist;
			else return ({});
		},
	},
	Mutation: {
		/** 
			  @param 	 {object} args - a todolist id and an empty item object
			@returns {string} the objectID of the item or an error message
		**/
		addItem: async (_, args) => {
			const { _id, item, index } = args;
			const listId = new ObjectId(_id);
			const objectId = new ObjectId();
			const found = await Todolist.findOne({ _id: listId });
			if (!found) return ('Todolist not found');
			if (item._id === '') item._id = objectId;
			let listItems = found.region;
			if (index < 0) listItems.push(item);
			else listItems.splice(index, 0, item);

			const updated = await Todolist.updateOne({ _id: listId }, { region: listItems });
			if (updated) return (item._id)
			else return ('Could not add item');
		},
		addLandmark: async (_, args) => { //not being added in the db..
			const { name, region } = args;
			// region.landmarks.push(name);
			const out = region._id;
			let regionID = new ObjectId(region.parent);
			let count = 0;
			let root = await Todolist.findOne({ _id: regionID });
			while (!root) {
				region = region.parent;
				regionID = new ObjectId(region.parent);
				root = await Todolist.findOne({ _id: regionID });
				count++;
			}
			const listId = new ObjectId(root._id);
			const listItems = root.region;
			let testing = [root.region];
			// for(var i = 0; i < count; i++){
			// 	testing.push(testing[i].region);
			// }
			// testing[count].landmarks.push(name);
			// for(var j = count; j > 0; j--){
			// 	testing[j].region = testing[j-1].slice();
			// }
			const updated = await Todolist.updateOne({ _id: listId }, { region: listItems });
			if (updated) return (out)
			else return ('Could not add landmark');
		},
		/** 
			  @param 	 {object} args - an empty todolist object
			@returns {string} the objectID of the todolist or an error message
		**/
		addTodolist: async (_, args) => {
			const { todolist } = args;
			const objectId = new ObjectId();
			const { _id, name, owner, region, sortRule, sortDirection } = todolist;
			const newList = new Todolist({
				_id: objectId,
				name: name,
				owner: owner,
				region: region,
				sortRule: sortRule,
				sortDirection: sortDirection
			});
			const updated = await newList.save();
			if (updated) {
				console.log(newList)
				return newList;
			}
		},
		/** 
			  @param 	 {object} args - a todolist objectID and item objectID
			@returns {array} the updated item array on success or the initial 
							 array on failure
		**/
		deleteItem: async (_, args) => {
			const { _id, itemId } = args;
			const listId = new ObjectId(_id);
			const found = await Todolist.findOne({ _id: listId });
			let listItems = found.region;
			listItems = listItems.filter(item => item._id.toString() !== itemId);
			const updated = await Todolist.updateOne({ _id: listId }, { region: listItems })
			if (updated) return (listItems);
			else return (found.region);

		},
		/** 
			  @param 	 {object} args - a todolist objectID 
			@returns {boolean} true on successful delete, false on failure
		**/
		deleteTodolist: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const deleted = await Todolist.deleteOne({ _id: objectId });
			if (deleted) return true;
			else return false;
		},
		/** 
			  @param 	 {object} args - a todolist objectID, field, and the update value
			@returns {boolean} true on successful update, false on failure
		**/
		updateTodolistField: async (_, args) => {
			const { field, value, _id } = args;
			const objectId = new ObjectId(_id);
			const updated = await Todolist.updateOne({ _id: objectId }, { [field]: value });
			if (updated) return value;
			else return "";
		},
		/** 
			@param	 {object} args - a todolist objectID, an item objectID, field, and
									 update value.
			@returns {array} the updated item array on success, or the initial item array on failure
		**/
		updateItemField: async (_, args) => {
			const { _id, itemId, field } = args;
			let { value } = args
			const listId = new ObjectId(_id);
			const found = await Todolist.findOne({ _id: listId });
			let listItems = found.region;
			listItems.map(item => {
				if (item._id.toString() === itemId) {
					item[field] = value;
				}
			});
			const updated = await Todolist.updateOne({ _id: listId }, { region: listItems })
			if (updated) return (listItems);
			else return (found.region);
		},
		/**
			@param 	 {object} args - contains list id, item to swap, and swap direction
			@returns {array} the reordered item array on success, or initial ordering on failure
		**/
		reorderItems: async (_, args) => {
			const { _id, itemId, direction } = args;
			const listId = new ObjectId(_id);
			const found = await Todolist.findOne({ _id: listId });
			let listItems = found.items;
			const index = listItems.findIndex(item => item._id.toString() === itemId);
			// move selected item visually down the list
			if (direction === 1 && index < listItems.length - 1) {
				let next = listItems[index + 1];
				let current = listItems[index]
				listItems[index + 1] = current;
				listItems[index] = next;
			}
			// move selected item visually up the list
			else if (direction === -1 && index > 0) {
				let prev = listItems[index - 1];
				let current = listItems[index]
				listItems[index - 1] = current;
				listItems[index] = prev;
			}
			const updated = await Todolist.updateOne({ _id: listId }, { items: listItems })
			if (updated) return (listItems);
			// return old ordering if reorder was unsuccessful
			listItems = found.items;
			return (found.items);

		},

		sortItems: async (_, args) => {
			const { _id, criteria } = args;
			const listId = new ObjectId(_id);
			const found = await Todolist.findOne({ _id: listId });
			let newDirection = found.sortDirection === 1 ? -1 : 1;
			console.log(newDirection, found.sortDirection);
			let sortedItems;

			switch (criteria) {
				case 'name':
					sortedItems = Sorting.byTask(found.region, newDirection);
					break;
				case 'capital':
					sortedItems = Sorting.byDueDate(found.region, newDirection);
					break;
				case 'leader':
					sortedItems = Sorting.byStatus(found.region, newDirection);
					break;
				case 'landmark':
					sortedItems = Sorting.byAssignedTo(found.region, newDirection);
					break;
				default:
					return found.items;
			}
			const updated = await Todolist.updateOne({ _id: listId }, { items: sortedItems, sortRule: criteria, sortDirection: newDirection })
			if (updated) return (sortedItems);

		}

	}
}