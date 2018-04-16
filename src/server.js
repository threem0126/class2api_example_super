import _config from "./config.js" ;
import * as types from './constants'
import {createServer,setting_redisConfig} from 'class2api'
import {GKErrors} from 'class2api/gkerrors'
import GKModelA from './model/GKModelA';

let {redis} = _config
setting_redisConfig(redis)

let node_env = process.env.NODE_ENV || "development"
let isDev = (node_env === "development")

const beforeCall = async ({req, params, modelSetting})=> {
    let {__Auth} = modelSetting
    console.log(`[${ req.originalUrl } beforeCall ]:`)
    console.log('==> params:....' + JSON.stringify(params))
    console.log('==> req.header:token....' + req.header('token'))

    //根据类的__Auth配置来进行身份验证,具体的验证逻辑由类的修饰器配置决定，这里不进行类静态方法的权限认证
    if (__Auth) {
        let userInfo = await __Auth({req})
        if (!userInfo)
            throw GKErrors._SERVER_ERROR('无法验证请求者身份！')
        //提取uID属性并传入params对象，在API方法中可以接收uID并利用
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
        cros_headers:[]
    },
}).then((server)=>{
    //region 开始监听指定的端口
    let port = process.env.PORT || _config.PORT ||  8010;
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
