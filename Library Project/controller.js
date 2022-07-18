const {BookModel,UserModel,OtpModel} = require("./mongoDb")
const jwt = require('jsonwebtoken');
const JWTFun = require('./middleware/jwtauth');
const {main,num1,num2,randNUm} = require('./email/email');
let checkingObj =[]

// Controllers for Books....
class BookController {
    // Function for Adding New Book...........
    static  addbook = async(req,res)=>{
        // console.log(req.body);
        // console.log(req.file);
        let NewBook = new BookModel(req.body);
        NewBook.image = req.file.originalname;
        await NewBook.save();
        res.send({
            "success": "true",
            "status":"Book Added successfully"
        });
    }

    // Function for Displaying all books...........
    static showbook = async (req, res) => {
         BookModel.find({},(err,resu)=>{    
            res.render("showbook",{book:resu});
        })
    }

    // Function for Showing Book Details
    static bookdetails =  async (req,res)=>{
         res.render("bookdetails",{data:req.params.image});
    }

    // static show = (req,res)=>{
    //     res.render('bookdetails');
    // }

    // Function for Show books By category/language filter.....
    static sort =async(req,res)=>{
        if(req.body.sort === "all"){
            res.redirect('/showbook');
        }else{
            let book = await BookModel.find({language:req.body.sort});
            let lan = req.body.sort;
            res.render('showbook',{book,lan})
        }
    }
}


// Controller for Users.......
class UserController {

    // Function for SIgnup of User
    static signup = async(req,res)=>{
        const {firstname,lastname,email,username,password,c_password} = req.body;
        // res.send(firstname + ' ' + lastname + ' ' + email + ' ');
        if(firstname && lastname && email && username && password && c_password){
            const user = await UserModel.findOne({ username:username});
            if(user)
            {return res.status(400).json({"message":
                "user already exists please login"}
                )
            };
            if(password !== c_password)
            {return res.status(400).json({"message":
                "password and confirm password doesn't match"} )
            };
            let newUser = new UserModel({
                firstname:firstname,
                lastname:lastname,
                email:email,
                username:username,
                password:password,
            })
            await newUser.save();
            res.status(200).json({"message":`${firstname} ${lastname} welcome your account has created successfully and your username is ${username} and your password is ${password}`});

        }else{
            res.status(400).json( {"message":"all fields are required"});
        }
    }

    // Function for Displaying All users
    static showallusers=async(req,res)=>{
        let users = await UserModel.find();
        res.send(users);
    }

    // Function for LOgin User
    static login=async (req,res)=>{
        try{
            const {username,password}= req.body;
            
            const user = await UserModel.findOne({username:username});
            // console.log(user.password);
            if(user){
                if(user.password == password){
                    // console.log(user.password);
                    let token = jwt.sign({UserId:user._id}, "secretKey");
                    console.log(token);
                    res.cookie("jwt",token);
                    // res.json(req.cookies)
                    return res.status(200).json(user);
                }else{
                    return res.status(400).json({"message":"username or password is invalid"});
                }
            }else{
                return res.status(400).json({"message":"usernot found please register first.."})
            }
        }
        catch(err){
            return res.status(400).json(err);
        }
    }

    static profile = async(req,res)=>{
        let userId = req.user.UserId;
        console.log("hello",req.user.UserId);
        let Nuser = await UserModel.findOne({_id:userId});
        res.json(Nuser);
    }

    static changePassword =async (req,res)=>{
        const {username,password,new_password,c_password} = req.body;
        if(username&&password&&new_password&&c_password) {
           if(new_password == c_password){
            let user = await UserModel.findOne({username:username});
            if(user) {
                if(password==user.password){
                    user.password = new_password;
                    await user.save();
                    return res.json({"success":"true", "message":"Password Changed Successfully"});
                }else{
                    return res.json({"message":"wrong username or password"});
                }
            }
            else{
                return res.json({"message":"wrong username or password"});
            }
           }else{
            return res.json({"message":"new password and confirm password are not the same"});
           }
        }
        else{
            return res.json({"message":"all fields are required"});
        }
    }

    static forgotPassword = async(req,res)=>{
        const {username } = req.body;
        let user = await UserModel.findOne({username: username});
        if(user){
            randNUm();
            console.log(num1[0]);
            main(user.email).catch(console.error);
            user.password = num1[0];
            num1.pop();
            await user.save();
            return res.json({"message":"New password is sending to your register email id"});
        }else{
            return res.json({"message":"You are not registered. Please register now."});
        }
    }

    static checkOTP =async(req,res)=>{
        const {username } = req.body;
        let user = await UserModel.findOne({username: username});
        if(user){
            randNUm();
            console.log(num1[0]);
            // main(user.email).catch(console.error);
            checkingObj.push({"otp":`${num1[0]}`, "username":`${username}`});
            console.log(checkingObj);            
            num1.pop();
        }else{
            return res.json({"message":"You are not registered. Please register now."});
        }
    }

    static forgottenpassword=async (req,res)=>{
        const {username} = req.body;
        let user = await UserModel.findOne({username: username});
        if(user){
        let num = (Math.floor(Math.random() * 100000)) + 900000;
        console.log(num);
        // main(user.email,num);
        let otp = new OtpModel({
            username: username,
            otp:num
        })
        await otp.save();
        // res.send("done")
        res.json({"username": username});
        }else{
            res.json({"message":"Invalid Username"});
        }
    }

    static checkOTP =async(req,res)=>{
        const {username,otp,new_password,c_password}  = req.body;
        let user = await OtpModel.findOne({username: username})
        if(user){
            if(otp == user.otp){
                if(new_password == c_password){
                    let nuser = await UserModel.findOne({username: username});
                nuser.password = new_password;
                await nuser.save();
                res.json({"message":"Your Password has been updated successfully"});
                }else{
                    res.json({"message":"New Password and confirm password not matched.."})
                }
            }else{
                res.json({"message":"Invalid OTP"});
            }
        }else{
            res.json({"message":"Invalid OTP"})
        }

        
    }

    static redir =async(req,res)=>{
        let token = req.params.token;
        console.log(token);
        if(token){
            try {
                let decode = await jwt.verify(`${token}`,"secretKey");
                console.log(decode.username);
                res.redirect("http://localhost:4200/forgota")
                // res.send(decode.username);
            } catch (error) {
                res.redirect("http://localhost:4200/ChangePassemailExpire")
                // res.send("Invalid Token");
            }
        }
        else{
            return res.json({"message": "token not valid"});
        }
        // res.redirect("http://localhost:4200/forgot");
        // res.send("done");
    }

    static sendToken =async(req, res) => {
        let {username} = req.body;
        let user = await UserModel.findOne({username: username});
        // console.log(user);
        if(user){
            let token = jwt.sign({username:username}, "secretKey");
            res.send(`http://192.168.1.65:7000/users/user/redi/${token}`);
        }else{
            res.json({"message": "username not valid"});
        }
    }
    
}
module.exports = {BookController,UserController};