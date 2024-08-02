import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validator middleware for user update
export const userUpdateValidator = [
    // Validate the username - optional, but if provided, must be a string
    body('username')
        .optional()
        .isString()
        .withMessage('Username must be a string'),

    // Validate the name - optional, but if provided, must be a string
    body('name')
        .optional()
        .isString()
        .withMessage('Name must be a string'),

    // Validate the email - optional, but if provided, must be a valid email address
    body('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email address'),

    // Validate the password - optional, but if provided, must meet the password criteria
    body('password')
        .optional()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    // Middleware to handle validation results
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Invalid input data',
                errors: errors.array(),
            });
        }

        next();
    }
];
