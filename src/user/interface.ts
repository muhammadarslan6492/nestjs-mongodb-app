export interface SignupResponse {
  success: boolean;
  statusCode: number;
  message: string;
  user: {
    _id: string;
  };
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}
