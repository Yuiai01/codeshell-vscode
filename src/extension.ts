// The module "vscode" contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import { CodeShellWebviewViewProvider } from './CodeShellWebviewViewProvider'

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  registerWebviewViewExtension(context)
}

// This method is called when your extension is deactivated
export function deactivate() {}

function registerWebviewViewExtension(context: vscode.ExtensionContext) {
  const provider = new CodeShellWebviewViewProvider(context)

  // Register the provider with the extension's context
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      CodeShellWebviewViewProvider.viewId,
      provider,
      {
        webviewOptions: { retainContextWhenHidden: true },
      },
    ),
    // 分析代码
    vscode.commands.registerCommand('codeshell.explain_this_code', () =>
      provider.executeCommand('codeshell.explain_this_code'),
    ),
    // 优化代码
    vscode.commands.registerCommand('codeshell.improve_this_code', () =>
      provider.executeCommand('codeshell.improve_this_code'),
    ),
    // 重写代码
    // vscode.commands.registerCommand('codeshell.clean_this_code', () =>
    //   provider.executeCommand('codeshell.clean_this_code'),
    // ),
    // 生成注释
    // vscode.commands.registerCommand('codeshell.generate_comment', () =>
    //   provider.executeCommand('codeshell.generate_comment'),
    // ),
    // 生成测试用例
    vscode.commands.registerCommand('codeshell.generate_unit_test', () =>
      provider.executeCommand('codeshell.generate_unit_test'),
    ),
    // 检查性能问题
    // vscode.commands.registerCommand('codeshell.check_performance', () =>
    //   provider.executeCommand('codeshell.check_performance'),
    // ),
    // 检查按钮问题
    // vscode.commands.registerCommand('codeshell.check_security', () =>
    //   provider.executeCommand('codeshell.check_security'),
    // ),
  )
}