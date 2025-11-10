import { Dict, dict } from "./dict";
import { User, user } from "./user";
import { Task, task } from "./task";
import { Checkin, checkin } from "./checkin";
import { Activity, activity } from "./activity";
import { Mentor, mentor } from "./mentor";
import { Dashboard, dashboard } from "./dashboard";


type Store = {
	user: User
	dict: Dict
	task: Task
	checkin: Checkin
	activity: Activity
	mentor: Mentor
	dashboard: Dashboard
}

export function useStore(): Store {
	return {
		user,
		dict,
		task,
		checkin,
		activity,
		mentor,
		dashboard
	};
}

export * from "./dict";
export * from "./user";
export * from "./task";
export * from "./checkin";
export * from "./activity";
export * from "./mentor";
export * from "./dashboard";
