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
      email: a.string().required(),
      profileOwner: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      cards: a.hasMany('Card', 'userId'),
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
      // rewardsCards: a.hasMany('Card', 'businessId')
      // logo: image in s3 bucket
    })
    .authorization(allow=> [
      allow.authenticated().to(['read']),
      allow.owner()
    ]),
  Card: a
    .model({
      points: a.integer(),
      tier: a.enum(['bronze', 'silver', 'gold', 'diamond', 'emerald']),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      userId: a.id(),
      // businessId: a.id(),
      user: a.belongsTo('UserProfile', 'userId'),
      // business: a.belongsTo('Business', 'businessId')
    })
    .authorization(allow => [
      // allow.authenticated().to(['read']),
      allow.ownerDefinedIn('userId')
    ]),
})
.authorization((allow) => [allow.resource(postConfirmation)]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});