/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
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
	const { text } = attributes;
	const blockProps = useBlockProps();

	useEffect(() => {
		// Hard-code the boolean values to true
		const updatedValues = {
			value1: true,
			value2: true,
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
	}, []);


	return (
		<div {...blockProps}>
			{/* Edit the value of the API here. */}




			<InspectorControls>
				<PanelBody title={__('Block options', 'first-api')}>
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
