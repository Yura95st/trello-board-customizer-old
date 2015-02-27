module DataStorage
{
    export interface IDataStorage
    {
        getItem(key: string): string;

        setItem(key: string, value: string): void;
    }
} 