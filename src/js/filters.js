/**
 * External dependencies
 */
import { __experimentalRegisterCheckoutFilters } from '@woocommerce/blocks-checkout';
import { registerPaymentMethodExtensionCallbacks } from '@woocommerce/blocks-registry';
import { __, sprintf } from '@wordpress/i18n';

export const registerFilters = ( pointsLabelPlural, discountRegex ) => {
	__experimentalRegisterCheckoutFilters( 'first-api', {
		itemName: ( name ) => {
			return `${ name } + extra data!`;
		},
	} );

	registerPaymentMethodExtensionCallbacks( 'first-api', {
		cod: ( arg ) => arg.billingData.city !== 'Denver',
	} );
};
