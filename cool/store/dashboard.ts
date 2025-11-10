// 自律习惯养成APP - 仪表板Store
import { ref, computed } from "vue";
import { request } from "../service";
import type { DashboardData } from "@/types/habit";
import { task } from "./task";
import { checkin } from "./checkin";
import { activity } from "./activity";
import { mentor } from "./mentor";

export class Dashboard {
	/**
	 * 仪表板数据，响应式对象
	 */
	dashboardData = ref<DashboardData | null>(null);
	
	/**
	 * 获取仪表板数据（从服务端拉取最新信息并更新本地）
	 * @returns Promise<DashboardData>
	 */
	async getDashboard() {
		try {
			const data = await request({ url: '/user/dashboard', method: 'GET' });
			if (data != null) {
				this.setDashboard(data as DashboardData);
			}
			return this.dashboardData.value as DashboardData;
		} catch (error) {
			console.error("获取仪表板数据失败:", error);
			throw error;
		}
	}

	/**
	 * 设置仪表板数据
	 * @param data 仪表板数据对象
	 */
	setDashboard(data: DashboardData | null) {
		this.dashboardData.value = data;
	}
	
	/**
	 * 刷新所有数据
	 * @returns Promise<void>
	 */
	async refreshAll() {
		try {
			const promises: Array<Promise<any>> = [
				task.getTasks(),
				checkin.getCheckins(),
				activity.getActivities(),
				activity.getMyActivities(),
				mentor.getMentors(),
				this.getDashboard()
			];
			await Promise.all<any>(promises);
		} catch (error) {
			console.error("刷新数据失败:", error);
		}
	}

	/**
	 * 移除仪表板数据
	 */
	removeDashboard() {
		this.dashboardData.value = null;
	}

	/**
	 * 清除仪表板数据
	 */
	clearDashboard() {
		this.removeDashboard();
	}

	/**
	 * 清除所有仪表板数据
	 */
	clear() {
		this.clearDashboard();
	}

	/**
	 * 判断仪表板数据是否为空
	 * @returns boolean
	 */
	isNull() {
		return this.dashboardData.value == null;
	}
}

/**
 * 单例仪表板对象，项目全局唯一
 */
export const dashboard = new Dashboard();

/**
 * 仪表板数据，响应式对象
 */
export const dashboardData = computed<DashboardData | null>(() => dashboard.dashboardData.value);
