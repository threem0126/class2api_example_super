 
 #开发环境 #
 `
 $ npm start 
 `
 
 #测试环境 #
 `
 $ NODE_ENV=test REDIS_SESSION=1 node ./src/index.js 
 $ NODE_ENV=test REDIS_SESSION=1 pm2 start ecosystem/ecosystem_dev.json 
 `
 
 #正式环境#
 ` 
 $ NODE_ENV=production REDIS_SESSION=1 node ./src/index.js
 $ NODE_ENV=production REDIS_SESSION=1 pm2 start ecosystem/ecosystem.json 
 `
# 初始化或重置数据库 #
 $ FORCE=0 DB_RESET_1=123234537569 DB_RESET_2=wrq5hfoiuy12344376 node toolscript/resetDB.run.js      

#本地启动redis：
cd /usr/local/redis && src/redis-server
cd /usr/local/redis && src/redis-cli 

#nginx
重启 pkill -9 nginx

$ npm i --registry=https://registry.npm.taobao.org 

