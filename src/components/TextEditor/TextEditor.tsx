import { useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './TextEditor.css';

const TextEditor = ({ editorState, handleChangeEditorState }: any) => {
  // const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

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
    <>
      <button type="button" onClick={ctrlBtn.handleBold}>B</button>
      <div className="editor-wrapper">
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={handleChangeEditorState}
          placeholder="Write some text..."
        />
      </div>
    </>
  );
}

export default TextEditor;

// Interesting from Draftjs Docs:
// - https://draftjs.org/docs/advanced-topics-block-styling