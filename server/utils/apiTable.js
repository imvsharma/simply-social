const {colors} = require('./colors')

exports.allroutes = (router) => {
    console.log(colors.yellow("================================================="));
    let routesArr =[]
    router.stack.forEach(r => {
        routesArr.push({
            "Method": Object.keys(r.route.methods)[0].toUpperCase(),
            "Route": `api/v1${r.route.path}`
        })
    })

    console.table(routesArr);
}