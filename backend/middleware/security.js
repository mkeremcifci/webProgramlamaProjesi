import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import csrf from 'csurf';
import cors from 'cors';

// Rate limiter yapılandırma
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Çok fazla istek gönderdiniz, lütfen daha sonra tekrar deneyin.'
});

// CORS yapılandırma
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token']
};

// CSRF koruma
const csrfProtection = csrf({ cookie: true });

// Güvenlik middleware'lerini dışa aktar
export const securityMiddleware = [
    helmet(), 
    cors(corsOptions), 
    limiter, 
    csrfProtection 
];

// XSS koruması için input sanitization
export const sanitizeInput = (req, res, next) => {
    if (req.body) {
        Object.keys(req.body).forEach(key => {
            if (typeof req.body[key] === 'string') {
                req.body[key] = req.body[key]
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#x27;')
                    .replace(/\//g, '&#x2F;');
            }
        });
    }
    next();
};