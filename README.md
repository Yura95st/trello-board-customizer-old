Trello Board Customizer
====================
Chrome extension to customize your Trello Board's background.

## Instalation

<ol>
    <li>Compile all <a href="http://www.typescriptlang.org/">TypeScript</a> files (.ts) to JavaScript ones;</li>
    <li><a href="https://developer.chrome.com/extensions/getstarted#unpacked">Load the extention</a> in Chrome;</li>
    <li>Enjoy!</li>
</ol>

====================
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
====================
## Example
```json
@@.boardconfig={
  "background": {
    "color":"#3AA497",
    "image":"https://trello-attachments.s3.amazonaws.com/54ed143df7905fb3cc1dcb44/1600x1000/c92f0c41963954b7f96821638f2a07fc/road-and-cloudy-blue-sky-new-desktop-wallpapers-in-high-resolution-fullscreen.jpg"
	}
}
```
