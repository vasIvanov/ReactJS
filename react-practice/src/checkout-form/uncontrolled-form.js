import React, {Component} from 'react'
import UsernameInput from './username-input'

class UncontrolledForm extends Component {
    constructor(props) {
        super(props)
        this.addressRef = React.createRef();
        this.cityRef = React.createRef();
        this.ibanRef = React.createRef();
        this.termsRef = React.createRef();
    }


    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.addressRef.current.value);
        
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {/* <UsernameInput username={username} changeUsername={this.changeUsername} /> */}

                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" ref={this.addressRef} id="address" />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <select ref={this.cityRef}>
                        <option value="">Choose..</option>
                        <option value="plovdiv">Plovdiv</option>
                        <option value="sofia">Sofia</option>
                        <option value="burgas">Burgas</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="iban">IBAN</label>
                    <input type="text" ref={this.ibanRef} id="iban" />
                </div>
                <div>
                    <label htmlFor="gender">Gender</label>
                    Male: <input  name="gender" type="radio" value="male" />
                    Female: <input  name="gender" type="radio"  value="female" />
                </div>
                <div>
                    <label htmlFor="terms">Terms of Service</label>
                    <input ref={this.termsRef} type="checkbox" />
                </div>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default UncontrolledForm