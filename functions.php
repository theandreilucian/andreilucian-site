<?php
/**
 * Andrei Lucian Theme Functions
 */

// Theme setup
function andreilucian_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    add_theme_support('custom-logo');
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'andreilucian'),
    ));
    
    // Add image sizes
    add_image_size('article-thumbnail', 400, 300, true);
    add_image_size('ebook-cover', 280, 380, true);
}
add_action('after_setup_theme', 'andreilucian_setup');

// Customize homepage title
function andreilucian_homepage_title($title_parts) {
    if (is_front_page() && is_home()) {
        $title_parts['title'] = 'Home';
        $title_parts['site'] = 'Andrei Lucian';
    }
    return $title_parts;
}
add_filter('document_title_parts', 'andreilucian_homepage_title');

// Enqueue scripts and styles
function andreilucian_scripts() {
    // Styles
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap', array(), null);
    wp_enqueue_style('andreilucian-style', get_stylesheet_uri(), array(), '1.0.0');
    wp_enqueue_style('andreilucian-main', get_template_directory_uri() . '/assets/css/main.css', array(), '1.0.0');
    
    // Scripts
    wp_enqueue_script('andreilucian-script', get_template_directory_uri() . '/assets/js/main.js', array(), '1.0.0', true);
    
    // Localize script for AJAX
    wp_localize_script('andreilucian-script', 'andreilucianAjax', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('andreilucian_nonce')
    ));
}
add_action('wp_enqueue_scripts', 'andreilucian_scripts');

// Substack Integration - Fetch articles from Substack RSS
function get_substack_articles($limit = 3) {
    $substack_url = get_option('substack_rss_url', '');
    if (empty($substack_url)) {
        return array();
    }
    
    $rss = fetch_feed($substack_url);
    if (is_wp_error($rss)) {
        return array();
    }
    
    $max_items = $rss->get_item_quantity($limit);
    $rss_items = $rss->get_items(0, $max_items);
    
    $articles = array();
    foreach ($rss_items as $item) {
        $articles[] = array(
            'title' => $item->get_title(),
            'link' => $item->get_link(),
            'date' => $item->get_date('U'),
            'excerpt' => wp_trim_words($item->get_description(), 30),
            'content' => $item->get_content(),
        );
    }
    
    return $articles;
}

// Register widget areas
function andreilucian_widgets_init() {
    register_sidebar(array(
        'name' => __('Sidebar', 'andreilucian'),
        'id' => 'sidebar-1',
        'description' => __('Add widgets here.', 'andreilucian'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget' => '</section>',
        'before_title' => '<h2 class="widget-title">',
        'after_title' => '</h2>',
    ));
}
add_action('widgets_init', 'andreilucian_widgets_init');

// Customizer settings
function andreilucian_customize_register($wp_customize) {
    // Substack RSS URL
    $wp_customize->add_setting('substack_rss_url', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
    ));
    
    $wp_customize->add_control('substack_rss_url', array(
        'label' => __('Substack RSS URL', 'andreilucian'),
        'section' => 'title_tagline',
        'type' => 'url',
        'description' => __('Enter your Substack publication RSS feed URL', 'andreilucian'),
    ));
    
    // Newsletter subscriber count
    $wp_customize->add_setting('newsletter_subscribers', array(
        'default' => '570+',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('newsletter_subscribers', array(
        'label' => __('Newsletter Subscribers', 'andreilucian'),
        'section' => 'title_tagline',
        'type' => 'text',
    ));
}
add_action('customize_register', 'andreilucian_customize_register');

// Newsletter form handler
function handle_newsletter_subscription() {
    check_ajax_referer('andreilucian_nonce', 'nonce');
    
    $email = sanitize_email($_POST['email']);
    
    if (!is_email($email)) {
        wp_send_json_error(array('message' => 'Invalid email address'));
    }
    
    // Here you would integrate with your email service (ConvertKit, Mailchimp, etc.)
    // For now, just return success
    wp_send_json_success(array('message' => 'Thank you for subscribing!'));
}
add_action('wp_ajax_newsletter_subscribe', 'handle_newsletter_subscription');
add_action('wp_ajax_nopriv_newsletter_subscribe', 'handle_newsletter_subscription');

// Add custom post type for Resources
function register_resources_post_type() {
    register_post_type('resource', array(
        'labels' => array(
            'name' => __('Resources', 'andreilucian'),
            'singular_name' => __('Resource', 'andreilucian'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-book-alt',
    ));
}
add_action('init', 'register_resources_post_type');

// Add meta boxes for resources
function add_resource_meta_boxes() {
    add_meta_box(
        'resource_details',
        __('Resource Details', 'andreilucian'),
        'resource_details_callback',
        'resource',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'add_resource_meta_boxes');

function resource_details_callback($post) {
    wp_nonce_field('save_resource_details', 'resource_details_nonce');
    
    $price = get_post_meta($post->ID, '_resource_price', true);
    $is_free = get_post_meta($post->ID, '_resource_is_free', true);
    $product_type = get_post_meta($post->ID, '_resource_type', true);
    $link_url = get_post_meta($post->ID, '_resource_link', true);
    
    ?>
    <p>
        <label>
            <input type="checkbox" name="resource_is_free" value="1" <?php checked($is_free, '1'); ?>>
            Free Resource
        </label>
    </p>
    <p>
        <label>Price: <input type="text" name="resource_price" value="<?php echo esc_attr($price); ?>" placeholder="$47"></label>
    </p>
    <p>
        <label>Product Type:
            <select name="resource_type">
                <option value="ebook" <?php selected($product_type, 'ebook'); ?>>E-book</option>
                <option value="micro" <?php selected($product_type, 'micro'); ?>>Micro Product</option>
                <option value="coming-soon" <?php selected($product_type, 'coming-soon'); ?>>Coming Soon</option>
            </select>
        </label>
    </p>
    <p>
        <label>Link URL: <input type="url" name="resource_link" value="<?php echo esc_url($link_url); ?>" placeholder="https://..."></label>
    </p>
    <?php
}

function save_resource_details($post_id) {
    if (!isset($_POST['resource_details_nonce']) || !wp_verify_nonce($_POST['resource_details_nonce'], 'save_resource_details')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (isset($_POST['resource_is_free'])) {
        update_post_meta($post_id, '_resource_is_free', '1');
    } else {
        update_post_meta($post_id, '_resource_is_free', '0');
    }
    
    if (isset($_POST['resource_price'])) {
        update_post_meta($post_id, '_resource_price', sanitize_text_field($_POST['resource_price']));
    }
    
    if (isset($_POST['resource_type'])) {
        update_post_meta($post_id, '_resource_type', sanitize_text_field($_POST['resource_type']));
    }
    
    if (isset($_POST['resource_link'])) {
        update_post_meta($post_id, '_resource_link', esc_url_raw($_POST['resource_link']));
    }
}
add_action('save_post', 'save_resource_details');

