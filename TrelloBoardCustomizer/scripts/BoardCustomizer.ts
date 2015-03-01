/// <reference path="Utils/Guard.ts" />
/// <reference path="Models/Url.ts" />
/// <reference path="Models/BoardConfig.ts" />
/// <reference path="Services/IBoardConfigService.ts" />
module BoardCustomizer
{
    import Guard = Utils.Guard;
    import IBoardConfigService = Services.IBoardConfigService;

    export class BoardCustomizer
    {
        private static styleContainerId: string = "trello_board_cutomizer_style";
        private static urlHostName: string = "trello.com";
        private static urlBoardSegment: string = "b";
        private static urlBoardSegmentsMinNumber: number = 2;

        private _document: Document;
        private _boardConfigService: IBoardConfigService;

        constructor(document: Document, boardConfigService: IBoardConfigService)
        {
            Guard.notNull(document, "document");
            Guard.notNull(boardConfigService, "boardConfigService");

            this._document = document;
            this._boardConfigService = boardConfigService;
        }

        private startFromLocalStorage(boardId: string): void
        {
            var boardConfig: Models.BoardConfig = this._boardConfigService.getLocalBoardConfig(boardId);

            if (boardConfig !== null)
            {
                this.customize(boardConfig);
            }
        }

        private startUsual(boardId: string): void
        {
            var boardConfig: Models.BoardConfig = this._boardConfigService.getBoardConfig(boardId);
            var localBoardConfig: Models.BoardConfig = this._boardConfigService.getLocalBoardConfig(boardId);

            if (boardConfig !== null)
            {
                if (!boardConfig.equals(localBoardConfig))
                {
                    this.customize(boardConfig);
                }
            }
            else
            {
                this.deleteStyleContainer();

                boardConfig = new Models.BoardConfig(boardId);
            }

            this._boardConfigService.saveBoardConfig(boardConfig);
        }

        start(isFromLocalStorageMode?: boolean): void
        {
            var url: Models.Url = new Models.Url(this._document.URL);

            if (!this.isBoardUrl(url))
            {
                return;
            }

            var boardId: string = this.getBoardIdFromUrl(url);

            if (isFromLocalStorageMode)
            {
                this.startFromLocalStorage(boardId);
            }
            else
            {
                this.startUsual(boardId);
            }
        }

        private customize(boardConfig: Models.BoardConfig): void
        {
            var styleContainer: HTMLElement = this.getStyleContainer();

            styleContainer.innerText = this.generateStyle(boardConfig);
        }

        private getStyleContainer(): HTMLElement
        {
            var styleContainer: HTMLElement = this._document.getElementById(BoardCustomizer.styleContainerId);

            if (!styleContainer)
            {
                styleContainer = this._document.createElement("style");
                styleContainer.setAttribute("id", BoardCustomizer.styleContainerId);

                this._document.body.appendChild(styleContainer);
            }

            return styleContainer;
        }

        private deleteStyleContainer(): void
        {
            var styleContainer: HTMLElement = this._document.getElementById(BoardCustomizer.styleContainerId);

            if (styleContainer)
            {
                this._document.body.removeChild(styleContainer);
            }
        }

        private generateStyle(boardConfig: Models.BoardConfig): string
        {
            var newStyle: string = "";

            newStyle += this.generateBackgroundStyle(boardConfig.background);

            return newStyle;
        }

        private generateBackgroundStyle(boardBackground: Models.BoardBackground): string
        {
            var newStyle: string = "";

            if (boardBackground)
            {
                newStyle += "body {";

                if (boardBackground.image)
                {
                    newStyle += "background-image: url(\"" + boardBackground.image + "\") !important;";
                }

                if (boardBackground.color)
                {
                    newStyle += "background-color: " + boardBackground.color + " !important;";
                }

                newStyle += "}";
            }

            return newStyle;
        }

        private isBoardUrl(url: Models.Url): boolean
        {
            return url.hostname === BoardCustomizer.urlHostName && url.segments.length >= BoardCustomizer.urlBoardSegmentsMinNumber && url.segments[0] === BoardCustomizer.urlBoardSegment;
        }

        private getBoardIdFromUrl(url: Models.Url): string
        {
            return url.segments[1];
        }
    }
}