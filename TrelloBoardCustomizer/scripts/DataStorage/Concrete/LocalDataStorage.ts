/// <reference path="../../References.ts" />
module DataStorage.Concrete
{
    import IDataStorage = Abstract.IDataStorage;
    import Guard = Utils.Guard;

    export class LocalDataStorage implements IDataStorage
    {
        getItem(key: string): string
        {
            Guard.notNullOrEmpty(key, "key");

            return localStorage[key];
        }

        setItem(key: string, value: string): void
        {
            Guard.notNullOrEmpty(key, "key");

            localStorage[key] = value;
        }
    }
}