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
add_action('woocommerce_blocks_loaded', function () {

    require_once __DIR__ . '/first-api-blocks-integration.php';
    add_action(
        'woocommerce_blocks_cart_block_registration',
        function ($integration_registry) {
            $integration_registry->register(new FirstApi_Blocks_Integration());
        }
    );
    add_action(
        'woocommerce_blocks_checkout_block_registration',
        function ($integration_registry) {
            $integration_registry->register(new FirstApi_Blocks_Integration());
        }
    );
});



add_filter( 'rest_authentication_errors', function( $result ) {
    // Check if the current request is a PUT request to your API endpoint
    if ( $_SERVER['REQUEST_METHOD'] === 'PUT' && strpos( $_SERVER['REQUEST_URI'], '/my-api/v1/my-boolean-values' ) !== false ) {
        // Check if the current user has the 'edit_posts' capability
        if ( ! current_user_can( 'edit_posts' ) ) {
            // If the user is not authorized, return an error message
            return new WP_Error( 'rest_forbidden', __( 'You are not authorized to make this request.', 'my-text-domain' ), array( 'status' => 401 ) );
        }
    }
    // If the request is not a PUT request to your API endpoint, return the original result
    return $result;
} );


// Add options
function add_options()
{
    add_option('my_boolean_value_1', false);
    add_option('my_boolean_value_2', false);
    add_option('my_boolean_value_3', false);
}

add_action('init', 'add_options');

/**
 * Registers the slug as a block category with WordPress.
 */
function register_FirstApi_block_category($categories)
{
    return array_merge(
        $categories,
        [
            [
                'slug' => 'first-api',
                'title' => __('FirstApi Blocks', 'first-api'),
            ],
        ]
    );
}
add_action('block_categories_all', 'register_FirstApi_block_category', 10, 2);

add_action('rest_api_init', function () {
    register_rest_route('my-api/v1', '/my-boolean-values', array(
        'methods' => 'GET',
        'callback' => 'my_boolean_values_callback',
    ));
});

function my_boolean_values_callback($request)
{

    $values = array(
        'value1' => get_option('my_boolean_value_1'),
        'value2' => get_option('my_boolean_value_2'),
        'value3' => get_option('my_boolean_value_3'),
    );
    return $values;
}

// add_action('rest_api_init', function () {
//     register_rest_route('my-api/v1', '/my-boolean-values', array(
//         'methods' => 'PUT',
//         'callback' => 'update_boolean_values',
//         'permission_callback' => function () {
//             return current_user_can('edit_others_posts');
//         },
//     ));
// });

add_action('rest_api_init', function () {
    register_rest_route('my-api/v1', '/my-boolean-values', array(
        'methods' => WP_REST_Server::EDITABLE,
        'callback' => 'update_boolean_values',
        // 'permission_callback' => function () {
        //     return current_user_can('edit_others_posts');
        // }
        'permission_callback' => '__return_true',

    ));
});

function update_item_permissions_check($request)
{
    if (current_user_can('manage_options')) {

        return true;
    }


}

function update_boolean_values($request)
{
    // Retrieve the updated boolean values from the request body
    $params = $request->get_params();
    $value1 = $params['value1'];
    $value2 = $params['value2'];
    $value3 = $params['value3'];
    update_option('my_boolean_value_1', $value1);
    update_option('my_boolean_value_2', $value2);
    update_option('my_boolean_value_3', $value3);
    // Perform any validation or processing on the values here

    // Update the boolean values in the database or any other data source
    // ...

    // Return the updated boolean values as a JSON response
    return array(
        'value1' => get_option('my_boolean_value_1'),
        'value2' => get_option('my_boolean_value_2'),
        'value3' => get_option('my_boolean_value_3'),
    );
}
