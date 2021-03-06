const cloudinary = require('cloudinary');

module.exports = {
  getMenuItems: (req, res) => {

    const id = req.params.id;

    const db = req.app.get('db');
    db.get_menu_items(id).then( items => {
      res.json(items);
    }).catch( err => {
      console.log('getMenuItems err: ', err);
      res.status(500);
    })
  },
  getMenuCategories: (req, res) => {
    const id = req.params.id;

    const db = req.app.get('db');
    db.get_menu_categories(id).then( categories => {
      res.json(categories);
    }).catch( err => {
      console.log('getMenuCategories err: ', err);
      res.status(500);
    })
  },
  addCategory: (req, res) => {
    let {restaurantId, category} = req.body;

    const db = req.app.get('db');
    db.add_category([restaurantId, category]).then( category => {
      res.json(category[0]);
    }).catch( err => {
      console.log('addCategory err: ', err);
      res.status(500);
    })
  },
  addItem: (req, res) => {
    const db = req.app.get('db');
    let {restaurantId, name, price, description, catId, imageUrl} = req.body


    db.add_new_menu_item([restaurantId, name, price, description, imageUrl, catId]).then(response=> {
      console.log(response);
      res.status(200).send(response)
    }).catch(error => console.log(error));
  },
  deleteItem: (req, res) => {
    const id = req.params.id;

    const db = req.app.get('db');
    db.delete_menu_item(id).then( response => {
      res.status(200).send();
    }).catch( err => {
      console.log('deleteItem err: ', err);
      res.status(500);
    });
  },
  updateItem: (req, res) => {
    const {name, price, description, id, imageurl} = req.body;
    const db = req.app.get('db');
    db.update_menu_item(name, price, description, imageurl, id).then( response => {
      console.log(response)
      res.json(response[0]);

    }).catch( err => {
      console.log('updateItem err: ', err);
      res.status(500);
    });
  },
  restaurantName: (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    console.log(id);
    db.get_restaurant_name(id).then(response => {
      console.log(response)
      res.status(200).send(response)
    }).catch( err => {
      console.log('restaurantName err: ', err);
      res.status(500);
    });
  },
  deleteCategory: (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;

    db.delete_category(id).then(response => {
      res.status(200).send()
    }).catch( err => {
      console.log('deleteCategory err: ', err);
      res.status(500);
    });
  },
  signUpload: (req, res) => {

//get a time stamp in seconds which is UNIX format
    const timestamp = Math.round((new Date()).getTime() / 1000);

// Cloudinary API secret stored in the .env file
    const api_secret  = process.env.CLOUDINARY_SECRET_API;

//user built in cloudinary api sign request function to  create hashed signature with your api secret and UNIX timestamp
    const signature = cloudinary.utils.api_sign_request({ timestamp: timestamp }, api_secret);

// craft a signature payload to send to the client (timestamp and signature required, api_key either sent here or stored on client)
    const payload = {
        signature: signature,
        timestamp: timestamp
    };
        res.json(payload);
  },
  getSearchItems: (req, res) => {
    const db = req.app.get('db');
    const { search } = req.query
    console.log( search );
    db.search_food(search).then(response => {
      console.log(response);
      res.json(response);
    })
  }
}