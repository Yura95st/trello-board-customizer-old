/// <reference path="../Abstract/IBoardStyleService.ts" />
module Services.Concrete
{
    import IBoardStyleService = Abstract.IBoardStyleService;
    import Guard = Utils.Guard;

    export class BoardStyleService implements IBoardStyleService
    {
        private static styleContainerId: string = "trello_board_cutomizer_style";

        private _document: Document;

        constructor(document: Document)
        {
            Guard.notNull(document, "document");

            this._document = document;
        }

        applyStyle(boardConfig: Models.BoardConfig): void
        {
            Guard.notNull(boardConfig, "boardConfig");

            var styleContainer: HTMLElement = this._document.getElementById(BoardStyleService.styleContainerId);

            if (!styleContainer)
            {
                styleContainer = this._document.createElement("style");
                styleContainer.setAttribute("id", BoardStyleService.styleContainerId);

                this._document.head.appendChild(styleContainer);
            }

            styleContainer.innerText = this.getStyleString(boardConfig);
        }

        removeStyle(): void
        {
            var styleContainer: HTMLElement = this._document.getElementById(BoardStyleService.styleContainerId);

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