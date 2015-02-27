/// <reference path="Utils/Guard.ts" />
/// <reference path="Models/Url.ts" />
/// <reference path="Models/BoardConfig.ts" />
/// <reference path="Enums/BoardCustomizerMode.ts" />
module BoardCustomizer
{
    import Guard = Utils.Guard;

    export class BoardCustomizer
    {
        private static regexString: string = "@@\.boardconfig={[\\s\\S]*}";
        private static cardTitleClass: string = "list-card-title";
        private static urlHostName: string = "trello.com";
        private static urlBoardSegment: string = "b";
        private static urlBoardSegmentsMinNumber: number = 2;
        private static boardConfigStorage: string = "boardConfig";

        private _document: Document;

        constructor(document: Document)
        {
            Guard.notNull(document, "document");

            this._document = document;
        }

        start(): void
        {
            var url: Models.Url = new Models.Url(this._document.URL);

            if (!this.isBoardUrl(url))
            {
                return;
            }

            var boardId: string = this.getBoardIdFromUrl(url);
            console.info(boardId);

            var boardConfigString: string = this.getBoardConfigString();
            console.info(boardConfigString);

            var boardConfig: Models.BoardConfig = this.getBoardConfig(boardId, boardConfigString);
            console.info(boardConfig);

            this.customize(boardConfig);
        }

        private customize(boardConfig: Models.BoardConfig): void
        {
            if (boardConfig === null)
            {
                return;
            }

            this.changeBackground(boardConfig.background);
        }

        private changeBackground(boardBackground: Models.BoardBackground)
        {
            var newStyle: string = this._document.body.getAttribute("style");

            if (boardBackground.image)
            {
                newStyle += " background-image: url(\"" + boardBackground.image + "\") !important;";
            }

            if (boardBackground.color)
            {
                newStyle += " background-color: " + boardBackground.color + " !important;";
            }

            this._document.body.setAttribute("style", newStyle);
        }

        private isBoardUrl(url: Models.Url): boolean
        {
            return url.hostname === BoardCustomizer.urlHostName && url.segments.length >= BoardCustomizer.urlBoardSegmentsMinNumber && url.segments[0] === BoardCustomizer.urlBoardSegment;
        }

        private getBoardIdFromUrl(url: Models.Url): string
        {
            return url.segments[1];
        }

        private getBoardConfigString(): string
        {
            var boardConfigString: string = "";

            var cardTitleNodeList: NodeList = this._document.getElementsByClassName(BoardCustomizer.cardTitleClass);

            var regex: RegExp = new RegExp(BoardCustomizer.regexString);

            for (var i: number = 0; i < cardTitleNodeList.length; i++)
            {
                var cardTitleNode: Node = cardTitleNodeList.item(i);

                if (cardTitleNode.hasChildNodes())
                {
                    cardTitleNode = cardTitleNode.lastChild;
                }

                var cardTitleText: string = cardTitleNode.textContent.trim();

                if (regex.test(cardTitleText))
                {
                    boardConfigString = cardTitleText.substr(cardTitleText.indexOf("=") + 1);
                    break;
                }
            }

            return boardConfigString;
        }

        private getBoardConfig(boardId: string, boardConfigString: string): Models.BoardConfig
        {
            var boardConfig: Models.BoardConfig = null;

            try
            {
                var data: any = JSON.parse(boardConfigString);

                var boardBackground: Models.BoardBackground = this.getBoardBackground(data.background);

                if (boardBackground !== null)
                {
                    boardConfig = new Models.BoardConfig(boardId, boardBackground);
                }
            }
            catch (e)
            {
                console.error("Invalid config format.");
                console.error(e.message);
            }
            finally
            {
                return boardConfig;
            }
        }

        private getBoardBackground(data: any): Models.BoardBackground
        {
            var boardBackground: Models.BoardBackground = null;

            try
            {
                if (data)
                {
                    boardBackground = new Models.BoardBackground();

                    if (data.color)
                    {
                        boardBackground.color = data.color;
                    }

                    if (data.image)
                    {
                        boardBackground.image = data.image;
                    }
                }
            }
            catch (e)
            {
                console.error(e.message);
            }
            finally
            {
                return boardBackground;
            }
        }
    }
}