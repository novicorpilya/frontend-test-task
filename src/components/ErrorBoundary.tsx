import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { ErrorBanner } from './ErrorBanner';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
                    <ErrorBanner
                        message={`Критическая ошибка приложения: ${this.state.error?.message}. Пожалуйста, обновите страницу.`}
                        onRetry={() => window.location.reload()}
                    />
                </div>
            );
        }

        return this.props.children;
    }
}
