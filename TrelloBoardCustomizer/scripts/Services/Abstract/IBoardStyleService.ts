/// <reference path="../../Models/BoardConfig.ts"/>
module Services.Abstract
{
    import BoardConfig = Models.BoardConfig;

    export interface IBoardStyleService
    {
        applyStyle(boardConfig: BoardConfig) : void;

        removeStyle(): void;
    }
}