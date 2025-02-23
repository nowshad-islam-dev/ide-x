// client/src/components/CodeEditorPane.jsx

import Editor from '@monaco-editor/react';

const CodeEditorPane = ({ language, value, onChange, title }) => {
  return (
    <div className="col-span-1 overflow-auto">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <Editor
        height="400px"
        defaultLanguage={language}
        defaultValue={value}
        onChange={onChange}
        theme="vs-dark"
        minimap={{ enabled: false }}
        options={{
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default CodeEditorPane;
