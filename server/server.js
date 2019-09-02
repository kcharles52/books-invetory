const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

// create new express application
const app = express();

// connect to the database
const url =
  process.env.MONGODB_URL || process.env.DB_URL || 'mongodb://localhost:27017/book-invetory';

mongoose.connect(url);
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const port = process.env.PORT || 4001;

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
