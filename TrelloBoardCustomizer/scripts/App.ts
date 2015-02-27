/// <reference path="BoardCustomizer.ts" />
declare var chrome: any;

var boardCustomizer: BoardCustomizer.BoardCustomizer = new BoardCustomizer.BoardCustomizer(document);

window.onload = () =>
{
    boardCustomizer.start();
};