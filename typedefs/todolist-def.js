const { gql } = require('apollo-server');

const typeDefs = gql `
	type Todolist {
		_id: String!
		name: String!
		owner: String!
		region: [Item]!
		sortRule: String!
		sortDirection: Int!
	}
	type Item {
		_id: String!
		name: String!
		capital: String!
		leader: String!
		landmarks: [String]!
		parent: String
		region: [String]!
	}
	extend type Query {
		getAllMaps: [Todolist]
		getTodoById(_id: String!): Todolist 
	}
	extend type Mutation {
		addTodolist(todolist: TodoInput!): Todolist
		addItem(item: ItemInput!, _id: String!, index: Int!): String
		addLandmark(name: String!, region: ItemInput!): String
		deleteItem(itemId: String!, _id: String!): [Item]		
		deleteTodolist(_id: String!): Boolean
		updateTodolistField(_id: String!, field: String!, value: String!): String
		updateItemField(itemId: String!, _id: String!, field: String!, value: String!): [Item]
		reorderItems(itemId: String!, _id: String!, direction: Int!): [Item]
		sortItems(_id: String!, criteria: String!): [Item]
	}
	input TodoInput {
		_id: String
		name: String
		owner: String
		region: [ItemInput]
		sortRule: String
		sortDirection: Int
	}
	input ItemInput {
		_id: String
		name: String
		capital: String
		leader: String
		landmarks: [String]
		parent: String
		region: [String]
	}
`;

module.exports = { typeDefs: typeDefs }