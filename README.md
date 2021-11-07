# vscode-rufo

## Seeking new maintainer - I am happy to take contributions but I do not use this extension anymore

VS Code extension for formatting ruby files using the [rufo](https://github.com/ruby-formatter/rufo) gem.

![Example of format on save](./formatting-example.gif)

## Features

Supports formatting on save, or with a command

## Requirements

Depends on the [rufo](https://github.com/ruby-formatter/rufo) gem being installed and available in your PATH.

```bash
  $ gem install rufo
```

## Usage

Uses the standard VS Code Formatting Extension API.

If you want to format a file one off, you will find `> Format Document` in your command palette.

Out of the box, Rufo will format your Ruby, ERB, and Gemfile documents on Save. To change this you may override `editor.formatOnSave` either, or more specifically just for the Ruby language:

```js
  "[ruby]": { // or [erb] / [gemfile]
    "editor.formatOnSave": true
  }
```

## Issues

Doesn't seem to respect `.rufo` preferences, not sure why yet.
