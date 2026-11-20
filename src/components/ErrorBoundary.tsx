import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error?.message || 'An unexpected rendering issue occurred.',
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FFF7FA] text-[#2B121F] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white border border-[#F1D5E2] rounded-2xl p-8 text-center shadow-sm">
            <h1 className="font-display text-2xl font-semibold text-[#2B121F] mb-2">
              Something went off-track
            </h1>
            <p className="text-sm text-[#6E485A] mb-6 leading-relaxed">
              {this.state.message}
            </p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, message: '' });
                window.location.reload();
              }}
              className="px-5 py-2.5 rounded-lg bg-[#BE185D] text-white text-sm font-medium hover:bg-[#9D174D] transition-colors"
            >
              Reload App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
