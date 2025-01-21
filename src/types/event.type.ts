import { ChangeEvent } from "react";

export type IEventType = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>;
