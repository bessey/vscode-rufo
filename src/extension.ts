"use strict";
import { commands, ExtensionContext, workspace } from "vscode";
import { onFormatRuby, onWillSaveTextDocument } from "./rufo";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
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
