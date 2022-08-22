// src/types/Auth.ts
export interface TokenData {
  access_token: string
  expires_in: number
  type: string
}

export interface LoginParams {
  username: string
  password: string
}
