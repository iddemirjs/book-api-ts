import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validator middleware for login
export const loginValidator = [
    // Validate email - must be a valid email address
    body('email')
        .isEmail()
        .withMessage('Invalid email address'),

    // Validate password - must be provided and at least 6 characters long
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    // Middleware to handle validation results
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: "Bad Request",
                message: "Invalid input data",
                errors: errors.array(),
            });
        }

        next();
    }
];

// Validator middleware for register
export const registerValidator = [
    // Validate email - must be a valid email address
    body('email')
        .isEmail()
        .withMessage('Invalid email address'),

    // Validate password - must be provided and at least 6 characters long
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    // Validate username - must be provided and at least 3 characters long
    body('username')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long'),

    // Validate name - must be provided and at least 3 characters long
    body('name')
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long'),

    // Middleware to handle validation results
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: "Bad Request",
                message: "Invalid input data",
                errors: errors.array(),
            });
        }

        next();
    }
];
