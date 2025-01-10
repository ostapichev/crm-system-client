import { ChangeEvent } from 'react';

export type IFuncVoid = () => void;
export type IFuncNumber = () => number;
export type IFuncString = () => string;
export type IFuncBoolean = () => boolean;
export type IFuncValueString = (value: string) => void;
export type IFuncValueNumberString = (value: number) => string;
export type IFuncSelectElement = (event: ChangeEvent<HTMLSelectElement>) => void; 
