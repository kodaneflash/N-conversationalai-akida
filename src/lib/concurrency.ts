import redis from './redis';
import { randomUUID } from 'crypto';

const ACTIVE_KEY = 'tavus:active';
const RES_PREFIX = 'tavus:res:';
const CONV_PREFIX = 'tavus:conv:';
const MAX_STREAMS = 3;

export async function reserveSlot(ttlSeconds = 120): Promise<string | null> {
  const reservationId = randomUUID();
  const script = `
    local active = tonumber(redis.call('GET', KEYS[1]) or '0')
    local max = tonumber(ARGV[1])
    if active < max then
      redis.call('INCR', KEYS[1])
      redis.call('SET', KEYS[2], 1, 'EX', tonumber(ARGV[2]))
      return 1
    else
      return 0
    end
  `;
  const ok = await redis.eval(script, [ACTIVE_KEY, RES_PREFIX + reservationId], [
    String(MAX_STREAMS),
    String(ttlSeconds),
  ]);
  return ok === 1 ? reservationId : null;
}

export async function promoteReservation(
  reservationId: string,
  conversationId: string,
  ttlSeconds = 15 * 60
): Promise<void> {
  const script = `
    if redis.call('GET', KEYS[1]) then
      redis.call('DEL', KEYS[1])
      redis.call('SET', KEYS[2], 1, 'EX', tonumber(ARGV[1]))
      return 1
    else
      return 0
    end
  `;
  await redis.eval(script, [RES_PREFIX + reservationId, CONV_PREFIX + conversationId], [
    String(ttlSeconds),
  ]);
}

export async function releaseByReservation(reservationId: string): Promise<void> {
  const script = `
    if redis.call('DEL', KEYS[1]) == 1 then
      local active = tonumber(redis.call('GET', KEYS[2]) or '0')
      if active > 0 then redis.call('DECR', KEYS[2]) end
      return 1
    end
    return 0
  `;
  await redis.eval(script, [RES_PREFIX + reservationId, ACTIVE_KEY], []);
}

export async function releaseByConversation(conversationId: string): Promise<void> {
  const script = `
    if redis.call('DEL', KEYS[1]) == 1 then
      local active = tonumber(redis.call('GET', KEYS[2]) or '0')
      if active > 0 then redis.call('DECR', KEYS[2]) end
      return 1
    end
    return 0
  `;
  await redis.eval(script, [CONV_PREFIX + conversationId, ACTIVE_KEY], []);
}


