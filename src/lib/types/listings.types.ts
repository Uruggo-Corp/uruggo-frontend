export interface Listing {
	isFeatured: boolean;
	_id: string;
	title: string;
	description: string;
	price: number;
	location: Location;
	bedrooms: number;
	bathrooms: number;
	leaseTerm: string;
	availableFrom: Date;
	status: string;
	agent: string;
	createdAt: Date;
	updatedAt: Date;
	slug: string;
	__v: number;
}

export interface Location {
	address: string;
	city: string;
	state: string;
	country: string;
	zipCode: string;
}
