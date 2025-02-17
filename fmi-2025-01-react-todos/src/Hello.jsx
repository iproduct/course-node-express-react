import { Component } from "react";

export default class Hello extends Component {
    interval = undefined
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }
    componentDidMount() {
        this.interval = setInterval(this.incrementCount, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    incrementCount = () => {
        this.setState(state => ({ count: state.count + 1 }))
    }
    render() {
        return (
            <div className="hello">
                <h2>Hello, {this.props.name}</h2>
                <h2>{this.state.count}</h2>
            </div>
        )
    }
}