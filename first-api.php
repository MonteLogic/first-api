<?php
/**
 * Plugin Name:     First Api
 * Version:         0.1.0
 * Author:          The WordPress Contributors
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     first-api
 *
 * @package         create-block
 */
add_action('woocommerce_blocks_loaded', function() {
    require_once __DIR__ . '/first-api-blocks-integration.php';
	add_action(
		'woocommerce_blocks_cart_block_registration',
		function( $integration_registry ) {
			$integration_registry->register( new FirstApi_Blocks_Integration() );
		}
	);
	add_action(
		'woocommerce_blocks_checkout_block_registration',
		function( $integration_registry ) {
			$integration_registry->register( new FirstApi_Blocks_Integration() );
		}
	);
});

/**
 * Registers the slug as a block category with WordPress.
 */
function register_FirstApi_block_category( $categories ) {
    return array_merge(
        $categories,
        [
            [
                'slug'  => 'first-api',
                'title' => __( 'FirstApi Blocks', 'first-api' ),
            ],
        ]
    );
}
add_action( 'block_categories_all', 'register_FirstApi_block_category', 10, 2 );



add_action( 'rest_api_init', function () {
    register_rest_route( 'my-api/v1', '/my-boolean-values', array(
        'methods' => 'GET',
        'callback' => 'my_boolean_values_callback',
    ) );
} );


function my_boolean_values_callback( $request ) {
    $values = array(
        'value1' => true,
        'value2' => false,
        'value3' => true,
    );
    return $values;
}
