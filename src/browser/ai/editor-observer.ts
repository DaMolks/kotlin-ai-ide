import { injectable, inject } from '@theia/core/shared/inversify';
import { EditorManager, TextEditor } from '@theia/editor/lib/browser';
import { AIContextManager } from './context/context-manager';
import { AISuggestionsWidget } from './widgets/ai-suggestions-widget';

@injectable()
export class EditorObserver {
    @inject(EditorManager)
    protected readonly editorManager: EditorManager;

    @inject(AIContextManager)
    protected readonly contextManager: AIContextManager;

    @inject(AISuggestionsWidget)
    protected readonly suggestionsWidget: AISuggestionsWidget;

    observe(): void {
        this.editorManager.onCurrentEditorChanged(this.handleEditorChange.bind(this));
    }

    private handleEditorChange(editor: TextEditor | undefined): void {
        if (!editor) return;

        const code = editor.document.getText();
        this.contextManager.updateContext('currentFile', {
            path: editor.uri.path.toString(),
            content: code
        });

        this.suggestionsWidget.updateSuggestions(code);
    }
}