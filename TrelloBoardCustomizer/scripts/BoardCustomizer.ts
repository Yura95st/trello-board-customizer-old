/// <reference path="References.ts" />
module TrelloBoardCustomizer
{
    import IBoardUrlService = Services.Abstract.IBoardUrlService;
    import IBoardConfigService = Services.Abstract.IBoardConfigService;
    import IBoardStyleService = Services.Abstract.IBoardStyleService;
    import Guard = Utils.Guard;
    import Url = Models.Url;

    export class BoardCustomizer
    {
        private _boardUrlService: IBoardUrlService;
        private _boardConfigService: IBoardConfigService;
        private _boardStyleService: IBoardStyleService;

        constructor(boardUrlService: IBoardUrlService, boardConfigService: IBoardConfigService, boardStyleService: IBoardStyleService)
        {
            Guard.notNull(boardUrlService, "boardUrlService");
            Guard.notNull(boardConfigService, "boardConfigService");
            Guard.notNull(boardStyleService, "boardStyleService");

            this._boardUrlService = boardUrlService;
            this._boardConfigService = boardConfigService;
            this._boardStyleService = boardStyleService;
        }

        start(urlString: string, isFromLocalStorageMode?: boolean): void
        {
            Guard.notNullOrEmpty(urlString, "urlString");

            var url: Url = new Url(urlString);

            if (!this._boardUrlService.isBoardUrl(url))
            {
                return;
            }

            var boardId: string = this._boardUrlService.getBoardIdFromUrl(url);

            if (isFromLocalStorageMode)
            {
                this.startFromLocalStorage(boardId);
            }
            else
            {
                this.startUsual(boardId);
            }
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