const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Create a readline interface to prompt the user
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to copy a file and replace the token
function copyFileWithTokenReplacement(srcFile, destFile, token, replacement) {
    const content = fs.readFileSync(srcFile, 'utf8');
    const replacedContent = content.replace(new RegExp(token, 'g'), replacement);
    fs.writeFileSync(destFile, replacedContent, 'utf8');
}

// Function to copy the folder
function copyFolderWithTokenReplacement(srcDir, destDir, token, replacement) {
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    const items = fs.readdirSync(srcDir);
    for (const item of items) {
        const srcPath = path.join(srcDir, item);
        const destPath = path.join(destDir, item);

        if (fs.lstatSync(srcPath).isDirectory()) {
            // Recursive copy for subdirectories
            copyFolderWithTokenReplacement(srcPath, destPath, token, replacement);
        } else {
            // Copy and replace token in files
            copyFileWithTokenReplacement(srcPath, destPath, token, replacement);
        }
    }
}

function kebabToPascal(kebabCaseStr) {
    if (!kebabCaseStr) return ''; // Handle empty or invalid input
    const segments = kebabCaseStr.split('-')
    let res = ''
    for (const str of segments) {
        res += str[0].toUpperCase() + str.slice(1)
    }
    return res
}

function getRootPath() {
    const currPath = __dirname
    const currPathSegments = currPath.split('/')
    currPathSegments.splice(currPathSegments.length - 1, 1)
    return currPathSegments
}

function getTemplatePath() {
    const pathElements = ['src', 'template']
    const rootPath = getRootPath()
    rootPath.push(...pathElements)
    return rootPath.join('/')
}

function getProblemsFolderPath() {
    const pathElements = ['src', 'app', 'problems']
    const rootPath = getRootPath()
    rootPath.push(...pathElements)
    return rootPath.join('/')
}

function getProblemsTSPath() {
    const pathElements = ['src', 'const', 'problems.ts']
    const rootPath = getRootPath()
    rootPath.push(...pathElements)
    return rootPath.join('/')
}

/**
 * Inserts a line of code into a file at a specified line number.
 * @param {string} filePath - The path to the file.
 * @param {string} lineToInsert - The line of code to insert.
 * @param {number} lineNumber - The line number where the code should be inserted (1-based).
 */
function insertLineInFile(filePath, lineToInsert, lineNumber) {
    // Read the file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');

    // Check if lineNumber is valid
    if (lineNumber < 1 || lineNumber > lines.length + 1) {
        throw new Error(`Invalid line number: ${lineNumber}. File has ${lines.length} lines.`);
    }

    // Insert the new line at the specified position
    lines.splice(lineNumber - 1, 0, lineToInsert);

    // Write the updated content back to the file
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}

/**
 * Finds the line number of the first occurrence of a string in a file.
 * @param {string} filePath - The path to the file.
 * @param {string} searchString - The string to search for.
 * @returns {number} - The 1-based line number of the first occurrence, or -1 if not found.
 */
function getLineNumber(filePath, searchString) {
    // Read the file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n');

    // Iterate through the lines to find the search string
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(searchString)) {
            return i + 1; // Line number is 1-based
        }
    }

    // If the string is not found, return -1
    return -1;
}

function askQuestions(questions) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    let answers = [];
    let index = 0;

    return new Promise((resolve) => {
        const askNextQuestion = () => {
            if (index < questions.length) {
                // Listen for user input directly
                rl.question(questions[index] + ' ', (res) => {
                    answers.push(res.trim());
                    index++;
                    askNextQuestion();
                });
            } else {
                rl.close();
                resolve(answers);
            }
        };

        askNextQuestion();
    });
}

function getDifficultyEnumVal(difficulty) {
    if (difficulty === 'medium' || difficulty === 'm') {
        return 'Medium'
    }
    
    if (difficulty === 'hard' || difficulty === 'h') {
        return 'Hard'
    }

    return 'Easy'
}

function toKebabCase(str) {
    return str
        .trim() // Remove any leading/trailing whitespace
        .toLowerCase() // Convert to lowercase
        .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
        .replace(/[^\w-]/g, ''); // Remove any non-word characters except hyphens
}

function sanitizeName(str) {
    const segments = str.trim().split(' ')
    const nameSegments = []
    for (const s of segments) {
        nameSegments.push(s[0].toUpperCase() + s.slice(1))
    }
    return nameSegments.join(' ')
}

async function main() {
    const questions = [
        'Enter the name of the new problem:',
        'What is the difficulty of the problem? (Easy, Medium, or Hard)',
        'Which icon do you want to use? (In the side drawer)',
    ];

    try {
        const answers = await askQuestions(questions);
        const [name, difficulty, iconName] = answers
        const problemName = sanitizeName(name)
        const folderName = toKebabCase(problemName)

        const srcFolder = getTemplatePath(); // Change this to your source folder
        const destFolder = path.join(__dirname, folderName);
        const token = 'PROBLEM_SOLUTION_EXPORT_NAME'; // The token to replace
        const tokenReplacement = kebabToPascal(folderName);

    try {
        // Copy the folder and replace the token
        copyFolderWithTokenReplacement(srcFolder, destFolder, token, tokenReplacement);
        
        // Move the newly created folder to problems folder
        const problemsFolderPath = getProblemsFolderPath()
        fs.renameSync(destFolder, `${problemsFolderPath}/${folderName}`);

        // Add import to problems.ts
        const problemTSPath = getProblemsTSPath()
        const importStatement = `import ${tokenReplacement}Soln from '@/app/problems/${folderName}/soln'`
        insertLineInFile(problemTSPath, importStatement, 2)

        // Create entry for problem in problems.ts
        const problemEntry = `{
            id: '${folderName}',
            title: '${problemName}',
            difficulty: PROBLEM_DIFFICULTY.${getDifficultyEnumVal(difficulty.toLowerCase())},
            solutionComponent: ${tokenReplacement}Soln,
            icon: ${iconName !== '' ? iconName : 'SquareSigma'}
        },`
        const lineNumber = getLineNumber(problemTSPath, 'const problems: ProblemInfo[] = [')
        if (lineNumber === -1) {
            console.log('Error: text not found')
            return
        }
        insertLineInFile(problemTSPath, problemEntry, lineNumber + 1)

        console.log(`Folder '${folderName}' created successfully with content copied and token replaced.`);
    } catch (err) {
        console.error('An error occurred:', err.message);
    }
        
    } catch (error) {
        console.error('Error processing request:', error);
    }
}

main()