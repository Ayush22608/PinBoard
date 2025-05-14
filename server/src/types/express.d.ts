declare namespace Express {
  interface Request {
    user?: {
      id: string;
      role: string;
      isAdmin: boolean;
    };
    file?: Multer.File;
  }
} 