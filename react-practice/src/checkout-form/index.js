/*eslint-disable no-undef */
import React, {useState, useContext, useEffect} from 'react'
import UsernameInput from './username-input'
import {AuthContext} from '../ContextWrapper'
import {ThemeContext} from '../ContextWrapper'
import Articles from './../articles'


const CheckoutForm = (props) => {
    const [username, setUsername] = useState(props.username || '');
    const [address, setAddress] = useState(props.address || '');
    const [city, setCity] = useState('');
    const [iban, setIban] = useState('');
    const [gender, setGender] = useState('');
    const [terms, setTerms] = useState(false);
    const [error, setError] = useState(null);
    const authValue = useContext(AuthContext)
    const themeValue = useContext(ThemeContext)
    

    const myWidget = cloudinary.createUploadWidget({
        cloudName: 'dhkrkvztl', 
        apiKey: '273427412511793',
        uploadPreset: 'testing'
    }, (error, result) => { 
          if (!error && result && result.event === "success") { 
            console.log('Done! Here is the image info: ', result.info.url); 
          }
        }
    )

    

    const handleSubmit = (e) => {
        console.log(articles[0].title);
        
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
            <button type='button' onClick={() => myWidget.open()} id="upload_widget" className="cloudinary-button">Upload files</button>

            <p>Auth: {`${authValue.auth}`}</p>
            <p>Auth: {`${authValue.private}`}</p>
            <p>Theme: {`${themeValue.theme}`}</p>
        </form>
    )
    
}

export default CheckoutForm