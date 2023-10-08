const jwt = require("jsonwebtoken");
const User = require("./../models/UserModel")
const { promisify } = require("util");
const AppError = require("../utils/appError");

exports.createUser = async (req, res, next) => {
     try {
         const { name, email, password, confirmPassword } = req.body

         const emailDuplicated = await User.findOne({email});

         if(emailDuplicated) {
           return res.status(404).send('Email is already taken ! Please try again.')
         }

         const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
         const isCheckEmail = reg.test(email)
         if (!email || !password || !confirmPassword) {
             return res.status(200).json({
                 status: 'ERR',
                 message: 'The input is required'
             })
         } else if (!isCheckEmail) {
             return res.status(200).json({
                 status: 'ERR',
                 message: 'The input is email'
             })
         } else if (password !== confirmPassword) {
             return res.status(200).json({
                 status: 'ERR',
                 message: 'The password is equal confirmPassword'
             })
         }
         const newUser = await User.create(req.body);
          // return res.status(201).json({
          // status: "success",
          // newUser,
          // });
          generateToken(newUser, 201, res);
     } catch (e) {
         return res.status(404).json({
             message: e
         })
     }
}

const signToken = (id) => {
     return jwt.sign({ _id:id }, process.env.JWT_SECRET, {
       expiresIn: process.env.JWT_EXPIRES_IN,
     });
   };
   
const generateToken = (user, statusCode, res) => {
     const token = signToken(user._id);
     const cookieOptions = {
       expires: new Date(
         Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
       ),
       httpOnly: true,
       secure: true,
     };
     res.cookie("jwt", token, cookieOptions);
     user.password = undefined;
   
     res.status(statusCode).json({
       status: "Logged in successful",
       token,
       user,
     });
   };
   

exports.login = async (req, res, next) => {
     const { email, password } = req.body;
     console.log(email, password);
     const user = await User.findOne({ email }).select("+password");
     
     if (!user) {
       return res.status(401).json({ message: 'Nhập sai email' }) 
      //  (
         
      //   // next(new AppError('Incorrect email', 401)),
      //  );

     }
     const isCorrectPassword = await user.comparePassword(password);
     if(!isCorrectPassword){
          return next(new AppError('Incorrect password '+password, 401));
     }
     generateToken(user, 200, res);
     
   };

   exports.updateUser = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      console.log("no user");
      return;
    }
    console.log(user);
    generateToken(user, 200, res);
  };
  
  exports.getById = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    const user = await User.findById(id);
    if (!user) {
      return res.status(204).json({
        status: "No content",
      });
    }
  
    return res.status(200).json({
      status: "success",
      user,
    });
  };

  exports.protect = async (req, res, next) => {
    let token;
    // console.log(req.cookies.jwt)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    console.log(token)
    if (!token) {
      return next(
        new AppError(
          "You are not logged in! Please log in to get access to this.",
          401
        )
      );
    }
  
    // Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded)
  
    const currentUser = await User.findById(decoded._id);
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token is no longer available",
          401
        )
      );
    }
  
    req.user = currentUser;
    next();
  };