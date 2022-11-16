import { NextFunction, Request, Response } from 'express';

export function userValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, password } = req.body;

  const uppercaseLettersRegex = /[A-Z]/;
  const numbersRegex = /[0-9]/;

  if (username.length < 3) {
    throw new Error('Username must be at least 3 characters long');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }

  if (!uppercaseLettersRegex.test(password)) {
    throw new Error('The password must have at least 1 uppercase letter');
  }

  if (!numbersRegex.test(password)) {
    throw new Error('The password must have at least 1 number');
  }

  return next();
}
