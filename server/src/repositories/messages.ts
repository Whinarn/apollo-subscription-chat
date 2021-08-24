import { QueryOutput } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { client } from '../services/dynamodb';
import { Message } from '../models/messages';

const TABLE_NAME = 'messages';
const GET_MESSAGES_LIMIT = 100;

interface DynamoMessage extends Message {
  roomId: string;
  sortId: string;
}

export async function createTables(): Promise<void> {
  await client.createTable({
    TableName: TABLE_NAME,
    AttributeDefinitions: [
      {
        AttributeName: 'roomId',
        AttributeType: 'S'
      },
      {
        AttributeName: 'sortId',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'roomId',
        KeyType: 'HASH'
      },
      {
        AttributeName: 'sortId',
        KeyType: 'RANGE'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  });
}

export async function getMessages(roomId: string): Promise<Message[]> {
  const messages: Message[] = [];
  let hasMore = true;
  let lastEvaluatedKey = undefined;
  let remainingCount = GET_MESSAGES_LIMIT;
  let response: QueryOutput;

  while (hasMore) {
    response = await client.query({
      TableName: TABLE_NAME,
      Select: 'ALL_ATTRIBUTES',
      ScanIndexForward: false,
      Limit: remainingCount,
      KeyConditionExpression: '#roomId=:roomId',
      ExpressionAttributeNames: {
        '#roomId': 'roomId',
      },
      ExpressionAttributeValues: {
        ':roomId': {
          S: roomId,
        }
      },
      ExclusiveStartKey: lastEvaluatedKey,
    });

    if (response.Items) {
      const unmarshalledMessages = response.Items.map<Message>((item) => unmarshall(item) as Message);
      messages.push(...unmarshalledMessages);
      remainingCount -= response.Items.length;
    }

    lastEvaluatedKey = response.LastEvaluatedKey;
    hasMore = !!lastEvaluatedKey && remainingCount > 0;
  }

  return messages;
}

export async function createMessage(roomId: string, message: Message): Promise<void> {
  const messageId = uuidv4();
  const dynamoMessage: DynamoMessage = {
    ...message,
    roomId,
    sortId: `${message.time}_${messageId}`
  };
  const marshalledItem = marshall(dynamoMessage);
  await client.putItem({
    TableName: TABLE_NAME,
    Item: marshalledItem
  });
}
