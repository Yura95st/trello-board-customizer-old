/// <reference path="../../References.ts" />
module TrelloBoardCustomizer.Repositories.Abstract
{
    import BoardConfig = Models.BoardConfig;

    export interface IBoardConfigRepository
    {
        getById(boardConfigId: string): BoardConfig;

        insert(boardConfig: BoardConfig): void;

        remove(boardConfig: BoardConfig): void;

        save(): void;

        update(boardConfig: BoardConfig): void;
    }
}