// src/api/auth/login.ts
import { post } from '@/utils/http'
import { TokenData, LoginParams } from '@/types/Auth'

// 登录服务接口
export const ServeLogin = (data: LoginParams) =>
  post<TokenData>('/api/v1/auth/login', data)
