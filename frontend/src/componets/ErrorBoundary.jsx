import React, { Component } from "react";
import toast from "react-hot-toast";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate an error has occurred
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log error to an error reporting service
    this.setState({
      error,
      errorInfo,
    });
    // Show error toast notification
    toast.error("Something went wrong. Please try again later.");
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any fallback UI if an error occurs
      return (
        <div className="error-boundary">
          <h2>Something went wrong!</h2>
          <p>
            Please try again later or contact support if the issue persists.
          </p>
        </div>
      );
    }

    // If no error, render the children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
