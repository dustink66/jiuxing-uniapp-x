// 用户等级信息
export type UserLevel = {
	id: number;
	name: string;
	level: number;
	icon: string;
	color: string;
	description: string;
	min_integral: number;
	max_integral: number;
	privileges: string[];
	sort_order: number;
	status: boolean;
	created_at: string;
	updated_at: string;
};

export type UserInfo = {
	id: number; // 用户id
	phone: string; // 手机号
	nickname: string; // 昵称
	avatar?: string; // 头像
	gender?: number; // 性别
	birthday?: string; // 生日
	province?: string; // 省份
	city?: string; // 城市
	district?: string; // 区县
	workplace?: string; // 工作单位
	description?: string; // 个人描述
	integral: number; // 积分
	level: number; // 等级
	level_name: string; // 等级名称
	is_mentor: boolean; // 是否为导师
	status: boolean; // 状态（注意：返回的是 boolean，不是 number）
	user_level?: UserLevel; // 用户等级详细信息
	// 以下字段为可选，因为可能不是所有接口都返回
	created_at?: string; // 创建时间
	updated_at?: string; // 更新时间
	ip_address?: string; // IP地址
	ip_country?: string; // IP国家
	ip_city?: string; // IP城市
	ip_region?: string; // IP地区
	device_type?: string; // 设备类型
	device_brand?: string; // 设备品牌
	device_model?: string; // 设备型号
	os_name?: string; // 操作系统名称
	os_version?: string; // 操作系统版本
	browser_name?: string; // 浏览器名称
	browser_version?: string; // 浏览器版本
	user_agent?: string; // 用户代理
	registration_source?: string; // 注册来源
};

// 认证相关类型
export type AuthToken = {
	token: string; // 访问token
	expire: number; // token过期时间（秒）
	refreshToken: string; // 刷新token
	refreshExpire: number; // 刷新token过期时间（秒）
};

export type LoginResponse = {
	user: UserInfo;
	expire: number;
	token: string;
	refreshExpire: number;
	refreshToken: string;
};

export type RegisterForm = {
	phone: string;
	code: string;
	password: string;
	nickname: string;
	referrer_phone?: string; // 推荐人手机号（可选）
};

export type LoginForm = {
	phone: string;
	password?: string;
	code?: string;
	login_type: 'password' | 'sms';
};

export type ResetPasswordForm = {
	phone: string;
	code: string;
	password: string;
};

export type SendCodeForm = {
	phone: string;
	type: 'register' | 'login' | 'reset';
};
