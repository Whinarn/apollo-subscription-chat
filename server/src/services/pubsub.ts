import { RedisPubSub } from 'graphql-redis-subscriptions';

const pubsub = new RedisPubSub();

export function getAsyncIterator<TResult>(triggers: string | string[]) {
  return pubsub.asyncIterator<TResult>(triggers);
}

export function publish<TMessage>(trigger: string, message: TMessage) {
  pubsub.publish(trigger, message);
}
