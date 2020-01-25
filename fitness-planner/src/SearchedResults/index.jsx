import React, {useState} from 'react';
import planService from '../services/plan-service';
import { useEffect } from 'react';
import Plans from '../Plans';

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
        <Plans isLogged={isLogged} plans={plans} categoriezed={false}/> 
    ) : 
    (<div>
        Loading...
    </div>)
}

export default SearchedResults;

