import { request } from "./index";
import type { IntegralRecord, IntegralStats, IntegralHistoryResponse } from "@/types/habit";

/**
 * 积分服务类
 */
export class IntegralService {
	/**
	 * 获取积分信息
	 * @returns Promise<any>
	 */
	static async getIntegralStats(): Promise<any> {
		return await request({
			url: "/user/integral",
			method: "GET"
		});
	}

	/**
	 * 获取积分记录
	 * @param page 页码，从1开始
	 * @param perPage 每页数量，默认20
	 * @returns Promise<any>
	 */
	static async getIntegralHistory(page: number = 1, perPage: number = 20): Promise<any> {
		return await request({
			url: "/user/integral/history",
			method: "GET",
			data: {
				page,
				per_page: perPage
			}
		});
	}
}
