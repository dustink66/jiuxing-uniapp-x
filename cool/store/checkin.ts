import { ref, computed } from "vue";
import { request } from "../service";
import type { CheckinInfo, CheckinRecordStats } from "@/types/habit";


export class Checkin {
	/**
	 * 打卡记录列表，响应式对象
	 */
	checkins = ref<CheckinInfo[]>([]);

	/**
	 * 获取打卡记录（从服务端拉取最新信息并更新本地）
	 * @returns Promise<void>
	 */
	async getCheckins() {
		await request({ url: '/checkins', method: 'GET' })
			.then((res) => {
				if (res != null) {
					const checkins = res as CheckinInfo[];
					this.setCheckins(checkins);
				}
			})
			.catch(() => {
				// 获取打卡记录失败
			});
	}

	/**
	 * 设置打卡记录
	 * @param data 打卡记录列表
	 */
	setCheckins(data: CheckinInfo[]) {
		this.checkins.value = Array.isArray(data) ? data : [];
	}

	/**
	 * 打卡
	 * @param data 打卡数据
	 * @returns Promise<any>
	 */
	async createCheckin(data: any) {
		try {
			const result = await request({ url: '/checkins', method: 'POST', data });
			await this.getCheckins();
			return result;
		} catch (error) {
			console.error("打卡失败:", error);
			throw error;
		}
	}

	/**
	 * 移除打卡记录
	 */
	removeCheckins() {
		this.checkins.value = [];
	}

	/**
	 * 清除所有打卡数据
	 */
	clear() {
		this.removeCheckins();
	}

	/**
	 * 判断打卡记录是否为空
	 * @returns boolean
	 */
	isNull() {
		return this.checkins.value.length === 0;
	}
}

/**
 * 单例打卡对象，项目全局唯一
 */
export const checkin = new Checkin();

/**
 * 打卡记录列表，响应式对象
 */
export const checkinList = computed<CheckinInfo[]>(() => checkin.checkins.value);