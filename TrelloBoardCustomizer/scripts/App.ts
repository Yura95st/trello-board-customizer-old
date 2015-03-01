/// <reference path="DataStorage/Concrete/LocalDataStorage.ts" />
/// <reference path="Repository/BoardConfigRepository.ts" />
/// <reference path="Services/BoardConfigService.ts" />
/// <reference path="Services/BoardStyleService/BoardStyleService.ts" />
/// <reference path="BoardCustomizer.ts" />
//declare var chrome: any;

var dataStorage: DataStorage.Abstract.IDataStorage = new DataStorage.Concrete.LocalDataStorage();

var repository: Repository.IBoardConfigRepository = new Repository.BoardConfigRepository(dataStorage);

var boardConfigService: Services.IBoardConfigService = new Services.BoardConfigService(document, repository);

var boardStyleService: Services.BoardStyleService.IBoardStyleService = new Services.BoardStyleService.BoardStyleService(document);

var boardCustomizer: BoardCustomizer.BoardCustomizer = new BoardCustomizer.BoardCustomizer(document, boardConfigService, boardStyleService);

boardCustomizer.start(true);

window.onload = () =>
{
    window.setInterval(() =>
    {
        boardCustomizer.start();
    }, 100);
};