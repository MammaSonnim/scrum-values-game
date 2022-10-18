import React, { Component } from 'react';
import { Button } from '../button';

export class ErrorBoundary extends Component {
  state = { isError: false, error: null };

  promiseRejectionHandler = (event: PromiseRejectionEvent) => {
    this.setState({
      error: event.reason,
      isError: true,
    });
  };

  componentDidMount() {
    window.addEventListener('unhandledrejection', this.promiseRejectionHandler);
  }

  componentWillUnmount() {
    window.removeEventListener(
      'unhandledrejection',
      this.promiseRejectionHandler
    );
  }

  componentDidCatch() {
    this.setState({ isError: true });
  }

  render() {
    if (this.state.isError) {
      return <Button onClick={this.handleReload}>Reload page</Button>;
    }

    return this.props.children;
  }

  handleReload = () => {
    window.location.reload();
  };
}
