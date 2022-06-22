export type CellTypes = "code" | "text";

export interface ICell {
	id: string;
	type: CellTypes;
	content: string;
}

export type Direction = "up" | "down";
