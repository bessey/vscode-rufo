"use strict";
import { languages } from "vscode";
import { RubyDocumentFormatter } from "./rufo";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate() {
  languages.registerDocumentFormattingEditProvider(
    { language: "ruby", scheme: "file" },
    new RubyDocumentFormatter()
  );
}

// this method is called when your extension is deactivated
export function deactivate() {
  // No-op
}
