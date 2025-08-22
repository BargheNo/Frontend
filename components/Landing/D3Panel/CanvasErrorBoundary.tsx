import React, { ReactNode } from "react";

type CanvasErrorBoundaryProps = {
    fallback: ReactNode;
    children?: ReactNode; // 👈 add this
};

type CanvasErrorBoundaryState = {
    hasError: boolean;
};

class CanvasErrorBoundary extends React.Component<
    CanvasErrorBoundaryProps,
    CanvasErrorBoundaryState
> {
    constructor(props: CanvasErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: any, info: any) {
        console.error("Canvas rendering error:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

export default CanvasErrorBoundary;
