import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import redis from '@/lib/redis';

const WINDOW_SECONDS = 60;
const MAX_REQUESTS = 5;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (req.method === 'POST' && pathname === '/api/tavus/new') {
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const ip = (forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown');
    const keyBase = `rl:tavus:new:${ip}`;
    const nowSlot = Math.floor(Date.now() / 1000 / WINDOW_SECONDS);
    const key = `${keyBase}:${nowSlot}`;

    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, WINDOW_SECONDS);
    }
    if (count > MAX_REQUESTS) {
      return NextResponse.json({ error: 'RATE_LIMIT' }, { status: 429 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/tavus/new'],
};


