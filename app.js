var express = require("express");
var bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const path = require('path')

app.use(
  cors({
    // origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true
  })
);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());



// Constants

const port = process.env.PORT || 5000;


/** REDIS  CONFIGURATION */
const redis = require("redis");
const port_redis = process.env.PORT || 6379;
const redis_client = redis.createClient(port_redis);

// redis_client.setex(id, 3600, JSON.stringify(starShipInfoData));

/** REDIS  CONFIGURATION */

/** MONGOOSE CONFIGURATION */
const mongoose = require('mongoose')
/** MONGOOSE CONFIGURATION */





/** DATABASE CONFIGURATION FOR PRODUCTION/DEVELOPMENT */
if ( app.get('env') === 'development' ) {
  // app.use(express.errorHandler());
  mongoose.connect('mongodb://localhost/sterling',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    // useUnifiedTopology: true ,
    useFindAndModify: false
  },
  )
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log(err));  
}else{
  console.log("PRODUCTION .....")
  mongoose.connect('mongodb://localhost/tests',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    // useUnifiedTopology: true ,
    useFindAndModify: false
  },
  )
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log(err));  
  mongoose.connect('mongodb+srv://sterling:sterling@cluster0.bo0wv.mongodb.net/sterling?retryWrites=true&w=majority',
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useUnifiedTopology: true ,
        useFindAndModify: false 
      },
     
  )


  
  
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log(err.message));
  // mongoose.connect('mongodb://localhost/cryptoheaven',
  // { useNewUrlParser: true },
  // )
  //   .then(() => console.log('Connected to MongoDB...'))
  //   .catch(err => console.log(err));
}
/** DATABASE CONFIGURATION FOR PRODUCTION/DEVELOPMENT */



  /** VIEWS CONFIGURATION */
  /** SERVING PUBLIC FILES */
  app.use(express.static(path.join(__dirname, "public")));
  /** SERVING PUBLIC FILES */
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "ejs");
  /** VIEWS CONFIGURATION */


/** ROUTES */
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/user', require('./routes/api/user'))
app.use('/api/admin', require('./routes/api/admin'))
app.use('/api/fixtures', require('./routes/api/fixtures'))

// app.use('/api/auth', require('./routes/api/auth'))
// app.use('/api/admin', require('./routes/api/admin'))

/** ROUTES */
app.get("/", (req, res)=> {
  res.render("index")
})
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})