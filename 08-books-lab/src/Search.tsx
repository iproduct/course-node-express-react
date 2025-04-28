
import React, { ChangeEvent, Component, FormEvent } from 'react'
import PropTypes from 'prop-types'

type SearchCallback = (keywords: string) => any

interface SearchProps {
    onsearch: SearchCallback
}

interface SearchState {
    keywords: string;
    keywords2: string;
}

export default class Search extends Component<SearchProps, SearchState> {
    static propTypes = {
        onsearch: PropTypes.func.isRequired
    }
    state: SearchState = {
        keywords: '',
        keywords2: ''
    }

    constructor(props: SearchProps) {
        super(props);
        this.submitKeywords = this.submitKeywords.bind(this)
        // this.keywordsChanged = this.keywordsChanged.bind(this)
    }

    submitKeywords( keywords: string, event: FormEvent,) {
        event.preventDefault()
        if (this.state.keywords.trim().length > 0 || this.state.keywords2.trim().length > 0) {
            this.setState({ keywords: '' , keywords2: '' });
            this.props.onsearch(this.state.keywords + "," + this.state.keywords2)
        }

    }

    keywordsChanged = (event: ChangeEvent) => {
        const val = (event.target as HTMLInputElement).value;
        this.setState({ keywords: val })
    }

    keywords2Changed = (event: ChangeEvent) => {
        const val = (event.target as HTMLInputElement).value;
        this.setState({ keywords2: val })
    }

    render() {
        return (
            <form onSubmit={this.submitKeywords.bind(this, this.state.keywords)} >
                <input placeholder="Enter search keywords here ..." type="text" onChange={this.keywordsChanged}
                    value={this.state.keywords} />
                <input placeholder="Enter search keywords here ..." type="text"
                    onChange={this.keywords2Changed}
                    value={this.state.keywords2} />
                <button className="btn waves-effect waves-light" type="submit">Submit
                    <i className="material-icons right">send</i>
                </button>
            </form>
        )
    }
}
