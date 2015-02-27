/// <reference path="IBoardConfigRepository.ts" />
/// <reference path="../DataStorage/IDataStorage.ts" />
module Repository
{
    import IDataStorage = DataStorage.IDataStorage;
    import Guard = Utils.Guard;

    export class BoardConfigRepository implements IBoardConfigRepository
    {
        private _dataStorage: IDataStorage;

        constructor(dataStorage: IDataStorage)
        {
            Guard.notNull(dataStorage, "dataStorage");

            this._dataStorage = dataStorage;
        }

        insert(boardConfig: Models.BoardConfig): void
        {
        }

        getById(boardConfigId: number): Models.BoardConfig
        {
            throw new Error("Not implemented");
        }

        load(): void
        {
        }

        remove(boardConfig: Models.BoardConfig): void
        {
        }

        save(): void
        {
        }

        update(boardConfig: Models.BoardConfig): void
        {
        }
    }
}