/// <reference path="../../References.ts" />
module TrelloBoardCustomizer.DataStorage.Concrete
{
    import IDataStorage = DataStorage.Abstract.IDataStorage;
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