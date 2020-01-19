import React, { useState, useEffect } from 'react';
import Article from './article/index';
import './index.css'
const Articles = () => {
    const [articles, setArticles] = useState('');
    const [country, setCountry] = useState('')
    let code = ''; 
    const countryCode = {
        'bulgaria': 'bg',
        'united states': 'us',
        'united kingdom': 'gb'
    }

    const getArticles = () => {
        code = countryCode[country.toLowerCase()];
        fetch('https://newsapi.org/v2/top-headlines?' +
        `country=${code}&category=sports&` +
        'apiKey=8f3de2becb8e473e98feb07354e8ff2d')
        .then((res) => res.json()).then((r) => {
            console.log(r.articles);
            setArticles(r.articles)})
    }


    return articles ? <div className='Posts'>
      Type Country
    <input type='text' onChange={(e) => {console.log(e.target.value); setCountry(e.target.value)}}/>
    <button type="button" onClick={getArticles}>Search news</button>
    {articles.map((article, i) => <Article key={i}  articleInfo={article}/>)}
    
            
</div> : <div>
    
    Type Country
    <input type='text' onChange={(e) => {console.log(e.target.value); setCountry(e.target.value)}}/>
    <button type="button" onClick={getArticles}>Search news</button>
    </div>
    
}

export default Articles;