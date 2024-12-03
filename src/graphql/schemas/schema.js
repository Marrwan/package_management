const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Package {
        id: ID!
        name: String!
        description: String!
        price: Float!
        expirationDate: String!
        createdAt: String
        updatedAt: String
    }

    type User {
        id: ID!
        name: String!
        email: String!
        role: String
        createdAt: String
        updatedAt: String
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type Query {
        getPackages: [Package]
        getPackageById(id: ID!): Package
    }

    type Mutation {
        register(name: String!, email: String!, password: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
        createPackage(name: String!, description: String!, price: Float!, expirationDate: String!): Package
        updatePackage(id: ID!, name: String, description: String, price: Float): Package
        deletePackage(id: ID!): Boolean
    }
`;

module.exports = typeDefs;
