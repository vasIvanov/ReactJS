import React, {Component, useState} from 'react'
import UsernameInput from './username-input'

const CheckoutForm = (props) => {
    const [username, setUsername] = useState(props.username || '');
    const [address, setAddress] = useState(props.address || '');
    const [city, setCity] = useState('');
    const [iban, setIban] = useState('');
    const [gender, setGender] = useState('');
    const [terms, setTerms] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(username == '') {
            setError("Username is required")
            
        } else {
            setError(null)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <UsernameInput username={username} changeUsername={(e) => setUsername(e.target.value)} />

            <div>
                <label htmlFor="address">Address</label>
                <input type="text" onChange={(e) => setAddress(e.target.value)} value={address} id="address" />
            </div>
            <div>
                <label htmlFor="city">City</label>
                <select onChange={(e) => setCity(e.target.value)} value={city}>
                    <option value="">Choose..</option>
                    <option value="plovdiv">Plovdiv</option>
                    <option value="sofia">Sofia</option>
                    <option value="burgas">Burgas</option>
                </select>
            </div>
            <div>
                <label htmlFor="iban">IBAN</label>
                <input onChange={(e) => setIban(e.target.value)} type="text" value={iban} id="iban" />
            </div>
            <div>
                <label htmlFor="gender">Gender</label>
                Male: <input onChange={(e) => setGender(e.target.value)} name="gender" type="radio" value="male" />
                Female: <input onChange={(e) => setGender(e.target.value)} name="gender" type="radio"  value="female" />
            </div>
            <div>
                <label htmlFor="terms">Terms of Service</label>
                <input onChange={(e) => setTerms(e.target.value)} selected={terms} type="checkbox" />
            </div>
            <button type="submit">Submit</button>
            {error ? 
                (
                    <div>
                        {error}
                    </div>
                ) : null
            }
            <div dangerouslySetInnerHTML={{__html:address}}>

            </div>
        </form>
    )
    
}

// class CheckoutForm extends Component {
//     // constructor(props) {
//     //     super(props)

//     //     this.state = {
//     //         username: '',
//     //         address: '',
//     //         city: '',
//     //         iban: '',
//     //         gender: '',
//     //         terms: false,
//     //         error: null
//     //     }
//     // }

//     // changeAddress = (e) => {
//     //     this.setState({
//     //         address: e.target.value
//     //     })
//     // }
//     // changeIban = (e) => {
//     //     this.setState({
//     //         iban: e.target.value
//     //     })
//     // }
    
//     // changeUsername = (e) => {
//     //     this.setState({
//     //         username: e.target.value
//     //     })
//     // }

//     // changeCity = (e) => {
//     //     this.setState({
//     //         city: e.target.value
//     //     })
//     // }

//     // changeTerms = (e) => {
//     //     this.setState({
//     //         terms: e.target.checked
//     //     })
//     // }

//     // changeGender = (e) => {
//     //     this.setState({
//     //         gender: e.target.value
//     //     })
//     // }

//     handleSubmit = (e) => {
//         e.preventDefault()
//         console.log(this.state);
//         const { username, address, city, iban, gender, terms } = this.state

//         if(username == '') {
//             this.setState({
//                 error: "Username is required"
//             })
//         } else {
//             this.setState({
//                 error: null
//             })
//         }
//     }

//     render() {
//         const { username, address, city, iban, error, terms } = this.state
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <UsernameInput username={username} changeUsername={this.changeUsername} />

//                 <div>
//                     <label htmlFor="address">Address</label>
//                     <input type="text" onChange={this.changeAddress} value={address} id="address" />
//                 </div>
//                 <div>
//                     <label htmlFor="city">City</label>
//                     <select onChange={this.changeCity} value={city}>
//                         <option value="">Choose..</option>
//                         <option value="plovdiv">Plovdiv</option>
//                         <option value="sofia">Sofia</option>
//                         <option value="burgas">Burgas</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label htmlFor="iban">IBAN</label>
//                     <input onChange={this.changeIban} type="text" value={iban} id="iban" />
//                 </div>
//                 <div>
//                     <label htmlFor="gender">Gender</label>
//                     Male: <input onChange={this.changeGender} name="gender" type="radio" value="male" />
//                     Female: <input onChange={this.changeGender} name="gender" type="radio"  value="female" />
//                 </div>
//                 <div>
//                     <label htmlFor="terms">Terms of Service</label>
//                     <input onChange={this.changeTerms} selected={terms} type="checkbox" />
//                 </div>
//                 <button type="submit">Submit</button>
//                 {error ? 
//                     (
//                         <div>
//                             {error}
//                         </div>
//                     ) : null
//                 }
//                 <div dangerouslySetInnerHTML={{__html:address}}>

//                 </div>
//             </form>
//         )
//     }
// }

export default CheckoutForm