const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

// dummy data
const books = [
  { name: 'Name of the wind', genre: 'Fantasy', id: '1', authorID: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorID: '2' },
  { name: 'The Lnog Earth', genre: 'Sci-Fi', id: '3', authorID: '3' },
  { name: 'Name of the wind', genre: 'Fantasy', id: '4', authorID: '1' },
  { name: 'The Final Match', genre: 'Fantasy', id: '5', authorID: '3' },
  { name: 'The Long Journey', genre: 'Sci-Fi', id: '6', authorID: '3' }
];
const authors = [
  { name: 'Patrick Viera', age: 44, id: '1' },
  { name: 'Thierry Henry', age: 66, id: '2' },
  { name: 'Kato Charles', age: 34, id: '3' }
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorID });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorID: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db/ other sources
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
