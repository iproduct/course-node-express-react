import React from "react";

export class Cat extends React.Component {
    render() {
        const mouse = this.props.mouse;
        return (
            <img src="./cat.png" alt="The Cat" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
        );
    }
}

export class Dog extends React.Component {
    render() {
        const mouse = this.props.mouse;
        return (
            <img src="./dog.png" alt="The Dog" style={{ position: 'absolute', left: mouse.x + 100, top: mouse.y+ 50 }} />
        );
    }
}

export class Mouse extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = { x: 0, y: 0 };
    }

    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

    render() {
        return (
            <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

                {/*
            Instead of providing a static representation of what <Mouse> renders,
            use the `render` prop to dynamically determine what to render.
          */}
                {this.props.render(this.state)}
            </div>
        );
    }
}

export class RenderProp extends React.Component {
    render() {
        return (
            <div>
                <h1>Move the mouse around!</h1>
                <Mouse render={mouse => (
                    <>
                    <Cat mouse={mouse} />
                    <Dog mouse={mouse} />
                    </>
                )} />
            </div>
        );
    }
}