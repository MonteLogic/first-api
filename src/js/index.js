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
import { CardMessage } from './CardMessage';

const exampleDataFromSettings = getSetting('first-api_data');



// I think I'm going to have one http request here and then conditonally render below. 


const render = () => {



	return (
		<>
			<ExperimentalOrderMeta>
				<ExampleComponent />
			</ExperimentalOrderMeta>
			<ExperimentalOrderShippingPackages>
				<CardMessage />
			</ExperimentalOrderShippingPackages>
		</>
	);
};

registerPlugin('first-api', {
	render,
	scope: 'woocommerce-checkout',
});

registerFilters();
