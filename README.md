# Messenger-Parser

I spend a lot of time on Messenger and I believe that small extentions can not only improve my conversations on the site but teach me to have better conversations in general - offline and online.

So that's why I'm open-sourcing Messenger Parser, so that we can all figure out the hard parts of conversation together.

This bare-bones script parses messenger conversations (via the dom) and converts them into an array of json objects like so:

```
[
  {
    msg: "This is a text",
    person: "Curtis",
    timeSent: "10:19pm",
    type: "text"
  },
  {
    person: "Curtis",
    timeSent: "10:20pm",
    type: "img"
  }
]
```
Note: open up the js console in Chrome to see the messages parsed by this extension.

### Features:
 - Can detect images, attachments, and text messages.
 - Can detect when someone in the chat sends a message.
 - A reload button to reparse the entire dom at once.
 - A beautiful show/hide button that will make

### Known bugs:
 - Sometimes when someone (that isn't you) sends a message, the event listener doesn't pick it up.

### TODO:
 - The ability to convert the Messenger timestamps into a UTC date.
 - I've looked at the DOM and there only seems to be 3 cases for the types of dates that needs to be parsed. So it shouldn't be too hard.



# Installation

First you'll need to install the dependencies. We can do this by downloading the js dependency files from [CDNs](https://en.wikipedia.org/wiki/Content_delivery_network) using `curl`.
```
curl https://code.jquery.com/jquery-3.3.1.min.js > dependencies/jquery-3.3.1.min.js
```

Now follow the advice from [Thoughbot](https://thoughtbot.com/blog/how-to-make-a-chrome-extension#load-your-extension-into-chrome):

> To load your extension in Chrome, open up chrome://extensions/ in your browser and click “Developer mode” in the top right. Now click “Load unpacked extension…” and select the extension’s directory. You should now see your extension in the list. <br>
> When you change or add code in your extension, just come back to this page and reload the page. Chrome will reload your extension.


# Development Notes (please read if you haven't made a chrome extension before!):

I would highly recommend by starting with:
https://thoughtbot.com/blog/how-to-make-a-chrome-extension

This will get you acquainted with the restrictions (and work arounds) that you'll face when writing Chrome extensions.

Next you should get the [Extensions Reloader](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid) chrome extension. This will toggle your extension off/on when you click the icon in your extensions bar. Use this everytime you make a change to your code or you won't see the updates!

**Warning**

If you change the [`manifest.json`](manifest.json) you must manually turn off/on the extension in `chrome://extensions/` or your changes won't propagate. Extensions Reloader will not work for manifest changes.
