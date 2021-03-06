import React from 'react';
import { Route, Switch} from 'react-router-dom';
import Header from './Components/Shared/Header';
import Home from './Components/Home/Home';
import OrdersContainer from './Components/Customer/Orders/OrdersContainer'
import testMenu from './Components/Menu/MenuContainer';
import testMenuMaker from './Components/MenuMaker/MenuMakerContainer';
import AccountContainer from './Components/Customer/Account/AccountContainer'
import RestaurantDashboard from './Components/RestaurantDashboard/RestaurantDashboard';
import RegisterRestaurant from './Components/Registration/RegisterRestaurant'
import RestAccountContainer from './Components/RestaurantDashboard/Account/RestAccountContainer'

export default (
    
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/customer/orders' component={OrdersContainer} />
        <Route path='/customer/account' component={AccountContainer} />
        <Route path='/menu/:id' component={testMenu} />
        <Route path='/restaurant/orders' component={RestaurantDashboard} />
        <Route path='/restaurant/account' component={RestAccountContainer}/>
        <Route path='/restaurant/menumaker/:restaurantId' component={testMenuMaker} />
        <Route path='/register/:userType' component={RegisterRestaurant} />
    </Switch>

)