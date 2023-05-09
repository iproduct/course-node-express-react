import React, { ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";


interface ErrorBoundaryState {
    error: any;
    errorInfo: any;
}

function logErrorToMyService(error: any, errorInfo: any) {
    console.log(error, '->', errorInfo);
}

export default class ErrorBoundary<P> extends React.Component<PropsWithChildren<P>, ErrorBoundaryState> {
    state: Readonly<ErrorBoundaryState> = {
        error: undefined,
        errorInfo: undefined,
    };

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { error: error };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service
        logErrorToMyService(error, errorInfo);
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        if (this.state.error !== undefined) {
            // You can render any custom fallback UI
            return (
                <div>
                    <h3>Something went wrong: {this.state.error?.toString()}</h3>
                    <p>Error Info: {this.state.errorInfo?.componentStack}</p>
                </div>
            );
        }

        return this.props.children;
    }
}