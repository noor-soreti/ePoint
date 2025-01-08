import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
// import { sayHello } from './functions/say-hello/resource';
// import { purchaseItem } from './functions/purchase-item/resource';

defineBackend({
  auth,
  data,

  // purchaseItem
});
