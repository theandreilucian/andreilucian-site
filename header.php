<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="brand"><?php bloginfo('name'); ?></a>
            <div class="nav-links">
                <a href="<?php echo esc_url(home_url('/#newsletter-signup')); ?>" class="nav-link">Newsletters</a>
                <a href="<?php echo esc_url(home_url('/ghostwriting')); ?>" class="nav-link">Need a Ghostwriter?</a>
            </div>
        </div>
    </nav>

