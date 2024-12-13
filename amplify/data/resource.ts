import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { postConfirmation } from "../auth/post-confirmation/resource";

/*=================================================================
Creating a schema will create an AWS managed GraphQL service called
AppSync in backend
Each schema is tied to a separate DynamoDB table
=================================================================*/
const schema = a.schema({ // define schema (a.schema())
  // creating a user model to store additional attributes not provided by Cognito and to define relationships between user and entities
  UserProfile: a 
    .model({
      name: a.string().required(),
      profileOwner: a.string(),
      cards: a.hasMany('Card', 'userId'),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization(allow => [
      allow.ownerDefinedIn('profileOwner')
    ]
  ),
    Business: a
      .model({
        businessName: a.string(),
        type: a.enum(['coffee_restaurant', 'clothing', 'grocery', 'health', 'beauty', 'electronics', 'fitness_wellness', 'books_stationary', 'jewelry_accessories', 'pharmacy_health']),
        description: a.string(),
        location: a.string(),
        phoneNumber: a.string(),
        createdAt: a.datetime(),
        updatedAt: a.datetime().authorization(allow => [allow.owner()]),
        rewardsCards: a.hasMany('Card', 'businessId')
        // logo: image in s3 bucket
      })
      .authorization(allow=> [
        allow.publicApiKey().to(['read']),
        allow.owner()
      ]),
    Card: a
      .model({
        userId: a.id(),
        businessId: a.id(),
        user: a.belongsTo('UserProfile', 'userId'),
        business: a.belongsTo('Business', 'businessId') ,
        points: a.integer(),
        tier: a.enum(['bronze', 'silver', 'gold', 'diamond', 'emerald']),
        createdAt: a.datetime(),
        updatedAt: a.datetime().authorization(allow => [allow.owner()])
      })
      .authorization(allow => [
        allow.authenticated().to(['read']) ,
        allow.owner()
      ]),
})
.authorization((allow) => [allow.resource(postConfirmation)]);

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
