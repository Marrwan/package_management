const { EmailAddressResolver } = require('graphql-scalars');
const { merge } = require('lodash');
const authResolvers = require("./auth.resolvers");
const packageResolvers = require("./package.resolvers");

const resolvers = merge(authResolvers, packageResolvers, {
    EmailAddress: EmailAddressResolver
});

module.exports = resolvers;
