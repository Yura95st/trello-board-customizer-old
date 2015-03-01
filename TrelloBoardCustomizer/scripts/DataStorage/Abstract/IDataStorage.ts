/// <reference path="../../References.ts" />
module DataStorage.Abstract
{
    export interface IDataStorage
    {
        getItem(key: string): string;

        setItem(key: string, value: string): void;
    }
}