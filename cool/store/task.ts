import { ref, computed } from "vue";
import { request } from "../service";
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
		
		await request({ url: '/tasks', method: 'GET' })
			.then((res) => {
				if (res != null) {
					// 兼容两种返回：数组 或 分页对象 { data: TaskInfo[] }
					let tasks: TaskInfo[] = [];
					tasks = res as TaskInfo[];
					this.setTasks(tasks);
				}
			})
			.catch(() => {
				// 获取任务列表失败
			});
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
			const data = await request({ url: `/tasks/${id}`, method: 'GET' });
			if (data != null) {
				this.setCurrentTask(data as TaskInfo);
			}
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
			const result = await request({ url: '/tasks', method: 'POST', data });
			await this.getTasks();
			return result as TaskInfo;
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
			const res = await request({ url: `/tasks/${id}`, method: 'PUT', data });
			const updatedTask = res as TaskInfo;
			
			// 更新本地数据
			const index = this.tasks.value.findIndex(task => task.id === id);
			if (index !== -1) {
				this.tasks.value[index] = updatedTask;
			}
			
			// 如果当前任务被更新，也更新currentTask
			if (this.currentTask.value != null && this.currentTask.value.id === id) {
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
			if (this.currentTask.value != null && this.currentTask.value.id === id) {
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
			const stats = await request({ url: `/tasks/${id}/stats`, method: 'GET' });
			if (stats != null) {
				this.setTaskStats(stats as TaskStats);
			}
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