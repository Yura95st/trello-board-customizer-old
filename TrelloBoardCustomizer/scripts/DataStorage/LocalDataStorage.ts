/// <reference path="IDataStorage.ts" />

module DataStorage
{
    export class LocalDataStorage implements IDataStorage
    {
        getItem(key: string): string
        {
            return localStorage[key];
        }

        setItem(key: string, value: string): void
        {
            localStorage[key] = value;
        }
    }
} 