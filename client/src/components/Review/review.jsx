import React from 'react';
import s from '../../styles/review.module.css';
import { useEffect } from 'react';

const Review = ({ handlerRate, review }) => {
	useEffect(() => {
		if (review) {
			let rate5 = document.querySelector('#rate-1');
			let rate4 = document.querySelector('#rate-2');
			let rate3 = document.querySelector('#rate-3');
			let rate2 = document.querySelector('#rate-4');
			let rate1 = document.querySelector('#rate-5');

			switch (review.rate) {
				case 1:
					rate1.checked = true;
					break;
				case 2:
					rate2.checked = true;
					break;
				case 3:
					rate3.checked = true;
					break;
				case 4:
					rate4.checked = true;
					break;
				case 5:
					rate5.checked = true;
					break;
			}
		}
	}, []);

	return (
		<div className={s.container}>
			<form name='rate' className={s.rating}>
				<input id='rate-1' name='rate' type='radio' value='5' onChange={handlerRate}></input>
				<label for='rate-1' name='rate'></label>
				<input id='rate-2' name='rate' type='radio' value='4' onChange={handlerRate}></input>
				<label for='rate-2' name='rate'></label>
				<input id='rate-3' name='rate' type='radio' value='3' onChange={handlerRate}></input>
				<label for='rate-3' name='rate'></label>
				<input id='rate-4' name='rate' type='radio' value='2' onChange={handlerRate}></input>
				<label for='rate-4' name='rate'></label>
				<input id='rate-5' name='rate' type='radio' value='1' onChange={handlerRate}></input>
				<label for='rate-5' name='rate'></label>
			</form>
		</div>
	);
};

export default Review;
