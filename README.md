> 项目介绍

小米读书软件 

> 技术栈

gulp + require + handlebars + ES6/7 + ajax

> 项目运行

```
    git clone git@github.com:guanqixin/sc1.git
    npm install --save-dev
    npm run build
```

> 目录结构

```
book
    |——mock
    |    |——user
    |    |    |---user.json 
    |    |——index
    |    |    |---home.json
    |    |    |---recommend1.json  
    |    |    |---recommend2.json  
    |    |    |---recommend3.json  
    |    |——search
    |    |    |---search.json 
    |    |    |---searchKey.json
    |    |——detail
    |    |    |---352876.json 
    |    |——reader
    |    |    |---chapter-list.json 
    |    |    |---data1.json 
    |    |    |---data2.json   
    |    |    |---data3.json   
    |    |    |---data4.json   
    |    |-index.js      
    |——build
    |    |——page
    |    |    |——search.html
    |    |    |——text.html
    |    |    |——detail.html 
    |    |    |——menu.html
    |    |    |——login.html 
    |    |——js
    |    |    |——common
    |    |    |    |-temp.js  
    |    |    |    |-getUrl.js
    |    |    |——index
    |    |    |    |-index.js  
    |    |    |——search
    |    |    |    |-index.js   
    |    |    |——text
    |    |    |    |-index.js 
    |    |    |——detail
    |    |    |    |-index.js   
    |    |    |——menu
    |    |    |    |-index.js   
    |    |    |——login
    |    |    |    |-index.js   
    |    |    |——lib
    |    |    |    |-require.js
    |    |    |    |-handlebars.js
    |    |    |    |-flexible.js
    |    |    |    |-jquery.js
    |    |    |    |-jquery.lazyload.js 
    |    |    |    |-jquery.base64.js
    |    |    |    |-require.text.js
    |    |    |——config.js
    |    |——css
    |    |    |-index.css
    |    |    |-common.css
    |    |    |-detail.css
    |    |    |-text.css
    |    |    |-menu.css
    |    |    |-search.css
    |    |——template
    |    |    |-index.html  
    |    |    |-bolck-list.html
    |    |    |-dl-list.html 
    |    |    |-recommend-list.html
    |    |    |-detail.html
    |    |-index.html
    |-gulpfile.js

