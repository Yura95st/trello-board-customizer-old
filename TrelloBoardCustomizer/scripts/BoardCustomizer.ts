/// <reference path="Services/IBoardConfigService.ts" />
/// <reference path="Services/BoardStyleService/IBoardStyleService.ts" />
/// <reference path="Models/Url.ts" />
module BoardCustomizer
{
    import Guard = Utils.Guard;
    import IBoardConfigService = Services.IBoardConfigService;
    import IBoardStyleService = Services.BoardStyleService.IBoardStyleService;

    export class BoardCustomizer
    {
        private static urlHostName: string = "trello.com";
        private static urlBoardSegment: string = "b";
        private static urlBoardSegmentsMinNumber: number = 2;

        private _document: Document;
        private _boardConfigService: IBoardConfigService;
        private _boardStyleService: IBoardStyleService;

        constructor(document: Document, boardConfigService: IBoardConfigService, boardStyleService: IBoardStyleService)
        {
            Guard.notNull(document, "document");
            Guard.notNull(boardConfigService, "boardConfigService");
            Guard.notNull(boardStyleService, "boardStyleService");

            this._document = document;
            this._boardConfigService = boardConfigService;
            this._boardStyleService = boardStyleService;
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

        private getBoardIdFromUrl(url: Models.Url): string
        {
            return url.segments[1];
        }

        private isBoardUrl(url: Models.Url): boolean
        {
            return url.hostname === BoardCustomizer.urlHostName && url.segments.length >= BoardCustomizer.urlBoardSegmentsMinNumber && url.segments[0] === BoardCustomizer.urlBoardSegment;
        }

        private startFromLocalStorage(boardId: string): void
        {
            var boardConfig: Models.BoardConfig = this._boardConfigService.getLocalBoardConfig(boardId);

            if (boardConfig !== null)
            {
                this._boardStyleService.applyStyle(boardConfig);
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
                    this._boardStyleService.applyStyle(boardConfig);
                }
            }
            else
            {
                this._boardStyleService.removeStyle();

                boardConfig = new Models.BoardConfig(boardId);
            }

            this._boardConfigService.saveBoardConfig(boardConfig);
        }
    }
}