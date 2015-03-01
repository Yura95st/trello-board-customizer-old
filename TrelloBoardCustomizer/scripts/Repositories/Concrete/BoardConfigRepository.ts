/// <reference path="../Abstract/IBoardConfigRepository.ts" />
/// <reference path="../../DataStorage/Abstract/IDataStorage.ts" />
module Repositories.Concrete
{
    import IBoardConfigRepository = Abstract.IBoardConfigRepository;
    import IDataStorage = DataStorage.Abstract.IDataStorage;
    import Guard = Utils.Guard;

    export class BoardConfigRepository implements IBoardConfigRepository
    {
        private static dataStorageKey: string = "BoardConfigs";

        private _dataStorage: IDataStorage;

        private _boardConfigList: Models.BoardConfig[];

        constructor(dataStorage: IDataStorage)
        {
            Guard.notNull(dataStorage, "dataStorage");

            this._dataStorage = dataStorage;

            this._boardConfigList = [];

            this.init();
        }

        getById(boardConfigId: string): Models.BoardConfig
        {
            Guard.notNullOrEmpty(boardConfigId, "boardConfigId");

            var boardConfig: Models.BoardConfig = null;

            for (var i: number = 0; i < this._boardConfigList.length; i++)
            {
                if (this._boardConfigList[i].boardId === boardConfigId)
                {
                    boardConfig = this._boardConfigList[i];
                    break;
                }
            }

            return boardConfig;
        }

        insert(boardConfig: Models.BoardConfig): void
        {
            Guard.notNull(boardConfig, "boardConfig");

            if (this.getById(boardConfig.boardId) != null)
            {
                throw new Error("Board config with id: '" + boardConfig.boardId + "' already exists.");
            }

            this._boardConfigList.push(boardConfig);
        }

        remove(boardConfig: Models.BoardConfig): void
        {
            Guard.notNull(boardConfig, "boardConfig");

            var index: number = this._boardConfigList.indexOf(boardConfig);

            if (index < 0)
            {
                throw Error("Board config with id: '" + boardConfig.boardId + "' doesn't exists.");
            }

            this._boardConfigList.splice(index, 1);
        }

        save(): void
        {
            var jsonString: string = JSON.stringify(this._boardConfigList);

            this._dataStorage.setItem(BoardConfigRepository.dataStorageKey, jsonString);
        }

        update(boardConfig: Models.BoardConfig): void
        {
            Guard.notNull(boardConfig, "boardConfig");

            var currentBoardConfig: Models.BoardConfig = this.getById(boardConfig.boardId);

            if (currentBoardConfig === null)
            {
                throw Error("Board config with id: '" + boardConfig.boardId + "' doesn't exists.");
            }

            var index: number = this._boardConfigList.indexOf(currentBoardConfig);

            this._boardConfigList[index] = boardConfig;
        }

        private init(): void
        {
            var jsonString: string = this._dataStorage.getItem(BoardConfigRepository.dataStorageKey);

            if (jsonString)
            {
                try
                {
                    var data: any = JSON.parse(jsonString);

                    for (var i: number = 0; i < data.length; i++)
                    {
                        var boardConfig: Models.BoardConfig = Models.BoardConfig.fromJson(data[i]);

                        this._boardConfigList.push(boardConfig);
                    }
                }
                catch (e)
                {
                    console.error("Failed to init BoardConfigRepository.");
                    throw e;
                }
            }
        }
    }
}