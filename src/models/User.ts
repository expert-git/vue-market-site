export default class User {
	public firstName: string;
	public lastName: string;
	public rank: UserTypes;

	constructor(firstName: string, lastName: string, rank: UserTypes = UserTypes.Normal) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.rank = rank;
	}

	public fullName(): string {
		return `${this.firstName} ${this.lastName}`;
	}
}

export enum UserTypes {
	Normal = "Normal",
	Admin = "Admin",
}
