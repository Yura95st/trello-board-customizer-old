/// <reference path="References.ts" />
//declare var chrome: any;

var dataStorage: DataStorage.Abstract.IDataStorage = new DataStorage.Concrete.LocalDataStorage();

var repository: Repositories.Abstract.IBoardConfigRepository = new Repositories.Concrete.BoardConfigRepository(dataStorage, "trelloBoardCutomizer-boardConfigs");

var boardConfigService: Services.Abstract.IBoardConfigService = new Services.Concrete.BoardConfigService(document, repository, "@@boardConfig={[\\s\\S]*}", "list-card-title");

var boardStyleService: Services.Abstract.IBoardStyleService = new Services.Concrete.BoardStyleService(document, "trello_board_cutomizer_style");

var boardUrlService: Services.Abstract.IBoardUrlService = new Services.Concrete.BoardUrlService("trello.com", "b", 1);

var boardCustomizer: BoardCustomizer.BoardCustomizer = new BoardCustomizer.BoardCustomizer(boardUrlService, boardConfigService, boardStyleService);

boardCustomizer.start(document.URL, true);

window.onload = () =>
{
    window.setInterval(() =>
    {
        boardCustomizer.start(document.URL);
    }, 100);
};