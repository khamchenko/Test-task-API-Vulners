import React, { Component } from 'react';
import { filter, map } from 'lodash';
import './EntryField.scss';

class EntryField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: [],
            onFocus: false,
            data: props.data || [],
        }
        this.handlerText= this.handlerText.bind(this);
        this.handlerFocus = this.handlerFocus.bind(this);
        this.handlerList = this.handlerList.bind(this);
    }
    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    handlerText(e) {
        let data = filter(this.props.data, (item, index) => {
            return item.key.indexOf(e.target.value) == 0
        })
        this.setState({
            text: e.target.value,
            data: data
        });
        this.CheckValueSearch(e.target.value)
    }

    handlerFocus() {
        let text = '';
        this.setState({
            text,
            onFocus: true,
            data: this.props.data
        });
        this.CheckValueSearch(text)
    }

    handlerList(elem) {
        if (elem == 'close') {
            this.timer = setTimeout(() => {this.setState({ onFocus: false})}, 150)
        } else {
            this.setState({
                text: elem,
                onFocus: false,
            });
            this.CheckValueSearch(elem)
        }
    }

    CheckValueSearch(text) {
        this.props.CheckValueSearch(text)
    }

    render() {
        const { onFocus, data = [] } = this.state;
        const { text } = this.props;
        return (
            <div className="input-wrapper">
                <input
                    name='ostype'
                    className="input"
                    type="text"
                    placeholder={this.props.placeholder}
                    onChange={this.handlerText}
                    value={text}
                    onFocus={this.handlerFocus}
                    onBlur={() => this.handlerList('close')}
                />
                {
                    (data.length !== 0 && onFocus && text.length !== 0) &&
                    <ul className="list">
                        {
                            map(data, (item, index) => {
                                if(index < 5 ) {
                                    return (
                                        <li
                                            key={item.key}
                                            onClick={() => this.handlerList(item.key)}
                                        >
                                            {item.key}
                                        </li>
                                    );
                                }
                            })
                        }
                    </ul>
                }
            </div>
        );
    }
}

export default EntryField;
