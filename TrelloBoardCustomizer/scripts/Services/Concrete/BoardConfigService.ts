/// <reference path="../../References.ts" />
module TrelloBoardCustomizer.Services.Concrete
{
    import IBoardConfigService = Services.Abstract.IBoardConfigService;
    import IBoardConfigRepository = Repositories.Abstract.IBoardConfigRepository;
    import Guard = Utils.Guard;

    export class BoardConfigService implements IBoardConfigService
    {
        private _document: Document;
        private _repository: IBoardConfigRepository;
        private _boardConfigRegExp: RegExp;
        private _cardTitleClass: string;

        constructor(document: Document, repository: IBoardConfigRepository, boardConfigPattern: string, cardTitleClass: string)
        {
            Guard.notNull(document, "document");
            Guard.notNull(repository, "repository");
            Guard.notNullOrEmpty(boardConfigPattern, "boardConfigPattern");
            Guard.notNullOrEmpty(cardTitleClass, "cardTitleClass");

            this._document = document;
            this._repository = repository;
            this._boardConfigRegExp = new RegExp(boardConfigPattern);
            this._cardTitleClass = cardTitleClass;
        }

        getLocalBoardConfig(boardId: string): Models.BoardConfig
        {
            Guard.notNullOrEmpty(boardId, "boardId");

            return this._repository.getById(boardId);
        }

        getBoardConfig(boardId: string): Models.BoardConfig
        {
            Guard.notNullOrEmpty(boardId, "boardId");

            var boardConfig: Models.BoardConfig = null;

            var boardConfigString: string = this.getBoardConfigString();

            if (boardConfigString.length > 0)
            {
                boardConfig = new Models.BoardConfig(boardId);

                try
                {
                    var data: any = JSON.parse(boardConfigString);

                    boardConfig.background = this.getBoardBackground(data.background);
                }
                catch (e)
                {
                    console.error("Invalid boardConfig format.");
                }
            }

            return boardConfig;
        }

        saveBoardConfig(boardConfig: Models.BoardConfig): void
        {
            Guard.notNull(boardConfig, "boardConfig");

            var currentBoardConfig: Models.BoardConfig = this._repository.getById(boardConfig.boardId);

            if (currentBoardConfig === null)
            {
                this._repository.insert(boardConfig);
            }
            else
            {
                this._repository.update(boardConfig);
            }

            this._repository.save();
        }

        private getBoardConfigString(): string
        {
            var boardConfigString: string = "";

            var cardTitleNodeList: NodeList = this._document.getElementsByClassName(this._cardTitleClass);

            if (cardTitleNodeList.length > 0)
            {
                for (var i: number = 0; i < cardTitleNodeList.length; i++)
                {
                    var cardTitleNode: Node = cardTitleNodeList.item(i);

                    if (cardTitleNode.hasChildNodes())
                    {
                        cardTitleNode = cardTitleNode.lastChild;
                    }

                    var cardTitleText: string = cardTitleNode.textContent.trim();

                    if (this._boardConfigRegExp.test(cardTitleText))
                    {
                        boardConfigString = cardTitleText.substr(cardTitleText.indexOf("=") + 1);
                        break;
                    }
                }
            }

            return boardConfigString;
        }

        private getBoardBackground(data: any): Models.BoardBackground
        {
            var boardBackground: Models.BoardBackground = null;

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

            return boardBackground;
        }
    }
}