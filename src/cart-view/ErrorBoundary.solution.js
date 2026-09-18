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

	/** Called during the render phase: return the new state, nothing else. */
	static getDerivedStateFromError(error) {
		return {error};
	}

	/** Called during the commit phase: this is where side effects belong. */
	componentDidCatch(error, info) {
		// In a real app this goes to Sentry / Datadog. The component stack is
		// the part that tells you WHICH component threw.
		console.error('Caught by the boundary:', error.message, info.componentStack);
	}

	render() {
		if (this.state.error) {
			return this.props.fallback({
				error: this.state.error,
				// Clearing the error re-renders the children. On its own that
				// only helps if something else fixed the cause - see the note
				// at the bottom of this file.
				reset: () => this.setState({error: null}),
			});
		}
		return this.props.children;
	}
}

/**
 * Usage in CartView:
 *
 *   <ErrorBoundary
 *     fallback={({error, reset}) => (
 *       <div className="alert alert-danger" role="alert">
 *         <p>We could not display your cart: {error.message}</p>
 *         <button className="btn btn-sm btn-outline-danger" onClick={reset}>
 *           Try again
 *         </button>
 *       </div>
 *     )}
 *   >
 *     <div className="row">{rows}</div>
 *   </ErrorBoundary>
 *
 *
 * THE PART THAT IS WORTH THE DISCUSSION
 *
 * Click "Try again" with the broken plate still in the cart and it crashes
 * straight back into the fallback. A reset button is not a fix: it only
 * gives the tree a second chance, so something has to have changed in
 * between - a refetch, a key that remounts, the bad item removed.
 *
 * That is why `reset` in this solution is handed to the fallback rather than
 * called on its own: the fallback is the only thing that knows what to do
 * before retrying.
 *
 *
 * WHAT THIS DOES NOT CATCH
 *
 * Boundaries catch errors thrown while React renders. They do not catch:
 *   - errors inside event handlers (your onClick is your problem)
 *   - rejected promises from async code
 *   - errors thrown in setTimeout / setInterval callbacks
 *   - errors thrown during server-side rendering
 *   - errors thrown by the boundary itself
 *
 * Try it: put a `throw new Error('from the handler')` in the "Remove from
 * cart" onClick. The boundary stays silent and the error lands in the
 * console. That surprises people, so it is worth doing live.
 */
