import { request } from "./index";
import { config } from "@/config";
import { useStore } from "../store";

/**
 * 头像上传响应类型
 */
export type AvatarUploadResponse = {
	avatar_url: string;
	filename: string;
	path: string;
};

/**
 * 头像上传服务类
 */
export class AvatarService {
	/**
	 * 上传头像
	 * @param filePath 文件路径
	 * @returns Promise<AvatarUploadResponse>
	 */
	static async uploadAvatar(filePath: string): Promise<AvatarUploadResponse> {
		const { user } = useStore();
		
		return new Promise<AvatarUploadResponse>((resolve, reject) => {
			// 使用uni.uploadFile进行文件上传
			const task = uni.uploadFile({
				url: config.baseUrl + "/auth/upload-avatar",
				filePath: filePath,
				name: "avatar",
				header: {
					"Authorization": user.token != null ? `Bearer ${user.token}` : null
				},
				success(res) {
					try {
						const dataStr = res.data as string;
						const dataObj = JSON.parse(dataStr) as UTSJSONObject;
						
						// 检查响应格式
						const successVal = dataObj["success"] as boolean | null;
						if (successVal === true) {
							const responseData = dataObj as AvatarUploadResponse;
							resolve(responseData);
						} else {
							const errorMsg = "头像上传失败";
							reject(new Error(errorMsg));
						}
					} catch (err) {
						reject(new Error("响应解析失败"));
					}
				},
				fail(err) {
					const errorMsg = err.errMsg != null && err.errMsg != "" ? err.errMsg : "头像上传失败";
					reject(new Error(errorMsg));
				}
			});
		});
	}
}
