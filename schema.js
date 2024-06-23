export const typeDefs = `#graphql
  type Game {
    id: ID!,
    title: String!,
    platform: [String!]!,
    reviews: [Review!]
  }
  type Review {
    id: ID!,
    rating: Int!,
    content: String!,
    game: Game!,
    author: Author!
  }
  type Author {
    id: ID!,
    name: String!,
    verified: Boolean!,
    reviews: [Review!]
  }
  type Query {
    reviews: [Review],
    review(id: ID!): Review,
    games: [Game],
    game(id: ID!): Game,
    authors: [Author],
    author(id: ID!): Author
  }
  type Mutation {
    addGame(game: AddGameInput!): Game,
    deleteGame(id: ID!): [Game]
  }
  input AddGameInput{
    title: String!,
    platform: [String!]!
  }
`

// Five basic scaler types in GraphQL
// int, float, string, boolean, ID (special type for IDs, unique) 
// Every Schema MUST HAVE a Query type, this is mandatory; it defines the Entry Points to the Graph and specify the return types
/** Relational Connections 
 * Review Object has a Game & Author property association in the database
 * Game Object has a list[] of Reviews; though some games may not have a review written
 * Author Object has a list[] of Reviews; though some authors may not have written a review
 * RESOLVER functions need to be created for these connections
 * * */