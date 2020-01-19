import React from 'react';
import './index.css'
const Article = ({articleInfo}) => {

    return <React.Fragment>
            <div>
                <h2>{articleInfo.title}</h2>
                <div className="media">
                    <a href={articleInfo.url} target='blank'>
                        <img src={articleInfo.urlToImage} alt=""/>
                    </a>

                </div>
                <p>{articleInfo.description}</p>
                <p>
                    {articleInfo.content}
                </p>
                {articleInfo.author}
            </div>
        </React.Fragment>
    
    
}

export default Article;