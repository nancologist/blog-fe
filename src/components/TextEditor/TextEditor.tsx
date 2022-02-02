import { Editor, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './TextEditor.css';

const TextEditor = ({ editorState, handleChangeEditorState }: any) => {
  const handleKeyCommand = (command: any, editorState: any) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      handleChangeEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const ctrlBtn = {
    handleBold() {
      handleChangeEditorState(
        RichUtils.toggleInlineStyle(editorState, 'BOLD')
      );
    }
  };

  return (
    <div className="TextEditor">
      <div className="TextEditor__ctrls">
        <button type="button" onClick={ctrlBtn.handleBold}>B</button>
      </div>
      <div className="editor-wrapper">
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={handleChangeEditorState}
          placeholder="Schreibe den Beitrag an..."
        />
      </div>
    </div>
  );
}

export default TextEditor;

// Interesting from Draftjs Docs:
// - https://draftjs.org/docs/advanced-topics-block-styling