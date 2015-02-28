Trello Board Customizer
====================
The extension for Chrome and Safari browsers to customize your Trello Board's background.

## Installation (Chrome)

1. Create new empty directory in which extension files will live (e.g. `trello_board_customizer`);
2. Copy `manifest.json` file from `TrelloBoardCustomizer/Chrome` directory to `trello_board_customizer` directory;
3. Copy `TrelloBoardCustomizer/scripts` and `TrelloBoardCustomizer/images` directories to `trello_board_customizer` directory;
4. Compile all <a href="http://www.typescriptlang.org/">TypeScript</a> files `(.ts)` from `trello_board_customizer/scripts` directory in JavaScript ones;
5. <a href="https://developer.chrome.com/extensions/getstarted#unpacked">Load the extention</a> to Chrome;
6. Enjoy!

## Installation (Safari)

1. Create new empty directory in which extension files will live (e.g. `trello_board_customizer`);
2. Copy `Info.plist` file from `TrelloBoardCustomizer/Safari` directory to `trello_board_customizer` directory;
3. Copy all images from `TrelloBoardCustomizer/images` directory to `trello_board_customizer` directory;
4. Copy `TrelloBoardCustomizer/scripts` directory to `trello_board_customizer` directory;
5. Compile all <a href="http://www.typescriptlang.org/">TypeScript</a> files `(.ts)` from `trello_board_customizer/scripts` folder in JavaScript ones;
6. Open <a href="https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/UsingExtensionBuilder/UsingExtensionBuilder.html#//apple_ref/doc/uid/TP40009977-CH2-SW10">Extension Builder</a> in Safari;
7. Click the `+` button, choose `Add Extension` and select `trello_board_customizer` directory;
8. Click the `Install` button;
8. Enjoy!

## How to use

Add new card with this content to the board You want to customize:

```json
@@.boardconfig={
    "background": {
        "color":"<color_value>",
        "image":"<image_url>"
    }
}
```

## Example

```json
@@.boardconfig={
    "background": {
        "color":"#3AA497",
        "image":"https://trello-attachments.s3.amazonaws.com/54ed143df7905fb3cc1dcb44/1600x1000/c92f0c41963954b7f96821638f2a07fc/road-and-cloudy-blue-sky-new-desktop-wallpapers-in-high-resolution-fullscreen.jpg"
    }
}
```