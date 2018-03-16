import React, { Component } from 'react';
import './FavoritesItem.scss';

import arrow from '../picture/arrow.svg';
import Heart from '../picture/like.svg';
import redHeart from '../picture/red-like.svg';
import Delete from '../picture/delete.svg';
import Edit from '../picture/edit.svg';
import Reconfirm from '../picture/reconfirm.svg';

class FavoritesItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            text: props.vulner.flatDescription
        }
        this.handlerDelete = this.handlerDelete.bind(this);
        this.handlerEdit = this.handlerEdit.bind(this);
        this.handlerReconfirm = this.handlerReconfirm.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handlerDelete(id) {
        this.props.deleteFavorites(id);
    }

    handlerEdit() {
        this.setState({
            edit: true
        })
    }

    handlerReconfirm() {
        this.setState({
            edit: false
        })
        let vulner = {
            ...this.props.vulner,
            flatDescription: this.state.text,
            edit: new Date()
        }
        this.props.editFavorites(vulner);
    }
    handleTextChange(e) {
        this.setState({
            text: e.target.value
        })
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
                flatDescription,
                edit = null
            }
        } = this.props;

        return (
            <div className="favorites-item">
                <div className="header-item">
                    <div className="title-item">
                        <div className="type">
                            {type}
                        </div>
                        <div className="title-wrapper">
                            <div className="title">
                                {title}
                            </div>
                            <div>
                                <div>{modified.substr(0, 10)}</div>
                                {
                                    edit
                                        ? <div className="edit">
                                                edit:&nbsp;
                                                <span>{new Date(edit).getFullYear()}-</span>
                                                <span>{new Date(edit).getMonth() + 1 > 10
                                                    ? `0${new Date(edit).getMonth() + 1}`
                                                    : `0${new Date(edit).getMonth() + 1}`}-</span>
                                                <span>{new Date(edit).getDate() + 1}</span>
                                                <span></span>
                                        </div>
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        {score}
                    </div>
                </div>
                <div className="description">
                    {
                        this.state.edit
                            ? <textarea
                                className="description-text"
                                rows={4}
                                onChange={this.handleTextChange}
                                value={this.state.text}
                              >
                                {flatDescription}
                              </textarea>
                            : <div className="description-text">{flatDescription}</div>
                    }
                    <div className='href'>
                        <a href={vhref} target="_blank">
                            <img className="icon" src={arrow} alt=''/>
                        </a>
                    </div>
                </div>
                <div className="btn">
                    {
                        this.state.edit
                            ? <div className="icon-wrapper" onClick={this.handlerReconfirm}>
                                <img className="icon" src={Reconfirm} alt=''/>
                            </div>
                            : <div className="icon-wrapper" onClick={this.handlerEdit}>
                                <img className="icon" src={Edit} alt=''/>
                            </div>
                    }
                    <div className="icon-wrapper" onClick={() => this.handlerDelete(id)}>
                        <img className="icon" src={Delete} alt=''/>
                    </div>
                </div>
            </div>
        )
    }
}

export default FavoritesItem;
