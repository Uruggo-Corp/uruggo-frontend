export interface Paginated<T> {
	data: T[];
	meta: Meta;
}

export interface Meta {
	itemCount: number;
	totalItems: number;
	itemsPerPage: number;
	totalPages: number;
	currentPage: number;
}
