/// <reference path="IBoardConfigService.ts" />
/// <reference path="../Repository/IBoardConfigRepository.ts" />
module Services
{
    import Guard = Utils.Guard;
    import IBoardConfigRepository = Repository.IBoardConfigRepository;

    export class BoardConfigService implements IBoardConfigService
    {
        private static regexString: string = "@@boardConfig={[\\s\\S]*}";
        private static cardTitleClass: string = "list-card-title";

        private _document: Document;
        private _repository: IBoardConfigRepository;

        constructor(document: Document, repository: IBoardConfigRepository)
        {
            Guard.notNull(document, "document");
            Guard.notNull(repository, "repository");

            this._document = document;
            this._repository = repository;
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

            var cardTitleNodeList: NodeList = this._document.getElementsByClassName(BoardConfigService.cardTitleClass);

            if (cardTitleNodeList.length > 0)
            {
                var regex: RegExp = new RegExp(BoardConfigService.regexString);

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