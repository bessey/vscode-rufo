# Change Log

All notable changes to the "vscode-rufo" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## 0.1.0

* Rewritten using the [Formatting API](https://code.visualstudio.com/blogs/2016/11/15/formatters-best-practices). This means that "format on save" and "format document" work the same way as other natively supported languages in VS Code.

## 0.0.5

* .rufo file still ignored, but fixes regression 0.0.4 introduced.

## 0.0.4

* Set working directory to the open project path, to ensure .rufo file settings are respected

## 0.0.3

* Fix formatOnSave option having no effect (was previously always on, sorry!)

## 0.0.2

* Handle syntax errors Ruby better. (Do nothing instead of clearing the document!)

## 0.0.1

* Initial release
