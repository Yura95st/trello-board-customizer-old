/// <reference path="../Models/BoardConfig.ts" />
module Services
{
    export interface IBoardConfigService
    {
        getBoardConfig(boardId: string): Models.BoardConfig;

        getLocalBoardConfig(boardId: string): Models.BoardConfig;

        saveBoardConfig(boardConfig: Models.BoardConfig): void;
    }
}