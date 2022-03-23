<img width="986" alt="image" src="https://user-images.githubusercontent.com/43723280/159681858-6baddc1b-b9a0-48ec-b642-0cb85c9df84c.png">

## Project setup
1. First you must have node.js installed

2. Then Run
```
npm start
```

3. after this go to /bin/mac folder you should find the .app 

4. Now you could move and run your app anywhere

<!-- ### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
``` -->

### How to use the app
1. Firstly you have to fill all the configurations required by the app, if you have a config file loaded this step can be skipped

| Configuration        | Description           |
| ------------- |:-------------:| 
| Time to Wait in Page (second) | amount of time needed for the app to take screenshots/scrape value | 
| Timeout Duration in (second) | number of seconds until for the page timesout |  
| Window Width (pixel) | bounding window size (width)|   
| Window Height (pixel) | bounding window size (height)|

2. Next filled in the global variables required to be dynamically replaced in the dashboard url, these value can correlate to one another in curly braces format (ex : {<other listed global variable>} and use toTimestamp function (for date format only)
  
3. (Optional) Fill the confluence credentials, this is used to generate confluence document in later mentioned steps
  
| Configuration        | Description           |
| ------------- |:-------------:| 
| Email | email registered to Confluence | 
| Confluence API Key | API Key, this can be generated here : https://id.atlassian.com/manage-profile/security/api-tokens|  

  


