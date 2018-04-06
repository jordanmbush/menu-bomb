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
  addCategory: (req, res) => {
    let {restaurantId, category} = req.body;
    
    const db = req.app.get('db');
    db.add_category([restaurantId, category]).then( category => {
      res.json(category[0]);
    }).catch( err => {
      console.log('addCategory err: ', err);
      res.status(500);
    })
  }
}