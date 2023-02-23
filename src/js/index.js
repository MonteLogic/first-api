/**
 * External dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import { ExperimentalOrderMeta, ExperimentalOrderShippingPackages } from '@woocommerce/blocks-checkout';
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import './style.scss';

import { registerFilters } from './filters';
import { ExampleComponent } from './ExampleComponent';
import { useEffect, useState } from '@wordpress/element';
import { DatePicker } from './DatePicker';

const exampleDataFromSettings = getSetting('first-api_data');



// I think I'm going to have one http request here and then conditonally render below. 


const render = () => {
	const [value1, setValue1] = useState(false);
	const [value2, setValue2] = useState(false);
	const [value3, setValue3] = useState(false);


	useEffect(() => {
		let isMounted = true;
	  
		fetch('/wp-json/my-api/v1/my-boolean-values')
		  .then(response => response.json())
		  .then(data => {
			if (isMounted) {
			  setValue1(data.value1);
			  setValue2(data.value2);
			  setValue3(data.value3);
			}
		  });
	  
		return () => {
		  isMounted = false;
		};
	  }, []);
	  
	console.log(value1);
	console.log(value3);

	return (
		<>
			<ExperimentalOrderMeta>
				<ExampleComponent />
			</ExperimentalOrderMeta>
			<ExperimentalOrderShippingPackages>
				<DatePicker />
			</ExperimentalOrderShippingPackages>
		</>
	);
};

registerPlugin('first-api', {
	render,
	scope: 'woocommerce-checkout',
});

registerFilters();
