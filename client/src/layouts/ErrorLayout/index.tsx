// @ts-nocheck
import { Result, Button } from 'antd';
import { Component, ReactNode } from 'react';

const ErrorUI = () => {
  const handleButton = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={<Button type="primary" onClick={handleButton}>Refresh</Button>}
    />
  );
};

type MyProps = {
    children: ReactNode;
};
type MyState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    // ToDo - add check for old chunks
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // eslint-disable-next-line no-console
    console.error(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <ErrorUI />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
