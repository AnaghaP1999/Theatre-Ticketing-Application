const express = require('express');
const router = express.Router();
const jwt=require('jsonwebtoken')
const userData=require("../model/users")
const movieData=require("../model/movies")

router.use(express.json());
router.use(express.urlencoded({extended:true}));

// function to verify token
function verifytoken(req, res, next) {
  try {
    if (!req.headers.authorization) throw 'Unauthorized';
    let token = req.headers.authorization.split(' ')[1];
    if (!token) throw 'Unauthorized';
    let payload = jwt.verify(token, 'secretKey');
    if (!payload) throw 'Unauthorized';
    next();
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
}

// Api for Admin Login
  router.post('/adminlogin', (req, res) => {
    try {      
        var email = req.body.email;
        var password = req.body.password;
      
        // Send the token in the response
        if (email === 'admin@gmail.com' && password === 'admin@123') {
        const token = jwt.sign({ email, password }, 'secretKey');

          res.status(200).send({ message: 'Admin logged in Successful', token: token, role:'admin' })
          console.log('Admin logged in Successful')
        } else {
          res.status(400).send({message:'Unauthorized'});
        }
      } catch (error) {
        res.status(404).send({message:'Not found'});
    }
  });


  // Api for Customer Login
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const customer = await userData.findOne({ email, password });
      if (email === 'admin@gmail.com' && password === 'admin@123') {
        const token = jwt.sign({ email, password }, 'secretKey');

          res.status(200).send({ message: 'Admin logged in Successful', token: token, role:'admin' })
          console.log('Admin logged in Successful')
        }
      else if (customer) {
        const token = jwt.sign({ email, password }, 'secretKey');
        res.status(200).json({ message: 'Customer login successful.', token: token, role:'user', user:email });
      } else {
        res.status(400).json({ error: 'Invalid credentials.' });
      }
    } catch (error) {
      res.status(404).json({ error: 'Internal Server Error' });
    }
  
  });

  // Api for Customer Signup
  router.post('/signup', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const customer = new userData({ name, email, password });
      await customer.save();
      const token = jwt.sign({name, email, password }, 'secretKey');

      res.status(200).json({ message: 'Customer signup successful.',token:token });
      console.log('Customer signup successful.')
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      console.log('Internal Server Error')
    }
  });

 // Get All movie list - Customer
 router.get('/movielist',verifytoken, (req, res) => {
  movieData.find()
    .then((Movies) => {
      res.json(Movies);
    })
    .catch((error) => {
      console.error('Error retrieving Movies:', error);
      res.status(500).send('Error retrieving Movies');
    });
});

// get movie details
router.get('/get-movie-details/:id',verifytoken, (req, res) => {
  const id = req.params.id;

  movieData.findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ error: 'Data not found' });
      }
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Error retrieving data' });
    });
});

module.exports = router
