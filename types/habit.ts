// 自律习惯养成APP - 数据类型定义

// 用户信息
export type User = {
  id: number;
  phone: string;
  nickname: string;
  avatar?: string;
  gender?: number;
  birthday?: string;
  province?: string;
  city?: string;
  district?: string;
  workplace?: string;
  description?: string;
  integral: number;
  level: number;
  level_name: string;
  is_mentor: boolean;
  status: number;
};


// 任务信息
export type TaskInfo = {
  id: number;
  title: string;
  description: string;
  habit_type: number; // 1-戒, 2-行
  frequency: number; // 1-每日, 2-每周
  total_times: number; // 总次数
  completed_times: number; // 已完成次数
  status: number; // 0-失败, 1-进行中, 2-成功
  status_text: string; // 状态文本
  checkin_count: number; // 打卡次数
  created_at: string; // 创建时间
  updated_at: string; // 更新时间
};

// 打卡记录
export type CheckinInfo = {
  id: number;
  task_id: number;
  task_title?: string;
  task_color?: string;
  checkin_date: string;
  is_makeup: boolean;
  note?: string;
  created_at: string;
};

// 任务统计
export type TaskStats = {
  task_id: number;
  total_checkins: number;
  this_week_checkins: number;
  this_month_checkins: number;
  consecutive_days: number;
  completion_rate: number;
};

// 打卡记录统计
export type CheckinRecordStats = {
  total_checkins: number;
  this_week_checkins: number;
  this_month_checkins: number;
  consecutive_days: number;
  makeup_checkins: number;
};

// 导师信息
export type MentorInfo = {
  id: number;
  user_id: number;
  name: string;
  avatar?: string;
  integral: number;
  level: number;
  level_name: string;
  gender: number;
  city: string;
  age: number;
  workplace?: string;
  badge_icon?: string;
  student_required_integral: number;
  description: string;
  max_students: number;
  active_students_count: number;
  graduated_students_count: number;
  created_at: string;
};

// 导师申请表单
export type MentorApplyForm = {
  student_required_integral: number;
  description: string;
  referrer_phone: string;
};

// 导师资料编辑表单
export type MentorProfileForm = {
  description: string;
  student_required_integral: number;
  max_students: number;
};

// 我的导师信息
export type MyMentor = {
  id: number;
  nickname: string;
  avatar?: string;
  integral: number;
  level: number;
  bind_time: string;
};

// 我的导师列表项
export type MyMentorItem = {
  id: number;
  name: string;
  badge_icon?: string;
  student_required_integral: number;
  description: string;
  mentor_id: number;
  mentor_avatar?: string;
  mentor_nickname: string;
  mentor_level_name: string;
  workplace?: string;
  level_name: string;
  gender?: number;
  age?: number;
  city?: string;
  status: number;
  status_text: string;
  bind_time: string;
  graduate_time?: string;
  created_at: string;
};

// 学员信息
export type StudentInfo = {
  id: number;
  nickname: string;
  phone: string;
  avatar: string;
  integral: number;
  level: number;
  level_name: string;
  bind_time: string;
  graduate_time?: string;
  status: number;
  gender: number;
  age: number;
  city: string;
  workplace?: string;
  description?: string;
};


// 认证相关返回类型
export type AuthTokens = {
  expire: number;
  token: string;
  refreshExpire: number;
  refreshToken: string;
};

export type SendCodeResponse = {
  code: string;
  expired_at: string;
};

export type AuthRegisterResponse = {
  user: User;
  expire: number;
  token: string;
  refreshExpire: number;
  refreshToken: string;
};

export type AuthLoginResponse = {
  user: User;
  expire: number;
  token: string;
  refreshExpire: number;
  refreshToken: string;
};

// 学员关系
export type StudentRelation = {
  id: number;
  student: StudentInfo;
  status: number;
  created_at: string;
};

// 活动信息
export type ActivityInfo = {
  id: number;
  title: string;
  description: string;
  cover_image: string;
  detail_images?: string[];
  start_time: string;
  end_time: string;
  address?: string | null;
  min_integral: number;
  min_level: number;
  max_participants: number;
  current_participants: number;
  status: boolean;
  can_register?: boolean;
  created_at?: string;
  updated_at?: string;
};

// 积分记录
export type IntegralRecord = {
  id: number;
  change_amount: number;
  current_integral: number;
  type: string;
  description: string;
  related_id?: number;
  created_at: string;
};

// 积分统计信息
export type IntegralStats = {
  current_integral: number;
  current_level: number;
  total_earned: number;
  total_deducted: number;
  checkin_earned: number;
  activity_earned: number;
};

// 积分记录列表响应
export type IntegralHistoryResponse = {
  data: IntegralRecord[];
  current_page: number;
  per_page: number;
  total: number;
};

// 任务列表统计
export type TaskListStats = {
  total: number;
  active: number;
};

// 打卡统计
export type CheckinStats = {
  total: number;
  today: number;
  this_week: number;
  this_month: number;
  consecutive_days: number;
};

// 活动统计
export type ActivityStats = {
  total: number;
  attended: number;
};

// 导师统计
export type MentorStats = {
  total_students: number;
  active_students: number;
  graduated_students: number;
};

// 用户统计信息
export type UserStats = {
  tasks: TaskListStats;
  checkins: CheckinStats;
  activities: ActivityStats;
  mentor: MentorStats;
};


// 个人中心数据
export type DashboardData = {
  user: User;
  stats: UserStats;
  current_mentor: MyMentor | null;
};

// 积分信息
export type IntegralInfo = {
  current_integral: number;
  current_level: number;
  total_earned: number;
  total_deducted: number;
  checkin_earned: number;
  activity_earned: number;
};

// 咨询服务价格配置
export type ConsultationPriceConfig = {
  price_per_hour: string;
  currency: string;
  description: string;
};

// 咨询服务订单
export type ConsultationOrder = {
  id: number;
  order_no: string;
  hours: number;
  price_per_hour: string;
  total_amount: string;
  status: string;
  status_text: string;
  payment_method: string;
  payment_method_text: string;
  expired_at: string;
};

// 支付二维码信息
export type PaymentQRCode = {
	_sign: string;
	code: string;
	msg: string;
	out_trade_no: string;
	qr_code: string;
};

// 支付信息
export type PaymentInfo = {
	qr_code: PaymentQRCode;
	payment_url: string;
	expired_at: string;
};

// 创建订单响应
export type CreateOrderResponse = {
	order: ConsultationOrder;
	payment: PaymentInfo;
};

// 支付状态检查响应
export type PaymentStatusResponse = {
	is_paid: boolean;
	order_no: string;
	status: string;
	status_text: string;
	paid_at: string | null;
};

// 创建订单请求
export type CreateOrderRequest = {
  hours: number;
  payment_method: 'alipay' | 'wechat';
  payment_channel: 'qr' | 'h5' | 'app';
};

// 当前订单信息（用于支付流程）
export type CurrentOrder = {
	orderNo: string;
	amount: string;
};

