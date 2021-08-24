import { DynamoDB } from '@aws-sdk/client-dynamodb';

export const client = new DynamoDB({
  endpoint: 'http://localhost:8000'
});
