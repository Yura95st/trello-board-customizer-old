/// <reference path="Utils/Guard.ts" />
/// <reference path="Models/Url.ts" />
/// <reference path="Models/BoardConfig.ts" />
/// <reference path="Repository/IBoardConfigRepository.ts" />
module BoardCustomizer
{
    import Guard = Utils.Guard;
    import IBoardConfigRepository = Repository.IBoardConfigRepository;

    export class BoardCustomizer
    {
        private static regexString: string = "@@\.boardconfig={[\\s\\S]*}";
        private static cardTitleClass: string = "list-card-title";
        private static styleContainerId: string = "trello_board_cutomizer_style";
        private static urlHostName: string = "trello.com";
        private static urlBoardSegment: string = "b";
        private static urlBoardSegmentsMinNumber: number = 2;

        private _document: Document;
        private _repository: IBoardConfigRepository;

        constructor(document: Document, repository: IBoardConfigRepository)
        {
            Guard.notNull(document, "document");
            Guard.notNull(repository, "repository");

            this._document = document;
            this._repository = repository;
        }

        private startFromLocalStorage(boardId: string): void
        {
            var boardConfig: Models.BoardConfig = this._repository.getById(boardId);

            if (boardConfig !== null)
            {
                this.customize(boardConfig);
            }
        }

        private startUsual(boardId: string): void
        {
            var boardConfigString: string = this.getBoardConfigString();

            var boardConfig: Models.BoardConfig = this.getBoardConfig(boardId, boardConfigString);

            var localBoardConfig: Models.BoardConfig = this._repository.getById(boardId);

            if (boardConfig !== null)
            {
                if (!boardConfig.equals(localBoardConfig))
                {
                    if (localBoardConfig === null)
                    {
                        this._repository.insert(boardConfig);
                    }
                    else
                    {
                        this._repository.update(boardConfig);
                    }

                    this._repository.save();

                    this.customize(boardConfig);
                }
            }
            else
            {
                this.deleteStyleContainer();

                if (localBoardConfig !== null)
                {
                    this._repository.remove(localBoardConfig);

                    this._repository.save();
                }
            }
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
                if (boardConfigString.length > 0)
                {
                    var data: any = JSON.parse(boardConfigString);

                    boardConfig = new Models.BoardConfig(boardId);

                    boardConfig.background = this.getBoardBackground(data.background);
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