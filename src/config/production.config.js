/*
 */

export const config = {
    appName:'_no_set_',
    PORT:3002,
    mysql: {
        host: "10.9.21.58",
        port: process.env.SQLPORT || "3306",
        user: "gankao_zhuli",
        password: "gankaozhuli123",
        charset: "utf8_general_ci",
        database: "gankao_zhuli"
    },
    redis: {
        host: "10.9.193.140",
        port: 6379,
        password:'gankao123poi',
        cache_prefx:'gk_zhuli_',
        defaultExpireSecond:10*60
    }
}