<img width="986" alt="image" src="https://user-images.githubusercontent.com/43723280/159681858-6baddc1b-b9a0-48ec-b642-0cb85c9df84c.png">

## Project setup
1. First you must have node.js installed

2. Clone this repository, and cd to dashboard-screenshooterv2

3. Then Run
```
npm start
```

4. after this go to /dashboard-screenshooterv2/bin/mac folder you should find the .app 

5. Now you could move and run your app anywhere

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

   | Label        | Description           |
   | ------------- |:-------------:| 
   | Time to Wait in Page (second) | amount of time needed for the app to take screenshots/scrape value | 
   | Timeout Duration in (second) | number of seconds until for the page timesout |  
   | Window Width (pixel) | bounding window size (width)|   
   | Window Height (pixel) | bounding window size (height)|

2. Next filled in the global variables required to be dynamically replaced in the dashboard url, these value can correlate to one another in curly braces format (ex : {```<other listed global variabl>```} and use toTimestamp function (for date format only)
  
3. (Optional) Fill the confluence credentials, this is used to generate confluence document in later mentioned steps
  
   | Label        | Description           |
   | ------------- |:-------------:| 
   | Email | email registered to Confluence | 
   | Confluence API Key | API Key, this can be generated here : https://id.atlassian.com/manage-profile/security/api-tokens|  
  
  
4. Afterward fill the dashboard links configurations, press the Add Link button, then fill the dashboard name (note: it must be unique), once its done press save and the dashboard card will inserted with the following inputs.
  
   | Label        | Description           |
   | ------------- |:-------------:| 
   | Main Selector | Main dashboard selector/HTML elements that contains the dashboard, this is used for getting the bounding box size of the dashboard | 
   | Link URL | URL Address for the dashboard, it can contain parameter from the global variable for dynamic values using curly braces format, if the value exist in global var it will turn green, else its red| 
   | Scrapper | this are list of selector to gather value inside the dashboard| 
  
   Scrapper consist of multiple inputs there are :

   | Label        | Description           |
   | ------------- |:-------------:| 
   | Parent Selector | the selector/HTML elements that contains the value and the title that want to be scrapped | 
   | Title Selector | the selector/HTML elements that contains the title value |
   | Title Text (Optional) | text title if the title selector isn't available | 
   | Value Selector (Multiple) | consist of multiple selector/HTML elements that contains the value (this will be concatenate with space) | 
  
5. (Optional) Next step is to check for stored session for selected dashboard, if there is no or expired session, you must click the url to the page or press Login All Session, it will open a browser and once you login to all the pages, you can go back to the app and click confirm
  
6. If the login session is done, you can start shooting or select specific dashboard, the process will start and you can preview the results. the file results will be stored in your local directory at /result (relative to the app folder)
  
7. (Optional) if you want to generate a Confluence report, you can click Generate Confluence Report button and input the page template link. the value format in the Confluence document template should have : 

   | Format        | Description           |
   | ------------- |:-------------:| 
   | ```{<dashboard name>.scrapper.<scrapper title>}``` | this is to print scrapper value | 
   | ```{<dashboard name>.image}``` | this is to upload dashboard image |

   Here is some example
   
   <img width="808" alt="image" src="https://user-images.githubusercontent.com/43723280/159702773-0ecddce0-c557-46b4-b918-0f0223f278b2.png">

   After that you can choose either to create a copy (it requires a page title and it must not be duplicate) or update the current template (all placeholder will be replaced with value either its empty or not)



  


