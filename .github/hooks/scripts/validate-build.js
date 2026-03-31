const { execSync } = require('child_process');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
    try {
        const payload = JSON.parse(input);
        const toolName = payload.toolName || "";
        
        const modifiedTools = [
            "create_file", 
            "replace_string_in_file", 
            "edit_file", 
            "default_api:create_file", 
            "default_api:replace_string_in_file", 
            "default_api:edit_file"
        ];
        
        let shouldTest = false;
        if (modifiedTools.includes(toolName)) {
            shouldTest = true;
        }

        if (shouldTest) {
            try {
                // Run lint, type check, and build as required by copilot-instructions.md
                execSync('npm run lint', { stdio: 'pipe' });
                execSync('npx tsc --noEmit', { stdio: 'pipe' });
                execSync('npm run build', { stdio: 'pipe' });
            } catch(e) {
                // Inject the error message context back into the agent output so they can fix it
                let errMsg = "빌드 또는 린트(TSC) 오류가 발생했습니다. 수정하세요:\n";
                if (e.stdout) errMsg += e.stdout.toString();
                if (e.stderr) errMsg += e.stderr.toString();
                
                console.log(JSON.stringify({
                    systemMessage: errMsg
                }));
                process.exit(0); // Return error message gracefully to the model
            }
        }
        
        console.log(JSON.stringify({
            hookSpecificOutput: {
                hookEventName: "PostToolUse",
                decision: "continue" // Do not block tool use permanently
            }
        }));
        
    } catch(err) {
        console.log(JSON.stringify({ decision: "continue" })); // Ignorant fallback
        process.exit(0);
    }
});