import { ChangeEvent } from 'react';

import { IEventType } from './event.type';
import { IOrder } from '../interfaces';

export type IFuncVoid = () => void;
export type IFuncBoolean = () => boolean;
export type IFuncValueString = (value: string) => void;
export type IFuncValueNumberString = (value: number) => string;
export type IFuncValueStringString = (value: string) => string;
export type IFuncOrderOrder = (order: IOrder) => IOrder;
export type IFuncEventInputVoid = (event: ChangeEvent<HTMLInputElement>) => void;
export type IFuncEventSelectVoid = (event: ChangeEvent<HTMLSelectElement>) => void;
export type IFuncEventSelectInputElement = (event: IEventType, param: string) => void;
