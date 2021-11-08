import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { checkUserSession } from './redux/User/user.actions';

// components
import AdminToolbar from './components/AdminToolbar';
// hoc
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';

// layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
import AdminLayout from './layouts/AdminLayout';
import DashboardLayout from './layouts/DashboardLayout';

// pages
import Homepage from './pages/Homepage';
import Search from './pages/Search';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Orders from './pages/Admin/Orders';
import Additionals from './pages/Admin/Additionals'
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Payu from './pages/Payu';
import Order from './pages/Order';
import Cod from './pages/Cod';
import OrderSummary from './pages/OrderSummary';
import About from './pages/LinkedPages/About';
import ReturnPolicy from './pages/LinkedPages/ReturnPolicy';
import WhyChooseUs from './pages/LinkedPages/KnowMore';
import CustomPage from './pages/CustomPage';

import './default.scss';
import Aedit from './pages/Aedit';
import Prepayment from './pages/Prepayment';
import PrivacyPolicy from './pages/LinkedPages/PrivacyPolicy';
import AndroidApp from './pages/LinkedPages/AndroidApp';


//import Flow from './pages/Payment';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div className="App">
      <AdminToolbar />
      <Switch>
        {/* <Route exact path="/" render={() => (
          <HomepageLayout>
            <Homepage />
          </HomepageLayout>
        )}
        /> */}
        <Route exact path="/" render={() => (
          <Redirect to="/apparel/rediva" />
        )} />
        <Route exact path="/home" render={() => (
          <HomepageLayout>
            <CustomPage />
          </HomepageLayout>
        )}
        />
        <Route exact path="/about9502140167" render={() => (
          <HomepageLayout>
            <About />
          </HomepageLayout>
        )}
        />
        <Route exact path="/about" render={() => (
          <HomepageLayout>
            <WhyChooseUs />
          </HomepageLayout>
        )}
        />
        <Route exact path="/returnpolicy" render={() => (
          <HomepageLayout>
            <ReturnPolicy />
          </HomepageLayout>
        )}
        />
        <Route exact path="/privacypolicy" render={() => (
          <HomepageLayout>
            <PrivacyPolicy />
          </HomepageLayout>
        )}
        />
        <Route exact path="/search" render={() => (
          <MainLayout>
            <Search />
          </MainLayout>
        )} />

        <Route path="/apparel/:filterStore?/:filterType?" render={() => (
          <MainLayout>
            <Search cat='apparel' />
          </MainLayout>
        )} />

        <Route exact path="/living/:filterStore?/:filterType?" render={() => (
          <MainLayout>
            <Search cat='living' />
          </MainLayout>
        )} />

        <Route exact path="/product/:productID" render={() => (
          <MainLayout>
            <ProductDetails />
          </MainLayout>
        )} />
        <Route path="/cart" render={() => (
          <MainLayout>
            <Cart />
          </MainLayout>
        )} />
        {/* <Route path="/test" render={() => (

            <Flow />
        )} /> */}
        <Route exact path="/ordersummary" render={() => (
          <WithAuth>
            <MainLayout>
              <Prepayment step={1} />
              <OrderSummary />
            </MainLayout>
          </WithAuth>
        )} />

        <Route exact path="/payment" render={() => (
          <WithAuth>
            <MainLayout>
              <Prepayment step={2} />
              <Payu />
            </MainLayout>
          </WithAuth>
        )} />
        <Route path="/payment/success" render={() => (
          <MainLayout>
            <h1>Success</h1>
          </MainLayout>
        )} />
        <Route path="/payment/failed" render={() => (
          <MainLayout>
            <h1 style={{ marginLeft: "40%", marginTop: "20px", color: "red" }}>payment Failed!</h1>
          </MainLayout>
        )} />

        <Route path="/cod" render={() => (
          <WithAuth >
            <MainLayout>
              <Prepayment step={2} />
              <Cod />
            </MainLayout>
          </WithAuth>
        )} />
        <Route path="/registration" render={() => (
          <MainLayout>
            <Registration />
          </MainLayout>
        )} />
        <Route path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )} />
        <Route path="/recovery" render={() => (
          <MainLayout>
            <Recovery />
          </MainLayout>
        )} />
        <Route path="/androidapp" render={() => (
          <MainLayout>
            <AndroidApp />
          </MainLayout>
        )} />
        <Route path="/dashboard" render={() => (
          <WithAuth>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </WithAuth>
        )} />
        <Route path="/order/:orderID" render={() => (
          <WithAuth>
            <DashboardLayout>
              <Order />
            </DashboardLayout>
          </WithAuth>
        )} />
        <Route path="/admin" render={() => (
          <WithAdminAuth>
            <AdminLayout>
              <Admin />
            </AdminLayout>
          </WithAdminAuth>
        )} />
        <Route path="/orders" render={() => (
          <WithAdminAuth>
            <AdminLayout>
              <Orders />
            </AdminLayout>
          </WithAdminAuth>
        )} />
        <Route path="/additionals" render={() => (
          <WithAdminAuth>
            <AdminLayout>
              <Additionals />
            </AdminLayout>
          </WithAdminAuth>
        )} />
        <Route path="/edit/:productID" render={() => (
          <WithAdminAuth>
            <AdminLayout>
              <Aedit />
            </AdminLayout>
          </WithAdminAuth>
        )} />
      </Switch>
    </div>
  );
}

export default App;