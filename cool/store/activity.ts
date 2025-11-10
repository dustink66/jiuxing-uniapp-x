import { ref, computed } from "vue";
import { request } from "../service";
import { parse } from "../utils";
import type { ActivityInfo } from "@/types/habit";

export class Activity {
	/**
	 * 活动列表，响应式对象
	 */
	activities = ref<ActivityInfo[]>([]);

	/**
	 * 我的活动列表
	 */
	myActivities = ref<ActivityInfo[]>([]);

	/**
	 * 当前选中的活动
	 */
	currentActivity = ref<any | null>(null);

	/**
	 * 获取活动列表（从服务端拉取最新信息并更新本地）
	 * @param params 查询参数
	 * @returns Promise<void>
	 */
	async getActivities() {
		await request({ url: '/activities', method: 'GET' })
			.then((res) => {
				if (res != null) {
					this.setActivities(res);
				}
			})
			.catch(() => {
				// 获取活动列表失败
			});
	}

	/**
	 * 设置活动列表
	 * @param data 活动列表
	 */
	setActivities(data: any) {
		if (data == null) {
			this.activities.value = [];
			return;
		}
		
		// 确保 data 是数组
		if (!Array.isArray(data)) {
			this.activities.value = [];
			return;
		}
		
		// 在安卓平台上，直接使用数据，不进行类型转换
		// #ifdef APP-ANDROID
		this.activities.value = data as ActivityInfo[];
		// #endif
		
		// #ifndef APP-ANDROID
		// 其他平台进行类型转换
		this.activities.value = data as ActivityInfo[];
		// #endif
	}

	/**
	 * 获取我的活动（从服务端拉取最新信息并更新本地）
	 * @returns Promise<void>
	 */
	async getMyActivities() {
		await request({ url: '/activities/my', method: 'GET' })
			.then((res) => {
				if (res != null) {
					this.setMyActivities(res);
				}
			})
			.catch(() => {
				// 获取我的活动失败
			});
	}

	/**
	 * 设置我的活动列表
	 * @param data 活动列表
	 */
	setMyActivities(data: any) {
		if (data == null) {
			this.myActivities.value = [];
			return;
		}
		
		// 确保 data 是数组
		if (!Array.isArray(data)) {
			this.myActivities.value = [];
			return;
		}
		
		// 在安卓平台上，直接使用数据，不进行类型转换
		// #ifdef APP-ANDROID
		this.myActivities.value = data as ActivityInfo[];
		// #endif
		
		// #ifndef APP-ANDROID
		// 其他平台进行类型转换
		this.myActivities.value = data as ActivityInfo[];
		// #endif
	}

	/**
	 * 获取活动详情（从服务端拉取最新信息并更新本地）
	 * @param id 活动ID
	 * @returns Promise<any>
	 */
	async getActivity(id: any) {
		try {
			const url = `/activities/${id}`;
			console.log("获取活动详情 - 请求参数:", { url, method: 'GET', id });
			
			const data = await request({ url, method: 'GET' });
			
			console.log("获取活动详情 - 返回结果:", data);
			console.log("获取活动详情 - 返回结果类型:", typeof data);
			
			if (data != null) {
				// #ifdef APP-ANDROID
				// Android 平台：直接赋值 UTSJSONObject，避免类型转换错误
				console.log("获取活动详情 - Android平台，直接赋值数据");
				this.currentActivity.value = data as any;
				console.log("获取活动详情 - 赋值后 currentActivity.value 类型:", typeof this.currentActivity.value);
				// #endif
				// #ifndef APP-ANDROID
				// 其他平台：使用 parse 转换
				console.log("获取活动详情 - 其他平台，使用parse转换");
				const parsedActivity = parse<ActivityInfo>(data);
				if (parsedActivity != null) {
					this.currentActivity.value = parsedActivity;
				}
				// #endif
			}
			console.log("获取活动详情 - 准备返回，currentActivity.value:", this.currentActivity.value);
			console.log("获取活动详情 - 返回类型检查");
			return this.currentActivity.value as any;
		} catch (error) {
			console.error("获取活动详情失败:", error);
			throw error;
		}
	}

	/**
	 * 设置当前活动
	 * @param data 活动对象
	 */
	setCurrentActivity(data: any) {
		if (data == null) {
			this.currentActivity.value = null;
			return;
		}
		
		// 在安卓平台上，直接使用数据，不进行类型转换
		// #ifdef APP-ANDROID
		this.currentActivity.value = data as any;
		// #endif
		
		// #ifndef APP-ANDROID
		// 其他平台进行类型转换
		this.currentActivity.value = data as ActivityInfo;
		// #endif
	}

	/**
	 * 报名活动
	 * @param id 活动ID
	 * @returns Promise<void>
	 */
	async registerActivity(id: any) {
		try {
			await request({ url: `/activities/${id}/register`, method: 'POST' });
			await this.getActivities();
			await this.getMyActivities();
		} catch (error) {
			console.error("报名活动失败:", error);
			throw error;
		}
	}

	/**
	 * 取消报名
	 * @param id 活动ID
	 * @returns Promise<void>
	 */
	async unregisterActivity(id: any) {
		try {
			await request({ url: `/activities/${id}/unregister`, method: 'POST' });
			await this.getActivities();
			await this.getMyActivities();
		} catch (error) {
			console.error("取消报名失败:", error);
			throw error;
		}
	}

	/**
	 * 活动签到
	 * @param id 活动ID
	 * @returns Promise<void>
	 */
	async checkinActivity(id: any) {
		try {
			await request({ url: `/activities/${id}/checkin`, method: 'POST' });
			await this.getMyActivities();
		} catch (error) {
			console.error("活动签到失败:", error);
			throw error;
		}
	}

	/**
	 * 移除活动列表
	 */
	removeActivities() {
		this.activities.value = [];
	}

	/**
	 * 移除我的活动列表
	 */
	removeMyActivities() {
		this.myActivities.value = [];
	}

	/**
	 * 清除当前活动
	 */
	clearCurrentActivity() {
		this.currentActivity.value = null;
	}

	/**
	 * 清除所有活动数据
	 */
	clear() {
		this.removeActivities();
		this.removeMyActivities();
		this.clearCurrentActivity();
	}

	/**
	 * 判断活动列表是否为空
	 * @returns boolean
	 */
	isNull() {
		return this.activities.value.length === 0;
	}

	/**
	 * 判断我的活动列表是否为空
	 * @returns boolean
	 */
	isMyActivitiesNull() {
		return this.myActivities.value.length === 0;
	}
}

/**
 * 单例活动对象，项目全局唯一
 */
export const activity = new Activity();

/**
 * 活动列表，响应式对象
 */
export const activityList = computed<ActivityInfo[]>(() => activity.activities.value);

/**
 * 我的活动列表，响应式对象
 */
export const myActivityList = computed<ActivityInfo[]>(() => activity.myActivities.value);

/**
 * 当前活动，响应式对象
 */
export const currentActivity = computed(() => {
	const value = activity.currentActivity.value;
	if (value != null) {
		return value as any;
	}
	return null as any;
});