# Puppeteer crawler that scrolls a page down until find a specifig keyword. 

### Useful for scrolling pages with dinamyc content, like facebook, instagram, linkedin, etc

Here is a simple demonstration used in a real automation task cenario.

1. `npm install`
2. Create a `config.json` file and set page, user and pass parameters as json attributes. i.e
```
{
    "keyword": "myKeyword",
    "page": "mypage",
    "notificationTitle" : "myNotificationTitle"
}
```
3. Run `node index.js`
4. Result will be displayed in the console. Un case of keyword found, a notfication will be sent to the operational system