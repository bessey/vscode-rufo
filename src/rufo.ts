import { exec } from "child_process";
import {
  Position,
  Range,
  TextDocument,
  TextDocumentWillSaveEvent,
  TextEdit,
  TextEditorEdit,
  window,
  workspace
} from "vscode";

type EditBuilderCallback = (editBuilder: TextEditorEdit) => void;

export function onFormatRuby() {
  const editor = window.activeTextEditor;
  if (!editor) return;
  const { document } = editor;
  runRufoOnDocument(document, edit => editor.edit(edit));
}

export function onWillSaveTextDocument(event: TextDocumentWillSaveEvent) {
  const { document } = event;
  if (!document.isDirty) return;
  if (document.languageId !== "ruby") return;
  const formatOnSave = workspace.getConfiguration("rufo.formatOnSave");
  if (!formatOnSave) return;

  const promise = new Promise(resolve =>
    runRufoOnDocument(document, edit => resolve([edit(TextEdit)]))
  );
  return event.waitUntil(promise);
}

function runRufoOnDocument(
  document: TextDocument,
  callback: (editCb: EditBuilderCallback) => void
): void {
  try {
    const documentText = document.getText();
    const child = exec("rufo", (error, stdout, stderr) => {
      if (error || stderr) console.log("ERROR", error, stderr);
      const formattedText = stdout;
      const edit = replaceDocumentWithFormatted(document, formattedText);
      callback(edit);
    });
    child.stdin.write(documentText);
    child.stdin.end();
  } catch (err) {
    if (err.message.includes("command not found")) {
      window.showErrorMessage(
        "rufo not available in path. Ensure rufo gem is installed"
      );
    } else {
      window.showErrorMessage(err.message);
    }
  }
}

function replaceDocumentWithFormatted(
  document: TextDocument,
  formattedText: string
): EditBuilderCallback {
  // Build a Range spanning the entire document, start to finish
  const lastLine = document.lineCount - 1;
  const endOfLastLine = document.lineAt(lastLine).range.end;
  const range = new Range(new Position(0, 0), endOfLastLine);
  // Build an edit that replaces the document with the new formatted version
  return editBuilder => editBuilder.replace(range, formattedText);
}