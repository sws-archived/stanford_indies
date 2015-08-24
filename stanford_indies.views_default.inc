<?php
/**
* Implementation of hook_views_default_views().
**/
function my_great_module_views_default_views() {
  $files = file_scan_directory(drupal_get_path('module', 'stanford_indies'). '/views', '/.*\.view$/');
  foreach ($files as $filepath => $file) {
    require $filepath;
    if (isset($view)) {
      $views[$view->name] = $view;
    }
  }
  return $views;
}
