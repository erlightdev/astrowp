<?php
/**
 * Theme functions and definitions
 */

// Add REST API support for featured images
add_action('rest_api_init', function () {
    register_rest_field('post', 'featured_image_url', array(
        'get_callback' => function ($post) {
            if (has_post_thumbnail($post['id'])) {
                $image = wp_get_attachment_image_src(get_post_thumbnail_id($post['id']), 'full');
                return $image[0];
            }
            return null;
        },
    ));
});

// Enable CORS for the REST API
add_action('init', function() {
    header("Access-Control-Allow-Origin: *");
});

// Add custom theme support
add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
});

// Disable default WordPress theme styles
add_action('wp_enqueue_scripts', function () {
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
    wp_dequeue_style('global-styles');
}, 100);