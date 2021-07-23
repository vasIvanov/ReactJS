import React, {Fragment} from 'react';
import './index.css';
import Jumbotron from './Jumbotron';
import InfoSection from './InfoSection';
import StatisticsSection from './StatisticsSection';


const Home = ({isLogged}) => {
  return (
  <Fragment>
    <div className='home-content'>
      <Jumbotron isLogged={isLogged}/>
      <InfoSection />
      <StatisticsSection />
    </div>
  </Fragment>
)
}

export default Home;