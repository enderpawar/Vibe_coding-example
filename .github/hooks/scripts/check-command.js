const fs = require('fs');

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
    try {
        const payload = JSON.parse(input);
        const toolName = payload.toolName || "";
        
        let decision = "allow";
        let reason = "";

        if (toolName === "run_in_terminal" || toolName === "default_api:run_in_terminal") {
            const command = payload.toolArgs?.command || "";
            if (command.includes("npm install") || command.includes("npm i") || command.includes("yarn add") || command.includes("pnpm add")) {
                if (command.includes("redux") || command.includes("mobx") || command.includes("recoil") || command.includes("zustand")) {
                    decision = "deny";
                    reason = "copilot-instructions.md 원칙 위반: 비즈니스 로직은 커스텀 훅으로 구현해야 하며 대형 전역 상테 관리(redux, zustand 등)는 금지됩니다.";
                }
            }
        }
        
        console.log(JSON.stringify({
            hookSpecificOutput: {
                hookEventName: "PreToolUse",
                permissionDecision: decision,
                permissionDecisionReason: reason
            }
        }));
    } catch (e) {
        console.log(JSON.stringify({ 
            hookSpecificOutput: {
                hookEventName: "PreToolUse",
                permissionDecision: "allow"
            }
        }));
    }
});