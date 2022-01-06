import { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './TextEditor.css';

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const handleKeyCommand = (command: any, editorState: any) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const ctrlBtn = {
    handleBold() {
      setEditorState(
        RichUtils.toggleInlineStyle(editorState, 'BOLD')
      );
    }
  };

  
  const logIt = () => {
    console.log(editorState);
  };

  return (
    <>
      <button onClick={logIt}>LOG</button><br /><br />

      <button onClick={ctrlBtn.handleBold}>B</button>
      <div className="editor-wrapper">
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
          placeholder="Write some text..."
        />
      </div>
    </>
  );
}

export default TextEditor;

// Interesting from Draftjs Docs:
// - https://draftjs.org/docs/advanced-topics-block-styling