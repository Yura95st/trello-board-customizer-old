/// <reference path="../../References.ts" />
module TrelloBoardCustomizer.Services.Concrete
{
    import IBoardStyleService = Services.Abstract.IBoardStyleService;
    import Guard = Utils.Guard;

    export class BoardStyleService implements IBoardStyleService
    {
        private _document: Document;
        private _styleContainerId: string;

        constructor(document: Document, styleContainerId: string)
        {
            Guard.notNull(document, "document");
            Guard.notNullOrEmpty(styleContainerId, "styleContainerId");

            this._document = document;
            this._styleContainerId = styleContainerId;
        }

        applyStyle(boardConfig: Models.BoardConfig): void
        {
            Guard.notNull(boardConfig, "boardConfig");

            var styleContainer: HTMLElement = this._document.getElementById(this._styleContainerId);

            if (!styleContainer)
            {
                styleContainer = this._document.createElement("style");
                styleContainer.setAttribute("id", this._styleContainerId);

                this._document.head.appendChild(styleContainer);
            }

            styleContainer.innerText = this.getStyleString(boardConfig);
        }

        removeStyle(): void
        {
            var styleContainer: HTMLElement = this._document.getElementById(this._styleContainerId);

            if (styleContainer)
            {
                this._document.head.removeChild(styleContainer);
            }
        }

        private getBackgroundStyleString(boardBackground: Models.BoardBackground): string
        {
            var styleString: string = "";

            if (boardBackground)
            {
                styleString += "body {";

                if (boardBackground.image)
                {
                    styleString += "background-image: url(\"" + boardBackground.image + "\") !important;";
                }

                if (boardBackground.color)
                {
                    styleString += "background-color: " + boardBackground.color + " !important;";
                }

                styleString += "}";
            }

            return styleString;
        }

        private getStyleString(boardConfig: Models.BoardConfig): string
        {
            var styleString: string = "";

            styleString += this.getBackgroundStyleString(boardConfig.background);

            return styleString;
        }
    }
}