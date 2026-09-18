import React, {Component} from 'react';

/**
 * Lab EB1 - catching a render crash.
 *
 * Worked solution. Write your own `ErrorBoundary.js` first.
 *
 * A boundary has to be a class: `getDerivedStateFromError` and
 * `componentDidCatch` have no hook equivalent. This is the one place in a
 * 2026 codebase where you still write a class, and it is about fifteen lines.
 */
export class ErrorBoundary extends Component {

	state = {error: null};

	/** Render phase: return the new state, nothing else. */
	static getDerivedStateFromError(error) {
		return {error};
	}

	/** Commit phase: this is where side effects belong. */
	componentDidCatch(error, info) {
		// In a real app this goes to Sentry / Datadog. The component stack is
		// the part that tells you WHICH component threw.
		console.error('Caught by the boundary:', error.message, info.componentStack);
	}

	render() {
		if (this.state.error) {
			return this.props.fallback({
				error: this.state.error,
				reset: () => this.setState({error: null}),
			});
		}
		return this.props.children;
	}
}

/**
 * HOW IT IS WIRED IN App.tsx
 *
 *   <ErrorBoundary
 *     fallback={({error, reset}) => (
 *       <div className="container mt-4">
 *         <div className="alert alert-danger" role="alert">
 *           <p>We could not display this page: {error.message}</p>
 *           <button
 *             className="btn btn-sm btn-outline-danger"
 *             onClick={() => { setCurrency('USD'); reset(); }}
 *           >
 *             Back to US dollars
 *           </button>
 *         </div>
 *       </div>
 *     )}
 *   >
 *     <Routes>...</Routes>
 *   </ErrorBoundary>
 *
 *
 * WHY THE BUTTON DOES TWO THINGS
 *
 * `reset()` only clears the error and re-renders the children. On its own it
 * would crash straight back, because the bad currency code is still there.
 * Something has to change first - here, `setCurrency('USD')`. A reset button
 * is not a fix; it is a second chance for a tree whose cause has been dealt
 * with. Try it with only `reset()` and watch it loop.
 *
 *
 * WHAT THIS DOES NOT CATCH - DO THIS ONE LIVE
 *
 * Stop the backend server and reload the store. The fetch in StoreView fails,
 * and the boundary stays completely silent. Boundaries catch what is thrown
 * while React renders. They do not catch:
 *   - rejected promises (your fetch is your problem)
 *   - errors inside event handlers (your onClick too)
 *   - errors thrown in setTimeout / setInterval callbacks
 *   - errors during server-side rendering
 *   - errors thrown by the boundary itself
 *
 * That is why StoreView catches its own fetch failure and renders an alert:
 * async failures are handled with state, not with boundaries. People assume
 * the opposite, so it is worth showing rather than telling.
 */
