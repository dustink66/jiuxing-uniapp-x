import { request } from "./index";
import type { 
	LoginForm, 
	RegisterForm, 
	ResetPasswordForm, 
	SendCodeForm, 
	LoginResponse, 
	AuthToken 
} from "@/types";

/**
 * 认证服务类
 */
export class AuthService {
	/**
	 * 发送验证码
	 * @param data 发送验证码参数
	 * @returns Promise<any>
	 */
	static async sendCode(data: SendCodeForm) {
		return await request({
			url: "/auth/send-code",
			method: "POST",
			data
		});
	}

	/**
	 * 用户注册
	 * @param data 注册参数
	 * @returns Promise<any>
	 */
	static async register(data: RegisterForm): Promise<any> {
		return await request({
			url: "/auth/register",
			method: "POST",
			data
		});
	}

	/**
	 * 用户登录
	 * @param data 登录参数
	 * @returns Promise<any>
	 */
	static async login(data: LoginForm): Promise<any> {
		return await request({
			url: "/auth/login",
			method: "POST",
			data
		});
	}

	/**
	 * 重置密码
	 * @param data 重置密码参数
	 * @returns Promise<any>
	 */
	static async resetPassword(data: ResetPasswordForm) {
		return await request({
			url: "/auth/reset-password",
			method: "POST",
			data
		});
	}

	/**
	 * 刷新Token
	 * @returns Promise<AuthToken>
	 */
	static async refreshToken(): Promise<AuthToken> {
		return await request({
			url: "/auth/refresh",
			method: "POST"
		});
	}

	/**
	 * 退出登录
	 * @returns Promise<any>
	 */
	static async logout() {
		return await request({
			url: "/auth/logout",
			method: "POST"
		});
	}
}
