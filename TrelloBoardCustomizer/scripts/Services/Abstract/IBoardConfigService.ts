/// <reference path="../../References.ts" />
module TrelloBoardCustomizer.Services.Abstract
{
    import BoardConfig = Models.BoardConfig;

    export interface IBoardConfigService
    {
        clearAllConfigs(): void;

        getBoardConfig(boardId: string): BoardConfig;

        getLocalBoardConfig(boardId: string): BoardConfig;

        saveBoardConfig(boardConfig: BoardConfig): void;
    }
}