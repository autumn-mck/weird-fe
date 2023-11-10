import Status from "./status";

export class Context {
	ancestors!: Status[];
	descendants!: Status[];
}
