const bcrypt = require('bcrypt');

module.exports = {
    register: (req, res) => {
         //setting db name variable
         const db = req.app.get('db');

         // user registration info deconstructed from body
         const { name, email, phone, address1, address2, firstName, lastName, password, userType } = req.body;

         //saltrounds for bcrypt hashing
         const saltRounds = 12;

         bcrypt.hash(password, saltRounds).then(hashedPassword => {
            db.register_user([email, phone, address1, address2, firstName, lastName, hashedPassword, userType]).then(response =>{
                    
                 //set user to a session if succsesful login
                 const user = {
                    id: response[0].id,
                    email: response[0].email,
                    phone: response[0].phone,
                    address1: response[0].address_1,
                    address2: response[0].address_2,
                    firstName: response[0].first_name,
                    lastName: response[0].last_name,
                    userType: response[0].user_type
                }

                req.session.user = user;
                res.send(req.session.user);
                // res.redirect(`/${req.session.user.userType}`)

            }).catch(error => console.log(error))
        }).catch(error => console.log(error))
    },
    login: (req, res) => {
         //setting db name variable
         const db = req.app.get('db');

         // deconstruct email and password from passed in body
         const { email, password } = req.body;

        //checking to see if the requested email is on the database 
        db.login_user(email).then(users => {
            //check that data is returned
            if(users.length){
                bcrypt.compare(password, users[0].password).then(passwordMatch => {
                    //if passwords match = true set users session
                    console.log(users);
                    if(passwordMatch){
                        const user = {
                            id: users[0].id,
                            email: users[0].email,
                            phone: users[0].phone,
                            address1: users[0].address_1,
                            address2: users[0].address_2,
                            firstName: users[0].first_name,
                            lastName: users[0].last_name,
                            userType: users[0].user_type
                        }

                        req.session.user = user;
                        
                        res.send(req.session.user);
                    } else {
                        console.log('wrong password')
                        res.json({message:"Wrong username/password"})
                    }
                }).catch(error => console.log(error))
            } else {
                console.log('wrong username')
                res.json({message:"Wrong username/password"})
            }
            
        }).catch(error => console.log(error));
    },
    logout: (req, res)=> {
        req.session.destroy();
        res.status(200).send('logged out');
    }
}

        