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
	const { text, show_card_message } = attributes;
	console.log(show_card_message);
	const blockProps = useBlockProps();

	useEffect(() => {

		// Send a PUT request to update the values on the server
		fetch('/wp-json/my-api/v1/my-boolean-values', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(
				{
					value1: show_card_message,
					value2: false,
					value3: true
				}

			)
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
			});
	}, [show_card_message]);


	return (
		<div {...blockProps}>
			{/* Edit the value of the API here. */}

			{/* The Control Panel will go here. */}

			<InspectorControls>
				<PanelBody title={__('Component options', 'first-api')}>
					{/* Add ToggleControl here. */}
					<ToggleControl
						label="Toggle Card Message on/off"
						checked={show_card_message}
						onChange={() => setAttributes({ show_card_message: !show_card_message })}
					/>

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
