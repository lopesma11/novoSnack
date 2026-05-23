declare global {
  namespace Express {
    interface Request {
      user?: {
        sub: string;
        name: string;
      };
    }
  }
}

export {};
