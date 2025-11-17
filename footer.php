    <!-- Article Navigation (shown at bottom of posts) -->
    <?php if (is_single() || is_page()) : ?>
    <nav class="article-nav">
        <div class="article-nav-container">
            <a href="<?php echo esc_url(home_url('/#newsletter-signup')); ?>" class="article-nav-link">Newsletters</a>
            <a href="<?php echo esc_url(home_url('/ghostwriting')); ?>" class="article-nav-link">Need a Ghostwriter?</a>
        </div>
    </nav>
    <?php endif; ?>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <p class="footer-text">© <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All Rights Reserved.</p>
        </div>
    </footer>

    <?php wp_footer(); ?>
</body>
</html>

