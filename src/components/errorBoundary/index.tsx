import React, { Component, Fragment, ReactElement } from 'react';
import { Button } from '../button';
import { Nav } from '../nav';

type PropsT = {
  children: ReactElement[];
};

type StateT = {
  isError: boolean;
  error: string | null;
};
export class ErrorBoundary extends Component<PropsT, StateT> {
  state = { isError: false, error: null };

  promiseRejectionHandler = (event: PromiseRejectionEvent) => {
    this.setState({
      error: event.reason,
      isError: true,
    });
  };

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener(
        'unhandledrejection',
        this.promiseRejectionHandler
      );
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener(
        'unhandledrejection',
        this.promiseRejectionHandler
      );
    }
  }

  componentDidCatch() {
    this.setState({ isError: true });
  }

  render() {
    if (this.state.isError) {
      return (
        <Fragment>
          <Nav />
          <Button onClick={this.handleReload}>Reload page</Button>
        </Fragment>
      );
    }

    return <Fragment>{this.props.children}</Fragment>;
  }

  handleReload = () => {
    window.location.reload();
  };
}
