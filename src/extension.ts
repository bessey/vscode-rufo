import * as vscode from "vscode";
import { RubyDocumentFormatter } from "./rufo";

const languagesSupported = ["ruby", "erb", "gemfile"];

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate() {
  vscode.languages.registerDocumentFormattingEditProvider(
    languagesSupported.map(language => ({ language, scheme: "file" })),
    new RubyDocumentFormatter()
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
