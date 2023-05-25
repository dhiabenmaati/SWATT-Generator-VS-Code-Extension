const vscode = require('vscode');
const fs = require('fs'); // the can let us check if the path is found 


// Check if the folder path found
function isDirectory(path) {
	try {
	  const stats = fs.statSync(path);
	  return stats.isDirectory();
	} catch (error) {
	  return false;
	}
}

// Check if the file path found
function isFile(path) {
	try {
	  const stats = fs.statSync(path);
	  return stats.isFile();
	} catch (error) {
	  return false;
	}
}

// run Full Swatt Generator
function fullSwattgenerator(context, args) {
  const pythonScriptPath = context.extensionPath + '/swatt-generator/generator.py';
  const pythonProcess = vscode.window.createTerminal('Swatt Generator');

  const command = `python ${pythonScriptPath} ${args.join(' ')}`;
  pythonProcess.sendText(command);
}

// Run Define Const generator
function DefineConstGenerator(context, args) {
	const pythonScriptPath = context.extensionPath + '/swatt-generator/swatt-partials/define-const-generator.py';
	const pythonProcess = vscode.window.createTerminal('Define Const Generator');
  
	const command = `python ${pythonScriptPath} ${args.join(' ')}`;
	pythonProcess.sendText(command);
}


// Run Variables & Deftypes generator
function VarDefGenerator(context, args) {
	const pythonScriptPath = context.extensionPath + '/swatt-generator/swatt-partials/vars-deftypes-generator.py';
	const pythonProcess = vscode.window.createTerminal('Vars Deftypes Generator');
  
	const command = `python ${pythonScriptPath} ${args.join(' ')}`;
	pythonProcess.sendText(command);
}


// Run Function Mock generator
function FuncMockGenerator(context, args) {
	const pythonScriptPath = context.extensionPath + '/swatt-generator/swatt-partials/FunctionMock-generator.py';
	const pythonProcess = vscode.window.createTerminal('Functions Mock Generator');
  
	const command = `python ${pythonScriptPath} ${args.join(' ')}`;
	pythonProcess.sendText(command);
}


// Run Function Prototype generator
function FuncPrototypeGenerator(context, args) {
	const pythonScriptPath = context.extensionPath + '/swatt-generator/swatt-partials/FunctionPrototype-generator.py';
	const pythonProcess = vscode.window.createTerminal('Functions prototypes Generator');
  
	const command = `python ${pythonScriptPath} ${args.join(' ')}`;
	pythonProcess.sendText(command);
}


// Run Functions Test generator
function FuncTestGenerator(context, args) {
	const pythonScriptPath = context.extensionPath + '/swatt-generator/swatt-partials/FunctionsTest-generator.py';
	const pythonProcess = vscode.window.createTerminal('Function Test Generator');
  
	const command = `python ${pythonScriptPath} ${args.join(' ')}`;
	pythonProcess.sendText(command);
}



/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('c-test-generator.GenerateTest', async function () {

		// Let the user choose from the menu
		const options = ['Generate Test For This Opened File', 'Generate Test For Given File and Folder Path'];
		const selection = await vscode.window.showQuickPick(options);

				// Generate test for opened file
				if (selection === 'Generate Test For This Opened File') {
					let File_Path = vscode.window.activeTextEditor?.document.fileName;
					let Folder_Path = vscode.workspace.workspaceFolders?.[0].uri.fsPath;

					if (isDirectory(Folder_Path) && isFile(File_Path)){
						const options = ['Full SWATT Test', 'Generate Defines', 'Generate Deftypes & Variables', 'Generate Functions mock', 'Generate Functions Prototype', 'Generate Functions test'];
						const FullOrCustom = await vscode.window.showQuickPick(options);
							if (FullOrCustom === 'Full SWATT Test') {
								const arguments = [File_Path, Folder_Path, 1, 1, 1, 1, 1]; 
								fullSwattgenerator(context, arguments);	
							}
							else if (FullOrCustom === 'Generate Defines') {
								const arguments = [File_Path, Folder_Path]; 
								DefineConstGenerator(context, arguments);	
							}
							else if (FullOrCustom === 'Generate Deftypes & Variables') {
								const arguments = [File_Path, Folder_Path]; 
								VarDefGenerator(context, arguments);	
							}
							else if (FullOrCustom === 'Generate Functions mock') {
								const arguments = [File_Path, Folder_Path]; 
								FuncMockGenerator(context, arguments);	
							}
							else if (FullOrCustom === 'Generate Functions Prototype') {
								const arguments = [File_Path, Folder_Path]; 
								FuncPrototypeGenerator(context, arguments);	
							}
							else if (FullOrCustom === 'Generate Functions test') {
								const arguments = [File_Path, Folder_Path]; 
								FuncTestGenerator(context, arguments);	
							}
							else{
								const arguments = [File_Path, Folder_Path, 1, 1, 1, 1, 1]; 
								fullSwattgenerator(context, arguments);	
							}
					}
					else {vscode.window.showErrorMessage("Please check your given folder or file path");}
				} 

				// Generate test for given path in args
				else if (selection === 'Generate Test For Given File and Folder Path') {
					
					const File_Path = await vscode.window.showInputBox({
						prompt: 'Enter Full File Path',
						value: ''
					});
					
					const Folder_Path = await vscode.window.showInputBox({
						prompt: 'Enter Full Folder Path',
						value: ''
					});

					if (isDirectory(Folder_Path) && isFile(File_Path)){
						const options = ['Full SWATT Test', 'Generate Defines', 'Generate Deftypes & Variables', 'Generate Functions mock', 'Generate Functions Prototype', 'Generate Functions test'];
						const FullOrCustom = await vscode.window.showQuickPick(options);
							if (FullOrCustom === 'Full SWATT Test') {
								const arguments = [File_Path, Folder_Path, 1, 1, 1, 1, 1]; 
								fullSwattgenerator(context, arguments);	
							}
							else if (FullOrCustom === 'Generate Defines') {
								const arguments = [File_Path, Folder_Path]; 
								DefineConstGenerator(context, arguments);	
							}
							else if (FullOrCustom === 'Generate Deftypes & Variables') {
								const arguments = [File_Path, Folder_Path]; 
								VarDefGenerator(context, arguments);	
							}
							else if (FullOrCustom === 'Generate Functions mock') {
								const arguments = [File_Path, Folder_Path]; 
								FuncMockGenerator(context, arguments);	
							}
							else if (FullOrCustom === 'Generate Functions Prototype') {
								const arguments = [File_Path, Folder_Path]; 
								FuncPrototypeGenerator(context, arguments);	
							}
							else if (FullOrCustom === 'Generate Functions test') {
								const arguments = [File_Path, Folder_Path]; 
								FuncTestGenerator(context, arguments);	
							}
							else{
								const arguments = [File_Path, Folder_Path, 1, 1, 1, 1, 1]; 
								fullSwattgenerator(context, arguments);	
							}
					}
					else {vscode.window.showErrorMessage("Please check your given folder or file path");}

				} 

		// Unknow Error Occupered
		else {
			vscode.window.showErrorMessage("Unknown Error");
		  }
		
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
