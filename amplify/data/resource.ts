import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*=================================================================
Creating a schema will create an AWS managed GraphQL service called
AppSync in backend
Each schema is tied to a separate DynamoDB table
=================================================================*/
const schema = a.schema({ // define schema (a.schema())
  Todo: a
    .model({ // define model (a.model())
      content: a.string(),
    })
    .authorization(allow => [
      // allow signed-in user to CRUD their __OWN__ schema model
      allow.owner()
    ]),
    Business: a
      .model({
        businessName: a.string(),
        // type: a.enum(['coffee & restaurant', 'clothing', 'grocery', 'health', 'beauty', 'electronics', 'fitness & wellness', 'books & stationary', 'jewelry & accessories', 'pharmacy & health']),
        description: a.string(),
        createdAt: a.datetime()
      })
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUD requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
