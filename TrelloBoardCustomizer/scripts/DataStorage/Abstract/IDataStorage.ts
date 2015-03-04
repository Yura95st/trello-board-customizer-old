/// <reference path="../../References.ts" />
module TrelloBoardCustomizer.DataStorage.Abstract
{
    export interface IDataStorage
    {
        getItem(key: string): string;

        setItem(key: string, value: string): void;
    }
}