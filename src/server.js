import _config from "./config.js" ;
import * as types from './constants'
import {createServer,setting_redisConfig} from 'class2api'
import {GKErrors} from 'class2api/gkerrors'
import GKModelA from './model/GKModelA';

//types.EXAMPLE

let port = process.env.PORT || _config.PORT ||  8010;
let {redis} = _config
setting_redisConfig(redis)

let node_env = process.env.NODE_ENV || "development"
let isDev = (node_env === "development")

const beforeCall = async ({req, params, modelSetting})=> {
    let {__Auth} = modelSetting
    if(isDev) {
        console.log(`[${ req.originalUrl } beforeCall ]:`)
        console.log('params:....' + JSON.stringify(params))
        console.log('req.header:jwtoken....' + req.header('jwtoken'))
    }
    //根据类的__Auth配置来进行身份验证,具体的验证逻辑由类的修饰器配置决定，这里不进行类静态方法的权限认证
    if (__Auth) {
        let userInfo = await __Auth({req})
        params.uID = userInfo.uID
    }
    return params
}

const afterCall = async ({req,result})=> {
    console.log(`[${ req.originalUrl } afterCall ]:`)
    let {__user} = req
    if (__user) {
        result.__user = __user
    }
    return result
}

//创建微服务对象
createServer({
    modelClasses:[GKModelA, {model:GKModelA, as:'a2'}],
    beforeCall,
    afterCall,
    config:{
        redis,
        cros:true,
        cros_origin:['http://web.domain.com'],
        cros_headers:[]
    },
}).then((server)=>{
    //region 开始监听指定的端口
    server.listen(port, "0.0.0.0",(err)=> {
        if (err) throw err
        console.info("==> 🌎 Listening on http://0.0.0.0:%s/. wait request ...", port);
        if(isDev) console.info("==> For Test: $ mocha test/test.run.js");
    });
    //endregion
}).catch((error)=> {
    setTimeout(function () {
        throw  error
    })
})

