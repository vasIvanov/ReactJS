import React from 'react';
import Header from '../header'
import CheckoutForm from '../checkout-form'
import LibraryForm from '../checkout-form/library-form'
import UncontrolledForm from '../checkout-form/uncontrolled-form'

class CheckoutPage extends React.Component  {
    componentDidMount() {

    }

    render() {

        return (
            <div>
                <Header/>
                <UncontrolledForm />
            </div>
        )
    }
}

export default CheckoutPage;