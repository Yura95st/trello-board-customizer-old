/// <reference path="IDataStorage.ts" />

module DataStorage
{
    export class ChromeDataStorage implements IDataStorage
    {
        getItem(key: string): string
        {
            throw new Error("Not implemented");
        }

        setItem(key: string, value: string): void
        {
            throw new Error("Not implemented");
        }
    }
} 