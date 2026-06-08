const {Ratelimit} = require('@upstash/ratelimit');
const {Redis} = require('@upstash/redis');

const hasRedisConfig = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

// create a ratelimiter that allows 100 requests per 60 seconds when Upstash is configured
const ratelimit = hasRedisConfig
    ? new Ratelimit({
            redis: Redis.fromEnv(),
            limiter: Ratelimit.slidingWindow(100, "60s"),
        })
    : {
            limit: async () => ({ success: true }),
        };

module.exports = ratelimit;

