const { gql } = require('apollo-server-express');

const typeDefs = gql`
    scalar EmailAddress
    
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
        access_token: String!
        user: User!
    }

    input PriceRangeInput {
        min: Float
        max: Float
    }

    type Query {
        getPackages(
            name: String,
            expirationDate: String,
            priceRange: PriceRangeInput
        ): [Package]
        getPackageById(id: ID!): Package
    }

    type Mutation {
        register(name: String!, email: EmailAddress!, password: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
        createPackage(name: String!, description: String!, price: Float!, expirationDate: String!): Package
        updatePackage(id: ID!, name: String, description: String, price: Float): Package
        deletePackage(id: ID!): Boolean
        switchRole(userId: ID, newRole: String!): User
    }
`;

module.exports = typeDefs;
