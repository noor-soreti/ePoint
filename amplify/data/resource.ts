import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { postConfirmation } from "../auth/post-confirmation/resource";
// import { sayHello } from "../functions/say-hello/resource";
// import { purchaseItem } from "../functions/purchase-item/resource";
import { handler } from "../auth/post-confirmation/handler";

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
      businessName: a.string().required(),
      type: a.enum(['coffee_restaurant', 'clothing', 'grocery', 'health', 'beauty', 'electronics', 'fitness_wellness', 'books_stationary', 'jewelry_accessories', 'pharmacy_health']),
      description: a.string(),
      location: a.string(),
      phoneNumber: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime().authorization(allow => [allow.owner()]),
      rewardsCards: a.hasMany('Card', 'businessId'),
      salesItems: a.hasMany('SalesItem', 'businessId')
      // logo: image in s3 bucket
    })
    .authorization(allow=> [
      allow.authenticated().to(['read']),
      allow.owner()
    ]),
  SalesItem: a
    .model({
      name: a.string().required(),
      price: a.float().required(),
      description: a.string(),
      businessId: a.string().required(), // Reference to the associated Business model
      createdAt: a.datetime(),
      type: a.enum(['beverage', 'food', 'clothing', 'stationary']),
      updatedAt: a.datetime().authorization(allow => [allow.owner()]),
      business: a.belongsTo("Business", "businessId")
    })
      .authorization(allow => [
        allow.authenticated()
      ]),
  Card: a
    .model({
      title: a.string(),
      points: a.integer(),
      tier: a.enum(['bronze', 'silver', 'gold', 'diamond', 'emerald']),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
      userId: a.id(),
      businessId: a.id(),
      user: a.belongsTo('UserProfile', 'userId'),
      business: a.belongsTo('Business', 'businessId')
    })
    .authorization(allow => [
      allow.authenticated().to(['read']),
      allow.ownerDefinedIn('userId')
    ]),
    // sayHello: a
    //   .query()
    //   .arguments({
    //     name: a.string()
    //   })
    //   .returns(a.string())
    //   .handler(a.handler.function(sayHello))
    //   .authorization((allow) => allow.authenticated()),
    // purchaseItem: a
    //   .query()
    //   .arguments({
    //     businessId: a.string(),
    //     description: a.string(),
    //     itemId: a.string(),
    //     name: a.string(),
    //     price: a.float(),
    //   })
    //   .returns(a.string())
    //   .handler(a.handler.function(purchaseItem))
    //   .authorization((allow) => allow.authenticated())
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