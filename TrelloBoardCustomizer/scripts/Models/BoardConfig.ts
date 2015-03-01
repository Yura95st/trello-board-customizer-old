/// <reference path="BoardBackground.ts" />
module Models
{
    import Guard = Utils.Guard;

    export class BoardConfig
    {
        private _boardId: string;
        private _background: BoardBackground;

        constructor(boardId: string)
        {
            Guard.notNullOrEmpty(boardId, "boardId");

            this._boardId = boardId;
        }

        get boardId(): string
        {
            return this._boardId;
        }

        get background(): BoardBackground
        {
            return this._background;
        }

        set background(value: BoardBackground)
        {
            this._background = value;
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

            if (this._background === null)
            {
                if (boardConfig.background !== null)
                {
                    return false;
                }
            }
            else
            {
                if (!this._background.equals(boardConfig.background))
                {
                    return false;
                }
            }

            return true;
        }

        static fromJson(json: any): BoardConfig
        {
            Guard.notNullOrEmpty(json, "json");

            try
            {
                var boardConfig: BoardConfig = new BoardConfig(json._boardId);

                if (json._background)
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

                    boardConfig.background = boardBackground;
                }

                return boardConfig;
            }
            catch (e)
            {
                console.error(e.message);
                throw new RangeError("Invalid BoardConfig json format: '" + json + "'");
            }
        }
    }
}