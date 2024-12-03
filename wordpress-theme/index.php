<?php
/**
 * Main template file
 * 
 * This file is intentionally minimal as the frontend is handled by Astro.
 * It serves as a fallback for direct WordPress access.
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            line-height: 1.5;
            margin: 0;
            padding: 2rem;
            max-width: 800px;
            margin: 0 auto;
        }
        .message {
            background: #f4f4f4;
            border-radius: 8px;
            padding: 2rem;
            margin: 2rem 0;
        }
    </style>
</head>
<body <?php body_class(); ?>>
    <div class="message">
        <h1>Headless WordPress Site</h1>
        <p>This WordPress installation is configured as a headless CMS. Please visit the frontend application to view the site.</p>
        <?php if (defined('FRONTEND_URL')): ?>
            <p><a href="<?php echo FRONTEND_URL; ?>">Visit the site</a></p>
        <?php endif; ?>
    </div>
    <?php wp_footer(); ?>
</body>
</html>