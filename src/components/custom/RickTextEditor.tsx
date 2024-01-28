import { Editor, EditorProps, EditorState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, { forwardRef } from 'react'
import { cn } from "@/lib/utils";

export default forwardRef<Object , EditorProps> (function RickTextEditor(props, ref) {
  return (
      <Editor
          
          //   editorState={EditorState}
          {...props}
          editorRef={r => {
              if (typeof ref === 'function') {
                  ref(r);
              } else if (ref) {
                  ref.current = r
              }
          }
    }
          toolbar={
              {
                  options: ['inline', 'list', 'link', 'history'],
                  inline: {
                      options:['bold', 'italic', 'underline']
                  }
              }
          }
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName={cn("min-h-48 cursor-text p-4 border",props.editorClassName )}
        //   onEditorStateChange={this.onEditorStateChange}
      />
  )
})

