"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const globalForPrisma = global;
// Use a single PrismaClient instance in development and production
exports.prisma = globalForPrisma.prisma ||
    new client_1.PrismaClient({
        log: ['query', 'info', 'warn', 'error'], // Optional: Add logging for debugging
    });
// Prevent multiple instances in development
if (process.env.NODE_ENV !== 'production')
    globalForPrisma.prisma = exports.prisma;
exports.default = exports.prisma;
