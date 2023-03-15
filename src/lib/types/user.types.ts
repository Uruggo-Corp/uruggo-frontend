export interface User {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	role: string;
	isActive: boolean;
	emailVerified: boolean;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
	agentProfile: AgentProfile;
}

export interface AgentProfile {
	idImages: IDImages;
	_id: string;
	userId: string;
	agency: string;
	address: string;
	idVerified: boolean;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}

export interface IDImages {
	idFront: string;
	idBack: string;
}

export interface CreateUser {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	profilePicture: string;
	password: string;
}

export interface CreateAgent {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	password: string;
	agency: string;
	address: string;
	idImages: IDImages;
}

export interface IDImages {
	idFront: string;
	idBack: string;
}
