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

            this._color = this.validateColor(value);
        }

        set image(value: string)
        {
            Guard.notNull(value, "value");

            this._image = this.validateImage(value);
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

        private validateColor(colorString: string): string
        {
            var divElement: HTMLDivElement = document.createElement("div");

            divElement.style.backgroundColor = colorString;

            var color: string = divElement.style.backgroundColor;

            if (!color)
            {
                color = "";
            }

            return color;
        }

        private validateImage(imageUrl: string): string
        {
            var image: string;

            if (imageUrl === "none" || imageUrl === "initial" || imageUrl === "inherit")
            {
                image = "";
            }
            else
            {
                var divElement: HTMLDivElement = document.createElement("div");

                divElement.style.backgroundImage = "url(" + imageUrl + ")";

                image = divElement.style.backgroundImage;

                if (image)
                {
                    image = image.substring(4, image.length - 1);
                }
                else
                {
                    image = "";
                }
            }

            return image;
        }
    }
}