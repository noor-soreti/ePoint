import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
// import { createNewUser } from './functions/create-new-user/resource'

defineBackend({
  auth,
  data,
  // createNewUser
});
