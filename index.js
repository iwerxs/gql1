import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// import dummy database
import db from './dummydb.js';
// typeDefs from schema.js
import { typeDefs } from "./schema.js";

// make Resolver functions for the Root Query type to the Graph and the entry points
const resolvers = {
  Query: {
    games(){
      return db.games
    },
    game(_, args){
      return db.games.find((game)=> game.id === args.id)
    },
    authors(){
      return db.authors
    },
    author(_, args){
      return db.authors.find((author)=> author.id === args.id)
    },
    reviews(){
      return db.reviews
    },
    review(_, args){
      return db.reviews.find((review)=> review.id === args.id)
    }
  },
  Game: {
    reviews(parent){
      return db.reviews.filter((r)=> r.game_id === parent.id)
    }
  },
  Author: {
    reviews(parent){
      return db.reviews.filter((r)=> r.author_id === parent.id)
    }
  },
  Review: {
    author(parent){
      return db.authors.find((a)=> a.id === parent.author_id)
    },
    game(parent){
      return db.games.find((g)=> g.id === parent.game_id)
    }
  },
  Mutation: {
    deleteGame(_, args){
      db.games = db.games.filter((g)=> g.id !== args.id)
      return db.games
    },
    addGame(_, args) {
      let game = {
        ...args.game, 
        id: Math.floor(Math.random() * 10000).toString()
      }
      db.games.push(game)
      return game
    }
  }
}
/** Ex Query
 * games {
 *  title
 * }
 * returns ONLY the title property from the games array object.
 */
/**
 * review(parent, args, context){
 * }
 */
/**
 * query ReviewQuery($variable : DataType)
 */
/** Ex Nested Query
 * query GameQuery($id: ID!){
 *  game(id: $id){
 *    title,
 *    reviews {
 *      rating,
 *      content
 *    }
 *  }
 * }
 */
/** Filter Methods are used
 *  (r) is resolver, on the property being filtered
 */

// Server Setup
// ApolloSrv takes 2 args: typeDefs (type Definitions) description of data types and their relationships
// and Resolvers property, a grp of resolver functions that determine how queries are responded to
// all of this information is used to build a Schema, the graphical representation of the data 
const server = new ApolloServer({
  //typeDefs, like a map to structure the graph, but doesn't handle queries
  typeDefs,
  //resolvers to handle queries on the data and respond
  resolvers
});

const {url} = await startStandaloneServer(server, {
  listen: {port: 4000}
});

console.log('Server ready at port', 4000);