<div align="center">

# 🌟 九星 - 自律习惯养成APP

**基于 uni-app x 的跨平台习惯养成社交应用**

_通过打卡、导师指导、活动参与等方式，帮助用户建立良好的生活习惯_

[![GitHub license](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://github.com/dustink66/jiuxing-uniapp-x/blob/main/LICENSE)
[![uni-app x](https://img.shields.io/badge/uni--app%20x-2CA5E0?style=flat-square&logo=vue.js&logoColor=white)](https://uniapp.dcloud.net.cn/)
[![Vue 3](https://img.shields.io/badge/Vue%203-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/UTS-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://doc.dcloud.net.cn/uni-app-x/uts/)

</div>

## 📱 项目简介

九星是一款专注于帮助用户培养良好生活习惯的社交型应用。通过任务打卡、导师指导、活动参与等游戏化方式，激励用户持续坚持，实现自我提升的目标。

### ✨ 核心特性

- 🎯 **任务打卡系统** - 创建个性化任务，设置打卡频次，记录成长轨迹
- 👨‍🏫 **导师学员系统** - 申请成为导师，或绑定导师获得指导
- 🎉 **活动系统** - 参与线上线下活动，获得积分奖励
- 📊 **积分等级系统** - 通过打卡和活动获得积分，提升等级
- 📈 **数据统计** - 详细的打卡记录和成长数据分析
- 🌙 **深色模式** - 支持深色/浅色主题切换
- 🌍 **多语言支持** - 支持中文、英文等多种语言

## 🚀 平台支持

| 平台 | 支持状态 | 最低版本 | 说明 |
|:---:|:---:|:---:|:---|
| 🍎 iOS | ✅ 完整支持 | iOS 9.0+ | 原生性能，完整功能 |
| 🤖 Android | ✅ 完整支持 | Android 5.0+ | 原生性能，完整功能 |
| 🦋 鸿蒙 OS | ✅ 完整支持 | HarmonyOS NEXT | 原生性能，系统集成 |
| 🌐 Web | ✅ 完整支持 | 现代浏览器 | PWA支持，响应式设计 |
| 💬 微信小程序 | ✅ 完整支持 | 最新版本 | 微信生态集成 |

## 🛠️ 技术栈

### 核心框架
- **uni-app x** - 跨平台应用开发框架
- **Vue 3** - 渐进式 JavaScript 框架（Composition API）
- **UTS** - 跨平台强类型语言（类似 TypeScript 但类型更严格）

### UI & 样式
- **Cool UI** - 基于 uni-app x 的 UI 组件库
- **Tailwind CSS** - 实用优先的 CSS 框架
- **RemixIcon / Iconfont** - 图标库

### 开发工具
- **Vite** - 下一代前端构建工具
- **TypeScript** - 类型安全的 JavaScript 超集
- **Prettier** - 代码格式化工具

## 📁 项目结构

```
cool-unix/
├── pages/                    # 页面文件
│   ├── index/               # 主页面
│   │   ├── checkin.uvue     # 打卡页面
│   │   ├── mentor.uvue      # 导师页面
│   │   ├── activity.uvue    # 活动页面
│   │   └── my.uvue          # 我的页面
│   ├── task/                # 任务相关
│   │   └── add.uvue         # 添加任务
│   ├── mentor/              # 导师相关
│   │   ├── apply.uvue       # 申请导师
│   │   ├── detail.uvue      # 导师详情
│   │   ├── my-students.uvue # 我的学员
│   │   └── my.uvue          # 我的导师
│   ├── activity/            # 活动相关
│   │   ├── detail.uvue      # 活动详情
│   │   └── my.uvue          # 我的活动
│   ├── user/                # 用户相关
│   │   ├── login.uvue       # 登录
│   │   ├── register.uvue   # 注册
│   │   ├── edit.uvue        # 编辑资料
│   │   └── integral.uvue   # 积分记录
│   └── set/                 # 设置相关
│       ├── index.uvue       # 设置首页
│       └── general.uvue     # 通用设置
├── cool/                    # 核心功能模块
│   ├── store/               # 状态管理
│   │   ├── user.ts          # 用户状态
│   │   ├── task.ts          # 任务状态
│   │   ├── checkin.ts       # 打卡状态
│   │   ├── mentor.ts        # 导师状态
│   │   ├── activity.ts      # 活动状态
│   │   └── dashboard.ts     # 仪表盘数据
│   ├── service/             # API 服务层
│   │   ├── auth.ts          # 认证服务
│   │   ├── mentor.ts        # 导师服务
│   │   └── index.ts         # 请求封装
│   ├── utils/               # 工具函数
│   │   ├── parse.ts         # 数据解析
│   │   ├── storage.ts       # 本地存储
│   │   └── day.ts           # 日期处理
│   └── router/              # 路由管理
├── types/                   # 类型定义
│   ├── index.ts             # 通用类型
│   └── habit.ts             # 习惯养成相关类型
├── components/              # 公共组件
│   ├── tabbar.uvue          # 底部导航
│   ├── sms-btn.uvue          # 短信验证码按钮
│   └── locale-set.uvue       # 语言设置
├── locale/                  # 国际化文件
│   ├── zh-cn.json           # 简体中文
│   ├── zh-tw.json           # 繁体中文
│   └── en.json              # 英文
├── static/                  # 静态资源
│   ├── icon/                # 图标
│   └── logo.png             # Logo
└── uni_modules/             # uni-app 插件
    ├── cool-ui/             # UI 组件库
    ├── cool-canvas/         # Canvas 组件
    └── cool-vibrate/        # 震动插件
```

## 🎯 主要功能

### 1. 打卡系统
- ✅ 创建个人任务（每日/每周频次）
- ✅ 选择任务标签和主题色
- ✅ 设置打卡提醒
- ✅ 支持补打卡功能
- ✅ 打卡进度可视化
- ✅ 打卡记录统计

### 2. 导师系统
- ✅ 申请成为导师（需满足积分要求）
- ✅ 查看导师列表和详情
- ✅ 绑定/解绑导师关系
- ✅ 导师管理学员（颁发毕业徽标）
- ✅ 设定申请门槛（积分要求）

### 3. 活动系统
- ✅ 浏览线上/线下活动
- ✅ 活动详情查看
- ✅ 活动报名/取消报名
- ✅ 活动签到（二维码）
- ✅ 参与门槛（积分/等级要求）

### 4. 积分等级系统
- ✅ 打卡获得积分
- ✅ 参与活动获得积分
- ✅ 积分等级划分（100积分=1星，1000积分=2星，10000积分=3星）
- ✅ 积分记录查询
- ✅ 等级特权展示

### 5. 个人中心
- ✅ 用户信息管理
- ✅ 数据统计展示
- ✅ 积分记录查询
- ✅ 我的任务/导师/活动
- ✅ 设置中心

## 🚀 快速开始

### 环境要求

- **HBuilderX** 4.0+ （推荐使用最新版本）
- **Node.js** 16+ 
- **pnpm** 或 **npm** 或 **yarn**

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/dustink66/jiuxing-uniapp-x.git
cd jiuxing-uniapp-x
```

2. **安装依赖**
```bash
pnpm install
# 或
npm install
# 或
yarn install
```

3. **生成类型定义**（可选）
```bash
pnpm run build-ui
pnpm run build-icon
```

4. **使用 HBuilderX 打开项目**
   - 打开 HBuilderX
   - 文件 -> 导入 -> 从本地目录导入
   - 选择项目目录

5. **运行项目**
   - 点击运行 -> 运行到手机或模拟器
   - 或运行 -> 运行到浏览器

### 开发配置

1. **配置 API 地址**
   
   编辑 `config/dev.ts` 和 `config/prod.ts` 配置 API 基础地址：
   ```typescript
   export default {
     baseURL: 'https://your-api-domain.com/api'
   }
   ```

2. **配置微信小程序**
   
   编辑 `manifest.json` 中的 `mp-weixin` 配置，填入你的小程序 AppID。

## 📝 开发规范

### 代码规范

- ✅ 使用 **UTS** 语言编写，严格遵循类型规范
- ✅ 使用 **Vue 3 Composition API**
- ✅ 页面文件使用 `.uvue` 后缀
- ✅ 所有页面需在 `pages.json` 中注册
- ✅ 可滚动内容必须放在滚动容器中（`scroll-view`、`list-view` 等）
- ✅ 使用条件编译处理平台差异（`#ifdef APP-ANDROID` 等）

### 命名规范

- 页面文件：使用 kebab-case，如 `my-profile.uvue`
- 组件文件：使用 kebab-case，如 `user-card.uvue`
- 类型定义：使用 PascalCase，如 `UserInfo`
- 变量/函数：使用 camelCase，如 `getUserInfo`

### 代码风格

- 简洁易懂，复杂代码需添加中文注释
- 严格类型匹配，不使用隐式转换
- 条件语句必须使用布尔类型
- 可为 null 的类型需明确标注（`| null` 或 `?`）

## 🔧 核心功能说明

### 状态管理

项目使用 Vue 3 的 `ref` 和 `computed` 进行状态管理，主要状态模块：

- `user` - 用户信息和认证状态
- `task` - 任务列表和详情
- `checkin` - 打卡记录
- `mentor` - 导师信息
- `activity` - 活动信息
- `dashboard` - 仪表盘统计数据

### API 请求

所有 API 请求通过 `cool/service/index.ts` 中的 `request` 函数统一封装，支持：
- 自动添加认证 Token
- 请求/响应拦截
- 错误统一处理
- 平台兼容性处理（Android 的 UTSJSONObject 等）

### 数据解析

由于 Android 平台返回的是 `UTSJSONObject` 类型，需要使用 `cool/utils/parse.ts` 中的 `parse` 函数进行类型转换：

```typescript
import { parse } from '@/cool';
import type { UserInfo } from '@/types';

const data = await request({ url: '/user/profile' });
const userInfo = parse<UserInfo>(data);
```

## 🌍 国际化

项目支持多语言，语言文件位于 `locale/` 目录：

- `zh-cn.json` - 简体中文
- `zh-tw.json` - 繁体中文
- `en.json` - 英文
- `ja.json` - 日文
- `ko.json` - 韩文
- `es.json` - 西班牙文
- `fr.json` - 法文

使用方式：
```typescript
import { t } from '@/locale';

const message = t('登录');
```

## 🎨 主题定制

项目支持深色/浅色主题切换，主题配置位于 `theme.json`。

使用 Tailwind CSS 进行样式开发，支持响应式设计和暗黑模式。

## 📱 平台差异处理

由于不同平台的特性差异，需要使用条件编译：

```typescript
// #ifdef APP-ANDROID
// Android 平台特定代码
// #endif

// #ifdef APP-IOS
// iOS 平台特定代码
// #endif

// #ifndef APP
// 非 APP 平台代码（Web、小程序等）
// #endif
```

## 🐛 常见问题

### 1. Android 平台类型转换错误

Android 平台 API 返回的是 `UTSJSONObject` 类型，需要使用 `parse` 函数转换：

```typescript
import { parse } from '@/cool';
const data = parse<YourType>(apiResponse);
```

### 2. 条件语句类型错误

UTS 要求条件语句必须使用布尔类型，不能使用 `if (value)` 这种形式：

```typescript
// ❌ 错误
if (userInfo) { }

// ✅ 正确
if (userInfo != null) { }
```

### 3. 页面滚动问题

可滚动内容必须放在滚动容器中：

```vue
<template>
  <!-- #ifdef APP -->
  <scroll-view class="container">
    <!-- 内容 -->
  </scroll-view>
  <!-- #endif -->
</template>
```

## 📄 开源协议

本项目基于 [MIT 协议](LICENSE) 开源。

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📞 联系方式

- **GitHub Issues**: [提交问题](https://github.com/dustink66/jiuxing-uniapp-x/issues)
- **项目地址**: https://github.com/dustink66/jiuxing-uniapp-x

---

<div align="center">

**🌟 如果这个项目对您有帮助，请给我们一个 Star！**

**让我们一起帮助更多人养成良好习惯 🚀**

_Made with ❤️ by [dustink66](https://github.com/dustink66)_

</div>
