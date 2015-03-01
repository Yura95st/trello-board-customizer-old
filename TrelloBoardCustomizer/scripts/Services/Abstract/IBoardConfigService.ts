/// <reference path="../../References.ts" />
module Services.Abstract
{
    import BoardConfig = Models.BoardConfig;

    export interface IBoardConfigService
    {
        getBoardConfig(boardId: string): BoardConfig;

        getLocalBoardConfig(boardId: string): BoardConfig;

        saveBoardConfig(boardConfig: BoardConfig): void;
    }
}