import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from "express";

export const validateCreateBook: any = [
    body('name').isString().notEmpty().withMessage('Name is required and should be a string'),
    body('description').isString().optional(),
    body('imageUrl').isString().optional(),
    (req: Request, res: Response, next: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateBorrowBook: any = [
    param('bookId').isInt().withMessage('Book ID must be an integer'),
    body('day').isInt().notEmpty().withMessage('Day is required and should be a integer'),
    (req: Request, res: Response, next:any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const returnBookValidator: any = [
    // Validate the bookId parameter
    param('bookId')
        .isInt({ gt: 0 })
        .withMessage('Book ID must be a positive integer'),

    // Validate the request body
    body('rating')
        .optional()
        .isInt({ min: 1, max: 5 }) // Assuming rating is between 1 and 5
        .withMessage('Rating must be an integer between 1 and 5'),

    // Middleware to handle validation results
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'Bad Request',
                message: 'Invalid input data',
                errors: errors.array(),
            });
        }

        next();
    }
];
