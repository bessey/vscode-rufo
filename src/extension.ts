"use strict";
import { commands, ExtensionContext, workspace } from "vscode";
import { onFormatRuby, onWillSaveTextDocument } from "./rufo";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vscode-rufo" is now active!');

  const formatRuby = commands.registerCommand(
    "extension.formatRuby",
    onFormatRuby
  );
  const eventFormatRuby = workspace.onWillSaveTextDocument(
    onWillSaveTextDocument
  );

  context.subscriptions.push(formatRuby);
  context.subscriptions.push(eventFormatRuby);
}

// this method is called when your extension is deactivated
export function deactivate() {
  // No-op
}
