import { watch } from "vue";
import { scroller } from "./scroller";
import { initTheme, setH5, applyTheme } from "./theme";
import { initLocale, locale, updateTitle } from "@/locale";
import "@/uni_modules/cool-ui";

export function cool(app: VueApp) {
	app.mixin({
		onPageScroll(e) {
			scroller.emit(e.scrollTop);
		},
		onShow() {
			// 更新标题
			updateTitle();

			// 立即应用主题，避免页面切换时闪烁
			applyTheme();

			// #ifdef H5
			setTimeout(() => {
				setH5();
			}, 0);
			// #endif
		},
		onLoad() {
			// 监听语言切换，更新标题
			watch(locale, () => {
				updateTitle();
			});
			
			// 页面加载时立即应用主题，确保在页面渲染前主题已应用
			applyTheme();
		}
	});

	initTheme();
	initLocale();

	console.log(app);
}

export * from "./animation";
export * from "./ctx";
export * from "./hooks";
export * from "./router";
export * from "./scroller";
export * from "./service";
export * from "./store";
export * from "./theme";
export * from "./upload";
export * from "./utils";
export * from "./types";
