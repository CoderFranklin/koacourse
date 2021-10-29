//koajs.com documation
const Koa = require('koa'),
app = new Koa(),
koaRouter = require('koa-router'),
json =require('koa-json'),
render = require('koa-ejs'),
path = require('path'),
bodyParser=require('koa-bodyparser');


render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'ejs',
  cache: false,
  debug: false
});

const router = new koaRouter()
app.use(bodyParser())
app.use(json())

/*app.use(async ctx => {
  ctx.body = 'Hello Franklin';
});

 logger
app.use(async (ctx, next) => { //hits middleware first
  await next();
  const username = ctx.response.get('username');
  console.log (username);
});
x-response-time
app.use(async (ctx, next) => {
  const last ="Franklin"
  await next();
  ctx.set('username', `Coder${last}`);
});*/

app.use(router.routes())
app.use(router.allowedMethods())

router.get('/', async (ctx) => { //A middleware example
  //console.log(ctx.response)
  await ctx.render('index');
})

router.get('/about', async (ctx) => { //A middleware example
  //console.log(ctx.response)
  await ctx.render('about');
})
router.get('/contact', async (ctx) => {
  await ctx.render('contact');
})
router.get('/gallery', async (ctx) =>{
  await ctx.render('gallery')
})

/*
router.get('/:maker/:model/:year', async (ctx) =>{
  console.log(ctx.params)
  console.log(ctx.request.query)
  await ctx.render('dealer',{
    request: {
      model: ctx.params.model,
      maker: ctx.params.maker,
      year: ctx.params.year,
      min_price: ctx.request.query.min,
      max_price: ctx.request.query.max
    },
    user: {
      loggedIn: true,
      usersname: 'billy123',
    },
    wishlist:[
      'bmw','honda','benz'
    ]
  });
})*/

//Products CRUD
let products = [
  {
    id: 1,
    title: 'Jordan 1',
    price: 234,
    image_url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoKT7SPfJSGP7FlR0h2wEtoc52Zz70u70OIg&amp;usqp=CAU',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
  },
  {
    id: 2,
    title: 'Jordan 2',
    price: 234,
    image_url:'https://2app.kicksonfire.com/kofapp/upload/events_images/ipad_air-jordan-2-white-red-1.jpg',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
  }
]
////////////////////////////////////////////////////////////////
/////////////////////////CRUD
/////////////////////////////////////////
//Index - Show All Products
router.get('/products', async (ctx) =>{
  await ctx.render('products/index', {
    products
  });
})



//New - Show Form To Create New Product
router.get('/products/new', async (ctx) =>{
  //let product = products.filter((product) => product.id == ctx.params.id) [0]

  await ctx.render('products/new', {
    //product
  });
})

//Show- Show Individual Product

router.get('/products/:id', async (ctx) =>{
  let product = products.filter((product) => product.id == ctx.params.id) [0]

  await ctx.render('products/show', {
    product
  });
})

//Update - Edit Existing Product
router.put('/api/v1/products/:id', async (ctx) => {
  let id = ctx.params.id,
  data =ctx.request.body,
  objIndex = products.findIndex((obj) => obj.id ==ctx.params.id);
  products[objIndex] = Object.assign(products[objIndex], data)

  return ctx.body = {
    "code": "200",
    "message": "Success",
    "data": products[objIndex]
  }

})

//Edit- Show Individual Product

router.get('/products/:id', async (ctx) =>{
  let product = products.filter((product) => product.id == ctx.params.id) [0]

  await ctx.render('products/edit', {
    product
  });
})

//Delete - Delete Existing Product
router.del('/products/:id', async (ctx) => {
  let id = ctx.params.id
  products = products.filter((product) => product.id != id)
  return ctx.redirect(`/products`);
})


router.get('/about', async (ctx) => { //A middleware example
  //Pricing exampleonsole.log(ctx.response)
  return ctx.body = '<h1>About</h1>'
})


////////////////////////////////////////////////////////////////
/////////////////////////REST #!/usr/bin/env node
//'use strict'

//process.exit(require('./') ? 0 : 1)API
/////////////////////////////////////////

const API_KEY='BILLY123'
const checkAPIKEY = () => async (ctx, next) => {
  if(ctx.request.query.API_KEY == undefined){
  return ctx.body = {
    "error":{
      "message": "API KEY not found",
      "code": 400
    }
  }
}

if(API_KEY != ctx.request.query.API_KEY){
  return ctx.body = {
    "error": {
      "message": "API KEY Does Not Have Access To Data",
      "code": 400
    }
  }
}
  await next()
}



//Index - Show All Products
router.get('/api/v1/products', checkAPIKEY(), async (ctx) =>{
  return ctx.body = products
})




//Save - Create New Product
router.post('/api/v1/products', checkAPIKEY(), async (ctx) => {
  let product = ctx.request.body,
  id = products[products.length -1].id + 1;
  product = Object.assign({id}, product)
  console.log(product)
  products.push(product)
  
  return ctx.body = {
    "code": "200",
    "message": `Success Product with id: ${id} has been created`,
    "data": products[id]
  }
})

//New - Show Form To Create New Product
/*router.get('/api/v1/products/new', checkAPIKEY() (ctx) =>{
  //let product = products.filter((product) => product.id == ctx.params.id) [0]

  await ctx.render('products/new', {
    //product
  });
})*/

//Show- Show Individual Product

router.get('/api/v1/products/:id', checkAPIKEY(), async (ctx) => {
  return ctx.body = products.filter((product) => product.id == ctx.params.id) [0]
})

//Update - Edit Existing Product
router.put('/api/v1/products/:id', checkAPIKEY(), async (ctx) => {
  let id = ctx.params.id,
  data = ctx.request.body,
  objIndex = products.findIndex((obj) => obj.id == id);
  products[objIndex] = Object.assign(data, products[objIndex])

  return ctx.body = {
    "code": "200",
    "message": `Success Product with id: ${id} has been updated`,
    "data": products[objIndex]
  }
})

//Edit- Show Individual Product

/*router.get('/api/v1/products/:id/edit', checkAPIKEY() (ctx) =>{
  let product = products.filter((product) => product.id == ctx.params.id) [0]

  await ctx.render('products/edit', {
    product
  });
})*/

//Delete - Delete Existing Product
router.del('/api/v1/products/:id', checkAPIKEY(), async (ctx) => {
  let id = ctx.params.id
  products = products.filter((product) => product.id != id)
  return ctx.body = {
    "code": "200",
    "message": `Success Product with id: ${id} has been deleted`
    

  }
})


router.get('/about', async (ctx) => { //A middleware example
  //Pricing exampleonsole.log(ctx.response)
  return ctx.body = '<h1>About</h1>'
})
/*router.get('/api/users', async (ctx) => {
  return ctx.body = [
    {
      'username': 'billy123',
      'name': 'Billy',
      'age': 23
    },
    {
      'username': 'james123',
      'name': 'James',
      'age': 35
    },
  ]
})*/


app.listen(3000);
