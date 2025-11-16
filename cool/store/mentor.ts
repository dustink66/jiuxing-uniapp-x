import { ref, computed } from "vue";
import { request } from "../service";
import { parse } from "../utils";
import type { MentorInfo, StudentInfo } from "@/types/habit";

export class Mentor {
	/**
	 * 导师列表，响应式对象
	 */
	mentors = ref<MentorInfo[]>([]);

	/**
	 * 我的学员列表
	 */
	students = ref<StudentInfo[]>([]);

	/**
	 * 我绑定的导师（如果有）
	 */
	myMentor = ref<MentorInfo | null>(null);

	/**
	 * 我是否是导师
	 */
	isMentor: boolean = false;

	/**
	 * 当前选中的导师
	 */
	currentMentor = ref<MentorInfo | null>(null);

	/**
	 * 获取导师列表（从服务端拉取最新信息并更新本地）
	 * @returns Promise<MentorInfo[]>
	 */
	async getMentors(): Promise<MentorInfo[]> {
		try {
			const responseData: any = await request({ url: '/mentor/list', method: 'GET' });
			
			// 兼容两种返回：数组 或 分页对象 { data: MentorInfo[] }
			type ResponseData = {
				data?: MentorInfo[]
			}
			let mentors: MentorInfo[] = [];
			if (Array.isArray(responseData)) {
				// 如果是数组，需要解析每个元素
				mentors = responseData.map((item: any) => parse<MentorInfo>(item)!).filter((item: MentorInfo | null) => item != null) as MentorInfo[];
			} else if (responseData != null) {
				// 如果是对象，先解析对象，再获取 data 属性
				const parsed = parse<ResponseData>(responseData);
				if (parsed != null && parsed.data != null && Array.isArray(parsed.data)) {
					mentors = parsed.data.map((item: any) => parse<MentorInfo>(item)!).filter((item: MentorInfo | null) => item != null) as MentorInfo[];
				}
			}
			
			this.setMentors(mentors);
			return this.mentors.value;
		} catch (error) {
			console.error("获取导师列表失败:", error);
			throw error;
		}
	}

	/**
	 * 设置导师列表
	 * @param data 导师列表
	 */
	setMentors(data: MentorInfo[]) {
		this.mentors.value = Array.isArray(data) ? data : [];
	}

	/**
	 * 申请成为导师
	 * @returns Promise<void>
	 */
	async applyMentor() {
		try {
			await request({ url: '/mentor/apply', method: 'POST' });
		} catch (error) {
			console.error("申请成为导师失败:", error);
			throw error;
		}
	}

	/**
	 * 获取我的导师状态（从服务端拉取最新信息并更新本地）
	 * @returns Promise<MentorInfo | null>
	 */
	async getMyMentor(): Promise<MentorInfo | null> {
		try {
			const data = await request({ url: '/mentor/my', method: 'GET' });
			if (data != null) {
				const mentor = parse<MentorInfo>(data);
				if (mentor != null) {
					this.setMyMentor(mentor);
				} else {
					this.setMyMentor(null);
				}
			} else {
				this.setMyMentor(null);
			}
			return this.myMentor.value;
		} catch (error) {
			console.error("获取我的导师状态失败:", error);
			// 如果接口不存在或失败，设为默认值
			this.setMyMentor(null);
			return null;
		}
	}

	/**
	 * 设置我的导师
	 * @param data 导师对象或null
	 */
	setMyMentor(data: MentorInfo | null) {
		this.myMentor.value = data;
		this.isMentor = data != null;
	}

	/**
	 * 获取导师详情（从服务端拉取最新信息并更新本地）
	 * @param id 导师ID
	 * @returns Promise<MentorInfo | null>
	 */
	async getMentorDetail(id: string): Promise<MentorInfo | null> {
		try {
			const url = `/mentor/${id}`;
			const data = await request({ url, method: 'GET' });
			
			if (data != null) {
				// 使用 parse 函数转换数据，在 Android 平台上会自动处理 UTSJSONObject
				const parsedMentor = parse<MentorInfo>(data);
				if (parsedMentor != null) {
					this.currentMentor.value = parsedMentor;
				}
			}
			return this.currentMentor.value;
		} catch (error) {
			console.error("获取导师详情失败:", error);
			throw error;
		}
	}

	/**
	 * 绑定导师
	 * @param id 导师ID
	 * @returns Promise<void>
	 */
	async bindMentor(id: number) {
		try {
			await request({ url: `/mentor/${id}/bind`, method: 'POST' });
		} catch (error) {
			console.error("绑定导师失败:", error);
			throw error;
		}
	}

	/**
	 * 解绑导师
	 * @param id 导师ID
	 * @returns Promise<void>
	 */
	async unbindMentor(id: number) {
		try {
			await request({ url: `/mentor/${id}/unbind`, method: 'POST' });
		} catch (error) {
			console.error("解绑导师失败:", error);
			throw error;
		}
	}

	/**
	 * 获取我的学员（从服务端拉取最新信息并更新本地）
	 * @returns Promise<StudentInfo[]>
	 */
	async getStudents(): Promise<StudentInfo[]> {
		try {
			const responseData: any = await request({ url: '/mentor/students', method: 'GET' });
			
			// 兼容两种返回：数组 或 分页对象 { data: StudentInfo[] }
			type StudentResponseData = {
				data?: StudentInfo[]
			}
			let students: StudentInfo[] = [];
			if (Array.isArray(responseData)) {
				// 如果是数组，需要解析每个元素
				students = responseData.map((item: any) => parse<StudentInfo>(item)!).filter((item: StudentInfo | null) => item != null) as StudentInfo[];
			} else if (responseData != null) {
				// 如果是对象，先解析对象，再获取 data 属性
				const parsed = parse<StudentResponseData>(responseData);
				if (parsed != null && parsed.data != null && Array.isArray(parsed.data)) {
					students = parsed.data.map((item: any) => parse<StudentInfo>(item)!).filter((item: StudentInfo | null) => item != null) as StudentInfo[];
				}
			}
			
			this.setStudents(students);
			return this.students.value;
		} catch (error) {
			console.error("获取学员列表失败:", error);
			throw error;
		}
	}

	/**
	 * 设置学员列表
	 * @param data 学员列表
	 */
	setStudents(data: StudentInfo[]) {
		this.students.value = Array.isArray(data) ? data : [];
	}

	/**
	 * 学员毕业（导师用）
	 * @param studentId 学员ID
	 * @returns Promise<void>
	 */
	async graduateStudent(studentId: number) {
		try {
			await request({ url: `/mentor/${studentId}/graduate`, method: 'POST' });
			await this.getStudents();
		} catch (error) {
			console.error("学员毕业失败:", error);
			throw error;
		}
	}

	/**
	 * 设置当前导师
	 * @param data 导师对象
	 */
	setCurrentMentor(data: MentorInfo | null) {
		this.currentMentor.value = data;
	}

	/**
	 * 移除导师列表
	 */
	removeMentors() {
		this.mentors.value = [];
	}

	/**
	 * 移除学员列表
	 */
	removeStudents() {
		this.students.value = [];
	}

	/**
	 * 移除我的导师
	 */
	removeMyMentor() {
		this.myMentor.value = null;
		this.isMentor = false;
	}

	/**
	 * 清除当前导师
	 */
	clearCurrentMentor() {
		this.currentMentor.value = null;
	}

	/**
	 * 清除所有导师数据
	 */
	clear() {
		this.removeMentors();
		this.removeStudents();
		this.removeMyMentor();
		this.clearCurrentMentor();
	}

	/**
	 * 判断导师列表是否为空
	 * @returns boolean
	 */
	isNull() {
		return this.mentors.value.length === 0;
	}

	/**
	 * 判断学员列表是否为空
	 * @returns boolean
	 */
	isStudentsNull() {
		return this.students.value.length === 0;
	}
}

/**
 * 单例导师对象，项目全局唯一
 */
export const mentor = new Mentor();

/**
 * 导师列表，响应式对象
 */
export const mentorList = computed<MentorInfo[]>(() => mentor.mentors.value);

/**
 * 学员列表，响应式对象
 */
export const studentList = computed<StudentInfo[]>(() => mentor.students.value);

/**
 * 当前导师，响应式对象
 */
export const currentMentor = computed<MentorInfo | null>(() => mentor.currentMentor.value);