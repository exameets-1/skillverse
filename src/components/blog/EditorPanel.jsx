"use client";

import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";

export default function EditorPanel({ onChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        tools: {
          header: Header,
          paragraph: Paragraph,
          list: List,
            image: {
                class: ImageTool,
                config: {
                    uploader: {
                    /**
                     * Upload file to server and return object with { success, file: { url } }
                 */
                async uploadByFile(file) {
                    // For now, fake upload: return a temporary blob URL
                    return {
                    success: 1,
                    file: {
                        url: URL.createObjectURL(file),
                    },
                    };
                },

                /**
                 * Upload by URL (when user pastes an image link)
                 */
                async uploadByUrl(url) {
                    return {
                    success: 1,
                    file: { url },
                    };
                },
                },
            },
            },
        },
        onChange: async () => {
          const savedData = await editor.save();
          onChange(savedData);
        },
      });

      editorRef.current = editor;
    }

    // cleanup when component unmounts
    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [onChange]);

  return <div id="editorjs" className="p-4 h-full overflow-y-auto" />;
}
