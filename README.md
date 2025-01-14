# Serverless Web App

ePoint is a simple serverless web app that enables users to collect and redeem points from retail businesses in order to encourage customer loyalty. I built this app to practice designing and implementing cloud computing solutions. The app presents users with an React-based user interface with Amplify. The app interacts with a GraphQL web service on the backend with AppSync, Lambda, and DynamoDB to submit requests and process user transactions. Users must register with the service and log in before requesting rides; Cognito is used for authentication.

# App Architecture

![architecture image](public/epoint-architecture.png)

## Dynamic Web Hosting

The app’s dynamic web content including React and images is hosted by Amplify. Amplify exposes the public URL and loads the dynamic web content in the user’s browser. I connected my source code from my Git repo to Amplify to enable continuous deployment!

## User Management

I leveraged Cognito for custom authentication and authorization for user management to secure the app’s backend API. I created a user pool to manage the app’s user accounts. Users must provide an email address and password to register. On submission, Cognito will send a confirmation email with a verification code to the email address. After confirming their account, a new user record is created in DynamoDB and users are able to sign in. Once a user is signed in, the browser receives a set of JSON Web Tokens (JWT) issued by Cognito to authenticate users and grant access to resources among other things

- Access Token: Contains information about the authenticated user. This token's purpose is to authorize API operations
- ID Token: Contains claims about the identity of the authenticated user. The ID token can be used inside applications to provide information such as user `name`, `email` and `phone number` among other things.
- Refresh Token: This token is used to retrieve access tokens once they expire

## Serverless Backend

A serverless architecture is a way to build and run applications and services without having to manage infrastructure. Server management is abstracted by AWS so that developers can focus on the core product. I used Lambda and DynamoDB, a key-value store, to build the backend process for handling requests. Lambda runs code in response to an event trigger; triggers are often another AWS service such as API Gateway. When a user makes requests a request, a Lambda function is triggered to handle the event such as collecting points after a transaction or redeeming points. Also, the function records the request in a DynamoDB table then responds to the app with details about the transaction. 
<!-- 
```
code snippet
```

## RESTful API

Finally, I used API Gateway to expose my Lambda function as a RESTful API secured using the Cognito user pool. The browser sends and receives data over API Gateway. Authenticated users make a request by selecting their either to collect or redeem points at checkout.

```
code snippet
``` -->