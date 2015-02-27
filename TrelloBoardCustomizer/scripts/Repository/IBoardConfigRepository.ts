/// <reference path="../Models/BoardConfig.ts" />

module Repository
{
    import BoardConfig = Models.BoardConfig;

    export interface IBoardConfigRepository
    {
        insert(boardConfig: BoardConfig): void;

        getById(boardConfigId: string): BoardConfig;

        load(): void;

        remove(boardConfig: BoardConfig): void;

        save(): void;

        update(boardConfig: BoardConfig): void;
    }
} 