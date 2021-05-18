const { gql } = require('apollo-server');

const typeDefs = gql `
	type Map {
		_id: String!
		name: String!
		owner: String!
		region: [Region]!
	}
	type Region {
		_id: String!
		name: String!
		capital: String!
		leader: String!
		landmarks: [String]!
		region: [Region]!
	}
	extend type Query {
		getAllMaps: [Map]
		getMapById(_id: String!): Map
	}
	extend type Mutation {
		addRegion(region: RegionInput!, _id: String!, index: Int!): String
		deleteRegion(regionId: String!, _id: String!): [Region]		
		updateRegionField(regionId: String!, _id: String!, field: String!, value: String!): [Region]
		addRegionLandmark(_id: String!, regionId: String!, value: String!): [Region]
		editRegionLandmark(_id: String!, regionId: String!, value: String!, landmarkIndex: Int!): [Region]
		sort(type: String!, _id: String!): [Region]
		addMap(map: MapInput!): String
		deleteMap(_id: String!): Boolean
	}
	input MapInput {
		_id: String!
		name: String!
		owner: String!
		region: [RegionInput]!
	}
	input RegionInput {
		_id: String!
		name: String!
		capital: String!
		leader: String!
		landmarks: [String]!
		region: [RegionInput]!
	}
`;

module.exports = { typeDefs: typeDefs }
