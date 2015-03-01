/// <reference path="../../References.ts" />
module Services.Abstract
{
    import Url = Models.Url;

    export interface IBoardUrlService
    {
        getBoardIdFromUrl(url: Url): string;

        isBoardUrl(url: Url): boolean;
    }
}