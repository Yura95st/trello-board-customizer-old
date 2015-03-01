/// <reference path="References.ts" />
//declare var chrome: any;

var dataStorage: DataStorage.Abstract.IDataStorage = new DataStorage.Concrete.LocalDataStorage();

var repository: Repositories.Abstract.IBoardConfigRepository = new Repositories.Concrete.BoardConfigRepository(dataStorage);

var boardConfigService: Services.Abstract.IBoardConfigService = new Services.Concrete.BoardConfigService(document, repository);

var boardStyleService: Services.Abstract.IBoardStyleService = new Services.Concrete.BoardStyleService(document);

var boardCustomizer: BoardCustomizer.BoardCustomizer = new BoardCustomizer.BoardCustomizer(document, boardConfigService, boardStyleService);

boardCustomizer.start(true);

window.onload = () =>
{
    window.setInterval(() =>
    {
        boardCustomizer.start();
    }, 100);
};