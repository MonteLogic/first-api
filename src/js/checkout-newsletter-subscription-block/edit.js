/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor'

import { ToggleControl } from '@wordpress/components';;
import { PanelBody } from '@wordpress/components';
import { CheckboxControl } from '@woocommerce/blocks-checkout';
import { getSetting } from '@woocommerce/settings';
import { useEffect, useState } from '@wordpress/element';
/**
 * Internal dependencies
 */
import './style.scss';
const { optInDefaultText } = getSetting('first-api_data', '');

export const Edit = ({ attributes, setAttributes }) => {
	const { text, show_date_picker } = attributes;
	console.log(show_date_picker);
	const blockProps = useBlockProps();

	useEffect(() => {
		// Hard-code the boolean values to true
		const updatedValues = {
			value1: false,
			value2: false,
			value3: true
		};

		// Send a PUT request to update the values on the server
		fetch('/wp-json/my-api/v1/my-boolean-values', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updatedValues)
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
			});
	}, [show_date_picker]);


	return (
		<div {...blockProps}>
			{/* Edit the value of the API here. */}

			{/* The Control Panel will go here. */}

			<InspectorControls>
				<PanelBody title={__('Component options', 'first-api')}>
					{/* Add ToggleControl here. */}
					<ToggleControl
						label="Toggle Date Picker on/off"

						checked={show_date_picker}

						onChange={() => setAttributes({ show_date_picker: !show_date_picker })}


					/>
					Options for the block go here.
				</PanelBody>
			</InspectorControls>
			<CheckboxControl
				id="newsletter-text"
				checked={false}
				disabled={true}
			/>
			<RichText
				value={text || optInDefaultText}
				onChange={(value) => setAttributes({ text: value })}
			/>
		</div>
	);
};

export const Save = ({ attributes }) => {
	const { text } = attributes;
	return (
		<div {...useBlockProps.save()}>
			<RichText.Content value={text} />
		</div>
	);
};
