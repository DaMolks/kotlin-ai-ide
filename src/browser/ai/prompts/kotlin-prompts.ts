export const KOTLIN_PROMPTS = {
    COMPLETE_CODE: `Complete the following Kotlin code. Return only the completed code without explanations:
{code}
`,

    EXPLAIN_CODE: `Explain the following Kotlin code in a clear and concise way:
{code}
`,

    SUGGEST_IMPROVEMENTS: `Suggest improvements for the following Kotlin code:
{code}
`,

    CREATE_ANDROID_COMPONENT: `Create a {component} for Android with the following requirements:
{requirements}
`,

    FIX_ERROR: `Fix the following error in the Kotlin code:
Error: {error}
Code:
{code}
`,

    GENERATE_TESTS: `Generate unit tests for the following Kotlin code:
{code}
`
};

export function formatPrompt(template: string, vars: Record<string, string>): string {
    return template.replace(/\{(\w+)\}/g, (match, key) => vars[key] || match);
}