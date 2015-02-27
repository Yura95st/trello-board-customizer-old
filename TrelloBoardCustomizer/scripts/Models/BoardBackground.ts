/// <reference path="../Utils/Guard.ts" />

module Models
{
    import Guard = Utils.Guard;

    export class BoardBackground
    {
        private _color: string;
        private _image: string;

        constructor()
        {
            this._color = "";
            this._image = "";
        }

        get color(): string
        {
            return this._color;
        }

        get image(): string
        {
            return this._image;
        }

        set color(value: string)
        {
            Guard.notNull(value, "value");

            this._color = value;
        }

        set image(value: string)
        {
            Guard.notNull(value, "value");

            this._image = value;
        }

        equals(boardBackground: BoardBackground): boolean
        {
            if (boardBackground === undefined || boardBackground === null)
            {
                return false;
            }

            if (this._color !== boardBackground._color)
            {
                return false;
            }

            if (this._image !== boardBackground._image)
            {
                return false;
            }

            return true;
        }
    }
}