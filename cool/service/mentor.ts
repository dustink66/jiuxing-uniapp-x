import { request } from "./index";
import type { MentorInfo, MentorApplyForm, MentorProfileForm, MyMentor, MyMentorItem, StudentInfo } from "@/types/habit";

/**
 * 导师服务类
 */
export class MentorService {
	/**
	 * 申请成为导师
	 * @param data 申请参数
	 * @returns Promise<any>
	 */
	static async apply(data: MentorApplyForm) {
		return await request({
			url: "/mentor/apply",
			method: "POST",
			data
		});
	}

	/**
	 * 获取导师列表
	 * @returns Promise<MentorInfo[]>
	 */
	static async getMentorList(): Promise<MentorInfo[]> {
		return await request({
			url: "/mentor/list",
			method: "GET"
		});
	}

	/**
	 * 获取导师详情
	 * @param id 导师ID
	 * @returns Promise<MentorInfo>
	 */
	static async getMentorDetail(id: number): Promise<MentorInfo> {
		return await request({
			url: `/mentor/${id}`,
			method: "GET"
		});
	}

	/**
	 * 绑定导师
	 * @param id 导师ID
	 * @returns Promise<any>
	 */
	static async bindMentor(id: number) {
		return await request({
			url: `/mentor/${id}/bind`,
			method: "POST"
		});
	}

	/**
	 * 解绑导师
	 * @param id 导师ID
	 * @returns Promise<any>
	 */
	static async unbindMentor(id: number) {
		return await request({
			url: `/mentor/${id}/unbind`,
			method: "POST"
		});
	}

	/**
	 * 获取我的学员（导师用）
	 * @returns Promise<StudentInfo[]>
	 */
	static async getMyStudents(): Promise<StudentInfo[]> {
		return await request({
			url: "/mentor/students",
			method: "GET"
		});
	}

	/**
	 * 获取我的导师信息
	 * @returns Promise<MyMentor>
	 */
	static async getMyMentor(): Promise<MyMentor> {
		return await request({
			url: "/mentor/my",
			method: "GET"
		});
	}

	/**
	 * 获取我的导师列表
	 * @returns Promise<MyMentorItem[]>
	 */
	static async getMyMentors(): Promise<MyMentorItem[]> {
		return await request({
			url: "/mentor/my-mentors",
			method: "GET"
		});
	}

	/**
	 * 获取导师个人资料
	 * @returns Promise<MentorInfo>
	 */
	static async getMentorProfile(): Promise<MentorInfo> {
		return await request({
			url: "/mentor/profile",
			method: "GET"
		});
	}

	/**
	 * 更新导师个人资料
	 * @param data 导师资料数据
	 * @returns Promise<MentorInfo>
	 */
	static async updateMentorProfile(data: MentorProfileForm): Promise<MentorInfo> {
		return await request({
			url: "/mentor/profile",
			method: "PUT",
			data
		});
	}

	/**
	 * 导师通过绑定申请（状态0 -> 状态1）
	 * @param studentId 学员ID
	 * @returns Promise<any>
	 */
	static async approveBinding(studentId: number) {
		return await request({
			url: `/mentor/${studentId}/approve-binding`,
			method: "POST"
		});
	}

	/**
	 * 导师认可学员（状态1 -> 状态2）
	 * @param studentId 学员ID
	 * @returns Promise<any>
	 */
	static async approveStudent(studentId: number) {
		return await request({
			url: `/mentor/${studentId}/approve-student`,
			method: "POST"
		});
	}

	/**
	 * 学员毕业（状态2 -> 状态3）
	 * @param studentId 学员ID
	 * @returns Promise<any>
	 */
	static async graduateStudent(studentId: number) {
		return await request({
			url: `/mentor/${studentId}/graduate`,
			method: "POST"
		});
	}

	/**
	 * 解绑学员
	 * @param studentId 学员ID
	 * @returns Promise<any>
	 */
	static async unbindStudent(studentId: number) {
		return await request({
			url: `/mentor/${studentId}/unbind-student`,
			method: "POST"
		});
	}
}
