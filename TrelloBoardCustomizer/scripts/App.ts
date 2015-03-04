/// <reference path="References.ts" />
module TrelloBoardCustomizer
{
    import IDataStorage = DataStorage.Abstract.IDataStorage;
    import LocalDataStorage = DataStorage.Concrete.LocalDataStorage;
    import IBoardConfigRepository = Repositories.Abstract.IBoardConfigRepository;
    import BoardConfigRepository = Repositories.Concrete.BoardConfigRepository;
    import IBoardConfigService = Services.Abstract.IBoardConfigService;
    import BoardConfigService = Services.Concrete.BoardConfigService;
    import IBoardStyleService = Services.Abstract.IBoardStyleService;
    import BoardStyleService = Services.Concrete.BoardStyleService;
    import IBoardUrlService = Services.Abstract.IBoardUrlService;
    import BoardUrlService = Services.Concrete.BoardUrlService;

    var dataStorage: IDataStorage = new LocalDataStorage();

    var repository: IBoardConfigRepository = new BoardConfigRepository(dataStorage, "trelloBoardCutomizer-boardConfigs");

    var boardConfigService: IBoardConfigService = new BoardConfigService(document, repository, "@@boardConfig={[\\s\\S]*}", "list-card-title");

    var boardStyleService: IBoardStyleService = new BoardStyleService(document, "trello_board_cutomizer_style");

    var boardUrlService: IBoardUrlService = new BoardUrlService("trello.com", "b", 1);

    var boardCustomizer: BoardCustomizer = new BoardCustomizer(boardUrlService, boardConfigService, boardStyleService);

    boardCustomizer.start(document.URL, true);

    window.onload = () =>
    {
        window.setInterval(() =>
        {
            boardCustomizer.start(document.URL);
        }, 100);
    };

    //declare var chrome: any;
}