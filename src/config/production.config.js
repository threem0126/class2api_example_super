/*
 */

export const config = {
    appName: '{projectName}',
    PORT: 3002,
    mysql: {
        host: "{ip}",
        port: process.env.SQLPORT || "{port}",
        user: "{user}",
        password: "{password}",
        charset: "{charset}",
        database: "{database}"
    },
    redis: {
        host: "127.0.0.1",
        port: 6379,
        cache_prefx: '_no_set_',
        defaultExpireSecond: 10 * 60
    }
}

if(config.redis.cache_prefx === '_no_set_')
    console.error(`请修改config配置中redis的key前缀（${ __dirname }）`)
if(config.mysql.host === '{ip}')
    console.error(`请修改config配置中mysql链接信息（${ __dirname }）`)