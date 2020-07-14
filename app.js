var express = require("express");
var app = express();



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
    // useUnifiedTopology: true ,
    useFindAndModify: false
  },
  )
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log(err));  
}else{
  console.log("PRODUCTION .....")
  // mongoose.connect('mongodb+srv://cryptoinvest:PMQ7343TsK6oQP55@cluster0-uiayc.mongodb.net/crypto?retryWrites=true&w=majority',
  //   { 
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //       // useUnifiedTopology: true ,
  //       useFindAndModify: false 
  //     },
     
  // )


  
  // 
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log(err.message));
  // mongoose.connect('mongodb://localhost/cryptoheaven',
  // { useNewUrlParser: true },
  // )
  //   .then(() => console.log('Connected to MongoDB...'))
  //   .catch(err => console.log(err));
}
/** DATABASE CONFIGURATION FOR PRODUCTION/DEVELOPMENT */


/** ROUTES */
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/user', require('./routes/api/user'))
app.use('/api/admin', require('./routes/api/admin'))
app.use('/api/fixtures', require('./routes/api/fixtures'))

// app.use('/api/auth', require('./routes/api/auth'))
// app.use('/api/admin', require('./routes/api/admin'))

/** ROUTES */

app.listen(port, function () {
  console.log('Example app listening on port 8080!')
})