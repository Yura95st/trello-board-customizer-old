/// <reference path="DataStorage/LocalDataStorage.ts" />
/// <reference path="Repository/BoardConfigRepository.ts" />
/// <reference path="BoardCustomizer.ts" />
declare var chrome: any;

var dataStorage: DataStorage.IDataStorage = new DataStorage.LocalDataStorage();

var repository: Repository.IBoardConfigRepository = new Repository.BoardConfigRepository(dataStorage);

var boardCustomizer: BoardCustomizer.BoardCustomizer = new BoardCustomizer.BoardCustomizer(document, repository);

boardCustomizer.start(true);

window.onload = () =>
{
    boardCustomizer.start();
};