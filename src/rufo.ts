import { exec, ExecOptions } from "child_process";
import {
  DocumentFormattingEditProvider,
  Position,
  Range,
  TextDocument,
  TextEdit,
  window,
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
      const child = exec(
        `rufo --filename ${document.fileName}`,
        options,
        (error, stdout, stderr) => {
          if (!stderr && stdout && stdout.length > 0) {
            const lastLine = document.lineCount - 1;
            const endOfLastLine = document.lineAt(lastLine).range.end;
            const range = new Range(new Position(0, 0), endOfLastLine);

            const textEdits: TextEdit[] = [new TextEdit(range, stdout)];
            resolve(textEdits);
          } else {
            window.showErrorMessage(stderr || error.message);
            reject();
          }
        }
      );
      child.stdin.write(documentText);
      child.stdin.end();
    } catch (err) {
      if (err.message.includes("command not found")) {
        window.showErrorMessage(
          "rufo not available in path. Ensure rufo gem is installed"
        );
        reject();
      } else {
        window.showErrorMessage(err.message);
        reject();
      }
    }
  });
}
