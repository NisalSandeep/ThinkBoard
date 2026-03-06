const rateLimit = require("../config/upstash");


const rateLimiter = async (req, res, next) => {
    
    try {
        const { success } = await rateLimit.limit(req.ip);
        if (!success) {
            return res.status(429).json({ message: "Too many requests" });
        }
        next();
    } catch (error) {
        console.error("Error in rate limiter middleware:", error);
        next(error);
    }
};

module.exports = rateLimiter;