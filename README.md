# Typewrite.js
Mimic the appearance of typing on the screen.

Originally written by Simon Shahriveri: https://codepen.io/hi-im-si/pen/DHoup

Modified by Gooborg Studios © 2018.

## Usage
Add the "typewrite" class to a DOM element to add the typewriter animation to.  Then, add at least the `data-typewrite-text` attribute (the rest are optional).

## DOM Element Attributes
- **data-typewrite-text**: a string or JSON-formatted list of strings to cycle through.
- **data-typewrite-period**: a number, in milliseconds, indicating how long the text remains on the screen.
- **data-typewrite-typing-speed**: a number, in milliseconds, for how fast to type the characters on screen.
- **data-typewrite-typing-speed-variance**: a number, in milliseconds, on how much to vary the typing speed per character, adding a more realistic touch.
- **data-typewrite-deleting-speed**: a number, in milliseconds, indicating how fast to delete each character.

## Example
```html
<h1 class="typewrite" data-typewrite-text='["We are the gooborgs.", "We will assimilate all."]' data-typewrite-period="2000"></h1>
```