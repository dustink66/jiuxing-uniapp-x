import { isDev, ignoreTokens, config } from "@/config";
import { locale, t } from "@/locale";
import { isNull, isObject, parse, parseToObject, storage } from "../utils";
import { useStore } from "../store";

// 请求参数类型定义
export type RequestOptions = {
	url: string; // 请求地址
	method?: RequestMethod; // 请求方法
	data?: any; // 请求体数据
	params?: any; // URL参数
	header?: any; // 请求头
	timeout?: number; // 超时时间
	withCredentials?: boolean; // 是否携带凭证
	firstIpv4?: boolean; // 是否优先使用IPv4
	enableChunked?: boolean; // 是否启用分块传输
};

// 响应数据类型定义
export type Response = {
	code?: number;
	message?: string;
	data?: any;
};

// 请求队列（用于等待token刷新后继续请求）
let requests: ((token: string) => void)[] = [];

// 标记token是否正在刷新
let isRefreshing = false;

// 判断当前url是否忽略token校验
const isIgnoreToken = (url: string) => {
	return ignoreTokens.some((e) => {
		const pattern = e.replace(/\*/g, ".*");
		return new RegExp(pattern).test(url);
	});
};

/**
 * 通用请求方法
 * @param options 请求参数
 * @returns Promise<any>
 */
export function request(options: RequestOptions): Promise<any> {
	// UTS 不支持对象解构，需要逐个访问属性
	let url = options.url;
	const method = options.method != null ? options.method : "GET";
	const data = options.data != null ? options.data : {};
	const header = options.header != null ? options.header : {};
	const timeout = options.timeout != null ? options.timeout : 60000;

	const store = useStore();
	const user = store.user;

	// 拼接基础url
	if (!url.startsWith("http")) {
		url = config.baseUrl + url;
	}

	// 获取当前token
	let Authorization: string | null = null;
	
	// 如果有token，格式化为Bearer token
	if (user.token != null) {
		Authorization = `Bearer ${user.token}`;
	}

	// 如果是忽略token的接口，则不携带token
	if (isIgnoreToken(url)) {
		Authorization = null;
	}

	return new Promise((resolve, reject) => {
		// 发起请求的实际函数
		const next = () => {
			// 在安卓平台上，需要将 data 转换为 UTSJSONObject
			let requestData: any = data != null ? data : {};
			// #ifdef APP-ANDROID
			if (data != null && isObject(data)) {
				requestData = parseToObject(data);
			}
			// #endif
			
			// 构建请求头
			const requestHeader: UTSJSONObject = {
				language: locale.value,
				"Accept": "application/json"
			} as UTSJSONObject;
			
			// 添加 Authorization
			if (Authorization != null) {
				requestHeader["Authorization"] = Authorization;
			}
			
			// POST/PUT 请求需要设置 Content-Type
			if (method == "POST" || method == "PUT") {
				requestHeader["Content-Type"] = "application/json";
			}
			
			// 合并自定义 header
			if (header != null && isObject(header)) {
				const headerObj = header as UTSJSONObject;
				for (const key in headerObj) {
					if (headerObj.hasOwnProperty(key)) {
						requestHeader[key] = headerObj[key];
					}
				}
			}
			
			uni.request({
				url,
				method,
				data: requestData,
				header: requestHeader,
				timeout,

				success(res) {
					
					// 处理所有非200/201状态码的响应
					if (res.statusCode != 200 && res.statusCode != 201) {
						const body: any = res.data as any;
						
						
						// 尝试解析JSON错误响应
						if (body != null && isObject(body)) {
							try {
								const parsed = parse<Response>(body ?? { code: 0 })!;
								const codeVal = parsed.code != null ? parsed.code as number : null;
								const msgVal = parsed.message != null ? parsed.message as string : null;
								
								
								// 401 无权限，需要登出
								if (res.statusCode == 401) {
									user.logout();
								}
								
								const errorMessage = msgVal != null && msgVal != "" ? msgVal : t("请求失败");
								reject({ message: errorMessage, code: codeVal } as Response);
								return;
							} catch (parseError) {
								// JSON解析失败，使用默认错误信息
								console.error('解析错误响应失败:', parseError);
							}
						}
						
						// 如果JSON解析失败，使用状态码对应的默认错误信息
						let errorMessage = t("请求失败");
						switch (res.statusCode) {
							case 400:
								errorMessage = t("请求参数错误");
								break;
							case 401:
								user.logout();
								errorMessage = t("无权限");
								break;
							case 403:
								errorMessage = t("权限不足");
								break;
							case 404:
								errorMessage = `[404] ${url}`;
								break;
							case 422:
								errorMessage = t("数据验证失败");
								break;
							case 429:
								errorMessage = t("请求过于频繁");
								break;
							case 500:
								errorMessage = t("服务器内部错误");
								break;
							case 502:
								errorMessage = t("服务异常");
								break;
							default:
								errorMessage = t("请求失败");
								break;
						}
						
						reject({ message: errorMessage, code: res.statusCode } as Response);
						return;
					}

					// 200 正常响应
					else if (res.statusCode == 200) {
						const body: any = res.data as any;
						if (body == null) {
							// UTS 不允许 null 作为 Any，返回空对象占位
							resolve({} as any);
						} else if (!isObject(body)) {
							// 如果响应体不是对象（比如是 HTML 字符串），说明服务器返回了错误页面
							const primitive: any = body as any;
							reject({ message: t("服务器返回了非 JSON 格式的响应，请检查请求地址和服务器配置"), code: 500 } as Response);
							return;
						} else {
							// 解析响应数据
							const parsed = parse<Response>(body ?? { code: 0 })!;
							const codeVal = parsed.code != null ? parsed.code as number : null;
							const msgVal = parsed.message != null ? parsed.message as string : null;
							// 安全处理 data，如果为 null 则使用空对象，避免 Android 平台类型转换错误
							const payload: any = parsed.data != null ? parsed.data as any : {};

							switch (codeVal) {
								case 200:
									resolve(payload);
									break;
								default:
									reject({ message: msgVal, code: codeVal } as Response);
									break;
							}
						}
					}
					// 201 创建成功
					else if (res.statusCode == 201) {
						const body: any = res.data as any;
						if (body == null) {
							// UTS 不允许 null 作为 Any，返回空对象占位
							resolve({} as any);
						} else if (!isObject(body)) {
							const primitive: any = body as any;
							resolve(primitive);
						} else {
							// 解析响应数据
							const parsed = parse<Response>(body ?? { code: 0 })!;
							const codeVal = parsed.code != null ? parsed.code as number : null;
							const msgVal = parsed.message != null ? parsed.message as string : null;
							const payload: any = parsed.data as any;

							switch (codeVal) {
								case 200:
								case 201:
									resolve(payload as any);
									break;
								default:
									reject({ message: msgVal, code: codeVal } as Response);
									break;
							}
						}
					} else {
						reject({ message: t("服务异常") } as Response);
					}
				},

				// 网络请求失败
				fail(err) {
					const errMsg = err.errMsg != null && err.errMsg != "" ? err.errMsg : t("网络请求失败");
					reject({ message: errMsg } as Response);
				}
			});
		};

		// 非刷新token接口才进行token有效性校验
		if (!options.url.includes("/refreshToken")) {
			if (!isNull(Authorization)) {
				// 判断token是否过期
				if (storage.isExpired("token")) {
					// 判断refreshToken是否过期
					if (storage.isExpired("refreshToken")) {
						// 刷新token也过期，直接退出登录
						user.logout();
						return;
					}

					// 如果当前没有在刷新token，则发起刷新
					if (!isRefreshing) {
						isRefreshing = true;
						user.refreshToken()
							.then((token) => {
								// 刷新成功后，执行队列中的请求
								requests.forEach((cb) => cb(token));
								requests = [];
								isRefreshing = false;
							})
							.catch((err) => {
								reject(err);
								user.logout();
							});
					}

					// 将当前请求加入队列，等待token刷新后再执行
					new Promise((resolve) => {
						requests.push((token: string) => {
							// 重新设置token
							Authorization = token;
							next();
							resolve(true);
						});
					});
					// 此处return，等待token刷新
					return;
				}
			}
		}

		// token有效，直接发起请求
		next();
	});
}
