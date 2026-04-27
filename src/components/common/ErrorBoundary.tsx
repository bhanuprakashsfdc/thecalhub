import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-surface flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-surface-container-high rounded-2xl p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-on-error-container" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-on-surface">Something went wrong</h2>
                <p className="text-neutral-400 text-sm">We apologize for the inconvenience</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-neutral-300 mb-2">
                An unexpected error occurred while rendering this page. Please try again.
              </p>
              {this.state.error && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-primary-fixed hover:underline">
                    Show error details
                  </summary>
                  <pre className="mt-2 p-4 bg-surface-container-low rounded-lg text-xs overflow-auto text-neutral-300">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
            </div>

            <button
              onClick={this.handleReset}
              className="flex items-center gap-2 px-6 py-3 bg-primary-fixed text-on-primary rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
