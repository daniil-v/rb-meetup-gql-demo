const fs = require('fs');
const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const GraphQLJSON = require('graphql-type-json');

const typeDefs = gql`
  scalar JSON

  type Episode {
    id: ID
    name: String
    air_date: String
    episode: String
    #characters: [Character]!
    created: String
    }

  type Character {
    id: ID
    name: String
    status: String
    species: String
    type: String
    gender: String
    #origin: Location
    #location: Location
    image: String
    episode: [Episode]!
    created: String
  }

  type Characters {
    results: [Character]
  }

  type Query {
    characters: Characters
    multipleCharacters: Characters
    multipleCharactersJson: JSON 
    charactersWithParams(id: Int): Characters
    character(id: ID): Character
  }
`;

const rawdata = fs.readFileSync('chars.json');
const chars = JSON.parse(rawdata);

const multiplier = 1000;
const multipliedChars = Array(multiplier).fill(chars.data.characters.results[1]);

const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    characters: () => {
      return chars.data.characters
    },
    multipleCharacters: () => {
      return { results: multipliedChars }
    },
    multipleCharactersJson: () => {
      return { results: multipliedChars }
    },
    charactersWithParams: (_, { id }) => {
      console.log(id)
      return { results: multipliedChars }
    },
    character: (_, { id }) => {
      return chars.data.characters.results.find(char => +char.id === +id)
    }
  },
};


const server = new ApolloServer({
  typeDefs, resolvers,
  addTypename: true,
  plugins: [
    // switch on playground
    ApolloServerPluginLandingPageGraphQLPlayground({
      'schema.polling.enable': false
    })
  ]
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});