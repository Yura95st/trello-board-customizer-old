/// <reference path="../Utils/Guard.ts" />
/// <reference path="BoardBackground.ts" />
module Models
{
    import Guard = Utils.Guard;

    export class BoardConfig
    {
        private _boardId: string;
        private _background: BoardBackground;

        constructor(boardId: string, boardBackground: BoardBackground)
        {
            Guard.notNullOrEmpty(boardId, "boardId");
            Guard.notNull(boardBackground, "boardBackground");

            this._boardId = boardId;
            this._background = boardBackground;
        }

        get boardId(): string
        {
            return this._boardId;
        }

        get background(): BoardBackground
        {
            return this._background;
        }

        equals(boardConfig: BoardConfig): boolean
        {
            if (boardConfig === undefined || boardConfig === null)
            {
                return false;
            }

            if (this._boardId !== boardConfig.boardId)
            {
                return false;
            }

            if (!this._background.equals(boardConfig.background))
            {
                return false;
            }

            return true;
        }
    }
}