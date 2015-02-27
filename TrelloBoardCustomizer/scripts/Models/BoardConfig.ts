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

        static fromJson(json: any): BoardConfig
        {
            var boardConfig: BoardConfig = null;

            try
            {
                if (json && json._background)
                {
                    var boardBackground: BoardBackground = new BoardBackground();

                    if (json._background._color)
                    {
                        boardBackground.color = json._background._color;
                    }

                    if (json._background._image)
                    {
                        boardBackground.image = json._background._image;
                    }

                    boardConfig = new BoardConfig(json._boardId, boardBackground);
                }
            }
            catch (e)
            {
                console.error("Invalid json for BoardConfig.");
                console.error(e.message);
            }
            finally
            {
                return boardConfig;
            }
        }
    }
}