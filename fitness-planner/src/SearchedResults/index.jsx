import React, {useState} from 'react';
import planService from '../services/plan-service';
import { useEffect } from 'react';
import Plans from '../Plans';
import Header from '../Header';

const SearchedResults = ({match, isLogged}) => {
    const query = match.params.query;
    const [plans, setPlans] = useState('');
    useEffect(() => {
        planService.load(null, null, null, query)
            .then(r => {
                setPlans(r)
            })
    }, [query])

    

    
    return plans ? (
        <React.Fragment>
            <Header isLogged={false}  bgColor='dark'/>
            <Plans isLogged={isLogged} plans={plans} categoriezed={false}/> 
        </React.Fragment>
    ) : 
    (<div>
        <Header isLogged={false}  bgColor='dark'/>
        Loading...
    </div>)
}

export default SearchedResults;

