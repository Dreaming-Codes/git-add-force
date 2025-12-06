import { exec } from "node:child_process";
import { promisify } from "node:util";
import * as vscode from "vscode";

const execAsync = promisify(exec);

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand(
		"git-add-force.addForce",
		async (uri: vscode.Uri, uris: vscode.Uri[]) => {
			const targets = uris && uris.length > 0 ? uris : uri ? [uri] : [];

			if (targets.length === 0) {
				vscode.window.showWarningMessage("No files selected.");
				return;
			}

			const workspaceFolder = vscode.workspace.getWorkspaceFolder(
				targets[0],
			);
			if (!workspaceFolder) {
				vscode.window.showErrorMessage("No workspace folder found.");
				return;
			}

			const filePaths = targets.map((t) => t.fsPath);

			try {
				await execAsync(
					`git add --force -- ${filePaths.map((p) => `"${p}"`).join(" ")}`,
					{
						cwd: workspaceFolder.uri.fsPath,
					},
				);
				const fileCount = filePaths.length;
				vscode.window.showInformationMessage(
					`Force added ${fileCount} file${fileCount > 1 ? "s" : ""} to git.`,
				);
			} catch (error) {
				const message =
					error instanceof Error ? error.message : String(error);
				vscode.window.showErrorMessage(
					`Failed to force add: ${message}`,
				);
			}
		},
	);

	context.subscriptions.push(disposable);
}
