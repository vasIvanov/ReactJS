import  React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'
import ProductList from './product-list';
import ProductPage from './product-page';
import ErrorPage from './error-page';
import CheckoutPage from './checkout-page';
import ContextWrapper from './ContextWrapper';
import Articles from './articles'
import Header from './header'

const Navigation = () => {
    return (
        <ContextWrapper>
            <Router>
                <Header />
                <Switch>
                    <Route path="/" exact component={ProductList}/>
                    <Route path="/product/:id" component={ProductPage}/>
                    <Route path="/checkout" component={CheckoutPage}/>
                    <Route path="/articles" component={Articles}/>
                    <Route component={ErrorPage}/>
                </Switch>
            </Router>
        </ContextWrapper>
    )
}

export default Navigation;