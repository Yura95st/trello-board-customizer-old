/// <reference path="../../References.ts" />
module TrelloBoardCustomizer.Services.Abstract
{
    import BoardConfig = Models.BoardConfig;

    export interface IBoardStyleService
    {
        applyStyle(boardConfig: BoardConfig): void;

        removeStyle(): void;
    }
}