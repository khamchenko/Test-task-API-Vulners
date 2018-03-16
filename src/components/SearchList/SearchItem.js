import React, { Component } from 'react';
import './SearchItem.scss';

import arrow from '../picture/arrow.svg';
import Heart from '../picture/like.svg';
import redHeart from '../picture/red-like.svg';

class SearchItem extends Component {
    constructor() {
        super();
        this.handlerLike = this.handlerLike.bind(this)
    }

    handlerLike(id) {
        if (this.props.like) {
            this.props.deleteFavorites(id);
        } else {
            this.props.addFavorites(this.props.vulner);
        }
    }

    render() {
        const {
            vulner: {
                _source: {
                    id,
                    vhref,
                    title,
                    modified,
                    type,
                    cvss: {
                        score
                    }
                },
                flatDescription
            },
            like
        } = this.props;

        return (
            <div href={vhref} target="_blank" className="search-item">
                <div className="header-item">
                    <div className="title-item">
                        <div className="like" onClick={() => this.handlerLike(id)}>
                            <img className="icon-like" src={like ? redHeart : Heart} alt=''/>
                        </div>
                        <div className="type">
                            {type}
                        </div>
                        <div className="title-wrapper">
                            <div className="title">
                                {title}
                            </div>
                            <div>
                                <span>{modified.substr(0, 10)}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        {score}
                    </div>
                </div>
                <div className="description">
                    <div className="description-text">{flatDescription}</div>
                    <div>
                        <a href={vhref} target="_blank" className='href'>
                            <img className="icon" src={arrow} alt=''/>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchItem;
