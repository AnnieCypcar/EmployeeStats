import { NextFunction, Request, Response } from 'express';

export const isAuth = (options: { authRequired: boolean }) => {
  const { authRequired } = options;
  return (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if (auth === 'password' || !authRequired) {
      next();
    } else {
      res.status(401);
      res.send('Access forbidden');
    }
  };
};
