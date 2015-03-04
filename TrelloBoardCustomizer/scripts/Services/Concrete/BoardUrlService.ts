/// <reference path="../../References.ts" />
module TrelloBoardCustomizer.Services.Concrete
{
    import IBoardUrlService = Services.Abstract.IBoardUrlService;
    import Guard = Utils.Guard;
    import Url = Models.Url;

    export class BoardUrlService implements IBoardUrlService
    {
        private _hostName: string;
        private _boardSegmentName: string;
        private _boardIdSegmentIndex: number;

        constructor(hostName: string, boardSegmentName: string, boardIdSegmentIndex: number)
        {
            Guard.notNullOrEmpty(hostName, "hostName");
            Guard.notNullOrEmpty(boardSegmentName, "boardSegmentName");
            Guard.numberIsGreaterOrEqualToZero(boardIdSegmentIndex, "boardIdSegmentIndex");

            this._hostName = hostName;
            this._boardSegmentName = boardSegmentName;
            this._boardIdSegmentIndex = boardIdSegmentIndex;
        }

        getBoardIdFromUrl(url: Url): string
        {
            Guard.notNull(url, "url");

            if (!this.isBoardUrl(url))
            {
                return "";
            }

            return url.segments[this._boardIdSegmentIndex];
        }

        isBoardUrl(url: Url): boolean
        {
            Guard.notNull(url, "url");

            var result: boolean = url.hostname === this._hostName && url.segments.length >= this._boardIdSegmentIndex + 1 && url.segments[0] === this._boardSegmentName;

            return result;
        }
    }
}