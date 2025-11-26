import { ref, computed } from "vue";
import { request } from "../service";
import { parse } from "../utils";
import type { TaskInfo, TaskStats } from "@/types/habit";

export class Task {
	/**
	 * 任务列表，响应式对象
	 */
	tasks = ref<TaskInfo[]>([]);

	/**
	 * 当前选中的任务
	 */
	currentTask = ref<TaskInfo | null>(null);

	/**
	 * 任务统计
	 */
	taskStats = ref<TaskStats | null>(null);

	/**
	 * 获取任务列表（从服务端拉取最新信息并更新本地）
	 * @returns Promise<void>
	 */
	async getTasks() {
		try {
			const res: any = await request({ url: '/tasks', method: 'GET' });
			// 兼容两种返回：数组 或 分页对象 { data: TaskInfo[] }
			let tasks: TaskInfo[] = [];
			
			// 如果返回的是分页对象
			// #ifdef APP-ANDROID
			// 在 Android 上，使用索引访问
			try {
				const resObj = res as UTSJSONObject;
				const dataValue = resObj["data"] as any;
				if (dataValue != null && Array.isArray(dataValue)) {
					const dataArray = dataValue as any[];
					// 使用 parse 函数转换每个任务
					tasks = dataArray.map((item: any) => {
						const parsed = parse<TaskInfo>(item);
						return parsed != null ? parsed : item as TaskInfo;
					}).filter((item: TaskInfo | null) => item != null) as TaskInfo[];
				}
			} catch (e) {
				// 如果转换失败，尝试作为数组处理
				if (Array.isArray(res)) {
					tasks = res.map((item: any) => {
						const parsed = parse<TaskInfo>(item);
						return parsed != null ? parsed : item as TaskInfo;
					}).filter((item: TaskInfo | null) => item != null) as TaskInfo[];
				}
			}
			// #endif
			
			// #ifndef APP-ANDROID
			// 在其他平台上，直接访问属性
			const resAny = res as any;
			if (resAny != null && resAny.data != null && Array.isArray(resAny.data)) {
				const dataArray = resAny.data as any[];
				// 使用 parse 函数转换每个任务
				tasks = dataArray.map((item: any) => {
					const parsed = parse<TaskInfo>(item);
					return parsed != null ? parsed : item as TaskInfo;
				}).filter((item: TaskInfo | null) => item != null) as TaskInfo[];
			} else if (Array.isArray(res)) {
				// 如果返回的是数组
				tasks = res.map((item: any) => {
					const parsed = parse<TaskInfo>(item);
					return parsed != null ? parsed : item as TaskInfo;
				}).filter((item: TaskInfo | null) => item != null) as TaskInfo[];
			}
			// #endif
			
			this.setTasks(tasks);
		} catch (error) {
			console.error("获取任务列表失败:", error);
			// 获取任务列表失败，不抛出错误，保持现有列表
		}
	}

	/**
	 * 设置任务列表
	 * @param data 任务列表
	 */
	setTasks(data: TaskInfo[]) {
		this.tasks.value = Array.isArray(data) ? data : [];
	}

	/**
	 * 获取任务详情（从服务端拉取最新信息并更新本地）
	 * @param id 任务ID
	 * @returns Promise<TaskInfo>
	 */
	async getTask(id: number) {
		try {
			const data: any = await request({ url: `/tasks/${id}`, method: 'GET' });
			// 使用 parse 函数转换数据，在 Android 平台上会自动处理 UTSJSONObject
			const parsed = parse<TaskInfo>(data);
			const taskInfo = parsed != null ? parsed : data as TaskInfo;
			this.setCurrentTask(taskInfo);
			return this.currentTask.value as TaskInfo;
		} catch (error) {
			console.error("获取任务详情失败:", error);
			throw error;
		}
	}

	/**
	 * 设置当前任务
	 * @param data 任务对象
	 */
	setCurrentTask(data: TaskInfo | null) {
		this.currentTask.value = data;
	}

	/**
	 * 创建任务
	 * @param data 任务数据
	 */
	async createTask(data: any) {
		try {
			const result: any = await request({ url: '/tasks', method: 'POST', data });
			// 使用 parse 函数转换数据，在 Android 平台上会自动处理 UTSJSONObject
			// #ifdef APP-ANDROID
			// 在 Android 上，尝试使用 parse 函数
			try {
				const parsed = parse<TaskInfo>(result);
				if (parsed != null) {
					await this.getTasks();
					return parsed;
				}
			} catch (e) {
				// 如果 parse 失败，说明可能不是 UTSJSONObject，直接使用原始数据
				console.log('parse 失败，使用原始数据:', e);
			}
			// 如果 parse 返回 null 或失败，直接使用原始数据（可能是 UTSJSONObject）
			await this.getTasks();
			return result as any;
			// #endif
			
			// #ifndef APP-ANDROID
			// 在其他平台上，直接使用 parse 函数
			const parsed = parse<TaskInfo>(result);
			await this.getTasks();
			return parsed != null ? parsed : result as TaskInfo;
			// #endif
		} catch (error) {
			console.error("创建任务失败:", error);
			throw error;
		}
	}

	/**
	 * 更新任务
	 * @param id 任务ID
	 * @param data 更新数据
	 */
	async updateTask(id: number, data: any) {
		try {
			const res: any = await request({ url: `/tasks/${id}`, method: 'PUT', data });
			// 使用 parse 函数转换数据，在 Android 平台上会自动处理 UTSJSONObject
			let updatedTask: TaskInfo;
			
			// #ifdef APP-ANDROID
			// 在 Android 上，尝试使用 parse 函数
			try {
				const parsed = parse<TaskInfo>(res);
				updatedTask = parsed != null ? parsed : (res as any) as TaskInfo;
			} catch (e) {
				// 如果 parse 失败，直接使用原始数据，使用类型断言
				updatedTask = (res as any) as TaskInfo;
			}
			// #endif
			
			// #ifndef APP-ANDROID
			// 在其他平台上，直接使用 parse 函数
			const parsed = parse<TaskInfo>(res);
			updatedTask = parsed != null ? parsed : res as TaskInfo;
			// #endif
			
			// 更新本地数据
			const index = this.tasks.value.findIndex(task => task.id == id);
			if (index != -1) {
				this.tasks.value[index] = updatedTask;
			}
			
			// 如果当前任务被更新，也更新currentTask
			if (this.currentTask.value != null && this.currentTask.value.id == id) {
				this.currentTask.value = updatedTask;
			}
			return updatedTask;
		} catch (error) {
			console.error("更新任务失败:", error);
			throw error;
		}
	}

	/**
	 * 删除任务
	 * @param id 任务ID
	 */
	async deleteTask(id: number) {
		try {
			const res = await request({ url: `/tasks/${id}`, method: 'DELETE' });
			
			// 从本地列表中移除
			this.tasks.value = this.tasks.value.filter(task => task.id !== id);
			
			// 如果删除的是当前任务，清空currentTask
			if (this.currentTask.value != null && this.currentTask.value.id == id) {
				this.currentTask.value = null;
			}
			return res;
		} catch (error) {
			console.error("删除任务失败:", error);
			throw error;
		}
	}

	/**
	 * 获取任务统计（从服务端拉取最新信息并更新本地）
	 * @param id 任务ID
	 * @returns Promise<TaskStats>
	 */
	async getTaskStats(id: number) {
		try {
			const stats: any = await request({ url: `/tasks/${id}/stats`, method: 'GET' });
			// 使用 parse 函数转换数据，在 Android 平台上会自动处理 UTSJSONObject
			const parsed = parse<TaskStats>(stats);
			const taskStats = parsed != null ? parsed : stats as TaskStats;
			this.setTaskStats(taskStats);
			return this.taskStats.value as TaskStats;
		} catch (error) {
			console.error("获取任务统计失败:", error);
			throw error;
		}
	}

	/**
	 * 设置任务统计
	 * @param data 统计对象
	 */
	setTaskStats(data: TaskStats | null) {
		this.taskStats.value = data;
	}

	/**
	 * 移除任务列表
	 */
	removeTasks() {
		this.tasks.value = [];
	}

	/**
	 * 移除当前任务
	 */
	removeCurrentTask() {
		this.currentTask.value = null;
	}

	/**
	 * 移除任务统计
	 */
	removeTaskStats() {
		this.taskStats.value = null;
	}

	/**
	 * 清除当前任务
	 */
	clearCurrentTask() {
		this.currentTask.value = null;
		this.taskStats.value = null;
	}

	/**
	 * 清除所有任务数据
	 */
	clear() {
		this.removeTasks();
		this.clearCurrentTask();
	}

	/**
	 * 判断任务列表是否为空
	 * @returns boolean
	 */
	isNull() {
		return this.tasks.value.length === 0;
	}
}

/**
 * 单例任务对象，项目全局唯一
 */
export const task = new Task();

/**
 * 任务列表，响应式对象
 */
export const taskList = computed<TaskInfo[]>(() => task.tasks.value);

/**
 * 当前任务，响应式对象
 */
export const currentTask = computed<TaskInfo | null>(() => task.currentTask.value);

/**
 * 任务统计，响应式对象
 */
export const taskStats = computed<TaskStats | null>(() => task.taskStats.value);