import React, {Fragment} from 'react';
import './index.css';
import Jumbotron from './Jumbotron';
import InfoSection from './InfoSection';
import Header from '../Header';
import StatisticsSection from './StatisticsSection';


const Home = ({isLogged, history}) => {

    return (
        <Fragment>
            <Header history={history} isLogged={isLogged} fixed='top'/>
            <div className='home-content'>
                <Jumbotron isLogged={isLogged}/>
                <InfoSection />
                <StatisticsSection />
            </div>
        </Fragment>
    )
}

export default Home;

