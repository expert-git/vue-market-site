export class DailyStatsType {
	public name: string;
	public image: string;
	public label: string;

	constructor(name: string, image: string, label: string) {
		this.name = name;
		this.image = image;
		this.label = label;
	}
}

const total = new DailyStatsType("total", "search_icon_blue.svg", "Total Searches");
const noResults = new DailyStatsType("no_results", "empty_icon_gray.svg", "Empty Result\n Searches");
const errors = new DailyStatsType("errors", "error_icon_red.svg", "Backend Errors");

export const DailyStatsTypes = [total, noResults, errors];
