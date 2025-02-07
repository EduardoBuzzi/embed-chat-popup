# embed-chat-popup

_An Embed Chat Popup written in TypeScript for Your Web Pages_

## Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
    - [Options](#options)
    - [Styling](#styling)
- [Examples](#examples)
- [License](#license)

## Introduction

**EmbedChatPopup** is a lightweight JavaScript library that enables you to embed a customizable chat popup into your web pages. You can easily configure its position, styles, and behavior using JavaScript options.

## Installation

### 1\. Using a Script Tag

Download the compiled file from '[dist/embed-chat-popup.umd.js](dist/embed-chat-popup.umd.js)' and include it in your HTML:
```html
<script src="/path/to/embed-chat-popup.umd.js"></script>
```
Or you can simply copy the file contents and place them inside a script tag:
```html
<script type="text/javascript">
//... paste here
</script>
```
This makes `EmbedChatPopup` available globally in `window.EmbedChatPopup`.

### 2\. Using TypeScript/ES Modules

If you're using a module-based environment, install the package and import it:

```
import { EmbedChatPopup } from 'embed-chat-popup';
```

## Usage

To initialize the chat popup, instantiate the `EmbedChatPopup` class and provide the chat page URL along with optional configurations:

```html
<script type="text/javascript">
    document.addEventListener('DOMContentLoaded', () => {
        new EmbedChatPopup('https://mychatbotpage.example');
    })
</script>
```

### Parameters

The `EmbedChatPopup` class accepts two parameters:

1\.  **Chat Bot URL (string):** The first argument must be the URL of the chatbot page to be embedded.

2\.  **Options (object, optional):** An optional object that allows customizing the appearance and behavior of the chat popup.

Here are the available options:

| Option    | Type              | Default   | Description                                                                           |
| :-------- | :---------------: | :-------: | :------------------------------------------------------------------------------------ |
| position  | string            | `'right'` | Determines where the chat popup appears on the screen. Can be `'left'` or `'right'`.  |
| styles    | object            | `{}`      | An object containing custom CSS styles for the chat popup. [See here](#styling).                  |
| backdrop  | boolean or string | `false`   | If `true`, adds a backdrop overlay. If a string, applies a custom backdrop color.     |

#### Styling

You can modify the appearance of the chat popup via JavaScript options:

```
styles: {
    iconColor: 'black',
    iconOpacity: 0.7,
    background: 'linear-gradient(lightblue, red)'
    backgroundColor: 'red',
}
```

<!-- Alternatively, you can override the default styles using CSS:

```
.embed-chat-popup {
}
``` -->

## Examples

Here are some usage examples:

### Example 1: Default Chat Popup

```javascript
new EmbedChatPopup('/chatbot.html');
```

### Example 2: Custom Positioned Chat

```javascript
new EmbedChatPopup('/chatbot.html', { position: 'left' });
```

### Example 3: Without backdrop

```javascript
new EmbedChatPopup('/chatbot.html', { backdrop: false });
```

### Example 4: Styled Chat Button

```javascript
new EmbedChatPopup('/chatbot.html', {
    styles: {
        iconColor: 'blue',
        background: '#f4f4f4'
    }
});
```

### Example 5: Fully modified

```javascript
new EmbedChatPopup(
    '/chatbot.html', 
    {
        position: 'left',
        styles: {
            iconColor: 'black',
            iconOpacity: .7,
            background: 'linear-gradient(#08d78b, #047f52)',
            backgroundColor: '#047f52',
        },
        backdrop: 'rgb(12, 77, 48, .1)',
    }
);
```

## License

Open-sourced software licensed under the [MIT license](LICENSE).
