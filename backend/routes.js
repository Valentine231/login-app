// const routes = require('express')()
const express = require('express')
const User = require('./model/user')
const router = express.Router()


router.get('/', async (req, res) => {
    const Users = await User.find()

    return res.status(200).json({
        status: 'success',
        data: { Users }
    })

})

router.post('/signup', async (req, res) => {
    const { password, email } = req.body  

    if (password.length < 8) return res.status(400).json({message: 'Password should not be shorter than (8)'})
    
    if (!password || !email) return res.status(400)
        .json({
            message: 'Incomplete credentials',
            status: 'fail'
        })
    
    const newUser = await User.create({ email, password })
    
    

    return res.status(200).json({
        status: 'success',
        message: 'Account created successfully',
        data: { newUser }
     })
    
    
})

  
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email }).select('+password');
      console.log(user)
      if (user) {
        // User is authenticated
        res.status(200).json({ status: 'success', data : {user} });
      } else {
        // User is not authenticated
        res.status(401).json({ status: 'error', message: 'Invalid username or password' });
      }
    } catch (error) {
      // Something went wrong
      res.status(500).json({ status: 'error', message: 'An error occurred during authentication' });
    }
  });

// router.post('/signin', async (req, res) => {
//     const { email, password } = req.body

//     if (!email || !password) return res.status(400).json({
//         status: 'fail',
//         message: 'Incomplete credentials'
//     })

//     const user = await User.findOne({ email, password })

//     if (!user) return res.status(404).json({
//         status: 'fail',
//         message: 'User not found'
//     })

//     return res.status(200).json({
//         status: 'success',
//         message: 'User found',
//         data: { user }
//     })
// })

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    
    if (!id) {
        return res.status(400).jsoon({
            status: 'fail',
            message: 'User ID is required'
        })
    }
    
    const user = await User.findById(id) // check if the user with this id exists

    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found'
        })
    }
    
    await User.findByIdAndDelete(id) // delete the user if it exists


    return res.status(204).json({
        status: 'success',
        message: 'User deleted successfully',
        data: { user }
    })
})

// router.patch()

module.exports = router