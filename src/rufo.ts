import { exec, ExecOptions } from "child_process";
import {
  DocumentFormattingEditProvider,
  Position,
  Range,
  TextDocument,
  TextEdit,
  workspace
} from "vscode";

export class RubyDocumentFormatter implements DocumentFormattingEditProvider {
  public provideDocumentFormattingEdits(
    document: TextDocument
  ): Thenable<TextEdit[]> {
    return runRufo(document);
  }
}

function runRufo(document: TextDocument) {
  return new Promise<TextEdit[]>((resolve, reject) => {
    try {
      const documentText = document.getText();
      const cwd = workspace.rootPath;
      const options: ExecOptions = { timeout: 3000 };
      if (cwd) options.cwd = cwd;
      const child = exec("rufo", options, (error, stdout, stderr) => {
        if (!stderr && stdout && stdout.length > 0) {
          const lastLine = document.lineCount - 1;
          const endOfLastLine = document.lineAt(lastLine).range.end;
          const range = new Range(new Position(0, 0), endOfLastLine);

          const textEdits: TextEdit[] = [new TextEdit(range, stdout)];
          resolve(textEdits);
        } else {
          reject(stderr || error.message);
        }
      });
      child.stdin.write(documentText);
      child.stdin.end();
    } catch (err) {
      if (err.message.includes("command not found")) {
        reject("rufo not available in path. Ensure rufo gem is installed");
      } else {
        reject(err.message);
      }
    }
  });
}
