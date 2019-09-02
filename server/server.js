const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const port = process.env.port || 4001;

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
