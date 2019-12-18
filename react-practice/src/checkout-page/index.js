import React from 'react';
import Header from '../header'
import CheckoutForm from '../checkout-form'
import LibraryForm from '../checkout-form/library-form'
import Form from '../checkout-form/'

class CheckoutPage extends React.Component  {
    componentDidMount() {

    }

    render() {

        return (
            <div>
                <Header/>
                <Form />
            </div>
        )
    }
}

export default CheckoutPage;