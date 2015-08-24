<?php
/**
* Implementation of hook_views_default_views().
**/
function stanford_indies_views_default_views() {
  $files = file_scan_directory(drupal_get_path('module', 'stanford_indies'). '/views/export', '/.*\.view$/');
  foreach ($files as $filepath => $file) {
    require $filepath;
    if (isset($view)) {
      $views[$view->name] = $view;
    }
  }
  return $views;
}
