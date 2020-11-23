import {Module} from "vuex";
// @ts-ignore
import firestoreWorker from "workerize-loader!./FirestoreWorker";

class AdminState {
	public allStats: object;
	public benchmarkInfo: object;
	public todayStats: object;
	public sevenDayStats: object;
	public monthlyStats: object;

	constructor() {
		this.allStats = {};
		this.benchmarkInfo = {};
	}
}

function getTimelessUTC(date: Date = new Date()) {
	date.setUTCHours(0, 0, 0, 0);
	return date;
}

const AdminStore: Module<AdminState, any> = {
	state: new AdminState(),
	getters: {
		getStats(state: AdminState): object {
			return state.allStats;
		},
		getBenchmarkInfo(state: AdminState): object {
			return state.benchmarkInfo;
		},
	},
	mutations: {
		setStats(state: AdminState, payload) {
			state.allStats = payload;
		},
		setBenchmarkInfo(state: AdminState, payload) {
			state.benchmarkInfo = payload;
		},
	},
	actions: {
		async loadTodayStatistics({commit}) {
			const now = getTimelessUTC();
			const fwInstance = firestoreWorker();
			fwInstance.getStatsDoc(`${now.toUTCString()}`).then((data) => {
				if (data) {
					commit("setStats", data);
				} else {
					commit("setStats", {
						summary: {
							no_results: 0,
							total: 0,
						},
					});
				}
			}).finally(() => {
				return;
			});
		},
		async loadSavedStatistics({commit}, filter: string) {
			const fwInstance = firestoreWorker();
			fwInstance.getStatsDoc(filter).then((data) => {
				if (data) {
					commit("setStats", data);
				}
			}).finally(() => {
				return;
			});
		},
		async loadRangeStatistics({commit}, dates: Date[]) {
			let startDate: Date;
			let endDate: Date;
			if (dates.length > 0) {
				startDate = getTimelessUTC(dates[0]);
				endDate = getTimelessUTC(dates[dates.length - 1]);

				const allDates = [];

				if (startDate.getTime() === endDate.getTime()) {
					allDates.push(startDate);
				} else {
					const currentDate: Date = startDate;
					while (currentDate.getTime() < endDate.getTime()) {
						currentDate.setUTCDate(currentDate.getUTCDate() + 1);
						allDates.push(new Date(currentDate));
					}
				}

				console.log(allDates);
			}
		},

		async loadBenchmarkInfo({commit}) {
			const fwInstance = firestoreWorker();
			fwInstance.getStatsDoc("benchmark").then((data) => {
				if (data) {
					commit("setBenchmarkInfo", data);
				}
			}).finally(() => {
				return;
			});
		},
	},
};

export default AdminStore;
