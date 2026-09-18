import React, {useState} from 'react';
import {LicensePlate} from '../license-plate/LicensePlate';
import {Jumbotron} from '../jumbotron/Jumbotron';
import {useCart} from '../cart-service/cart-hook';

/**
 * Lab RC1 - keys and reconciliation, on our own cart.
 *
 * Worked solution. Do the experiment in `CartView.js` first: this file is
 * what it looks like once the key is right.
 *
 * The experiment, in one sentence: type a gift note on a row, sort the cart,
 * and watch whether the note follows its plate or stays at its position.
 */
export function CartViewKeysSolution(props) {

	const [cartContents, , removePlateFromCart] = useCart();
	const [sortedByPrice, setSortedByPrice] = useState(false);

	// A copy: never sort the array the hook owns.
	const rows = [...(cartContents || [])];
	if (sortedByPrice) {
		rows.sort((a, b) => a.price - b.price);
	}

	return (
		<>
			<Jumbotron title="My Cart" description="Your current cart contents:"/>
			<div className="container">

				<button
					className="btn btn-sm btn-outline-secondary mb-3"
					onClick={() => setSortedByPrice((sorted) => !sorted)}
				>
					{sortedByPrice ? 'Sort by date added' : 'Sort by price'}
				</button>

				{rows.length === 0 && (
					<div className="alert alert-info" role="alert">Your cart is empty</div>
				)}

				<div className="row">
					{rows.map((licensePlate, index) => (
						// THE ONE LINE THAT MATTERS.
						//
						//   key={index}        -> the note follows the POSITION
						//   key={licensePlate._id} -> the note follows the PLATE
						//
						// Try both. The `index % 2` striping below is a good
						// control: it is meant to be positional, and it keeps
						// working either way.
						<div
							key={licensePlate._id}
							className="col-md-4"
							style={{backgroundColor: (index % 2 === 0) ? '#F5F5F5' : ''}}
						>
							<LicensePlate
								currency={props.currency}
								plate={licensePlate}
								buttonText="Remove from cart &times;"
							/>

							{/* Uncontrolled on purpose: the typed value lives in the
							    DOM node, so it moves exactly when React decides to
							    reuse or recreate that node. Nothing in our own state
							    can paper over the bug. */}
							<label className="w-100">
								<span className="sr-only">Gift note</span>
								<input
									className="form-control form-control-sm mb-2"
									placeholder={`Gift note for ${licensePlate.title}`}
								/>
							</label>

							{/* Second experiment: remove the FIRST plate and watch
							    where the notes end up. Reordering is not the only
							    way to break index keys - an insertion or a removal
							    anywhere but at the end does it too. */}
							<button
								className="btn btn-sm btn-outline-danger mb-3"
								onClick={() => removePlateFromCart(licensePlate)}
							>
								Remove from cart
							</button>
						</div>
					))}
				</div>
				<hr/>
			</div>
		</>
	);
}

/**
 * WHY IT HAPPENS
 *
 * React pairs the children of a list by key. With `key={index}`, the plate at
 * position 0 before the sort and the plate at position 0 after the sort share
 * a key, so React decides they are the same element: it keeps the DOM node -
 * and the text you typed into it - and only updates the props that changed.
 * The note stays at position 0 while its plate moves away.
 *
 * With a stable `_id`, the same plate keeps the same key wherever it lands, so
 * React moves the existing node instead of rewriting it, and the note travels
 * with the plate.
 *
 * WHAT TO TAKE AWAY
 *
 * Index keys are only safe when the list never reorders, never gets an
 * insertion anywhere but the end, and the rows hold no state of their own.
 * A cart fails all three.
 *
 * BONUS, if the group is quick: swap the input for a controlled one whose
 * value lives in a `notes` object keyed by `_id`. The bug disappears even
 * with `key={index}` - and that is worth a minute of discussion, because the
 * broken reconciliation is still there, you have just stopped storing
 * anything where it could hurt.
 */
