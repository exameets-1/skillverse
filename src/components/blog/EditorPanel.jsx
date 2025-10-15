"use client";

import { useEffect, useRef } from "react";


// Editor Panel Component
export default function EditorPanel({ onChange }) {
  const editorRef = useRef(null);
  const ejsRef = useRef(null);

  useEffect(() => {
    const initEditor = async () => {
      if (ejsRef.current) return;

      const EditorJS = (await import("@editorjs/editorjs")).default;
      const Header = (await import("@editorjs/header")).default;
      const List = (await import("@editorjs/list")).default;
      const ImageTool = (await import("@editorjs/image")).default;

      const editor = new EditorJS({
        holder: editorRef.current,
        autofocus: true,
        placeholder: "Start writing your blog post...",
        tools: {
          header: {
            class: Header,
            config: {
              levels: [1, 2, 3, 4, 5, 6],
              defaultLevel: 2
            }
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered'
            }
          },
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote author',
            },
          },
          code: {
            class: Code,
          },
          inlineCode: {
            class: InlineCode,
          },
          delimiter: Delimiter,
          table: {
            class: Table,
            inlineToolbar: true,
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file) {
                  return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      resolve({
                        success: 1,
                        file: {
                          url: reader.result,
                        },
                      });
                    };
                    reader.readAsDataURL(file);
                  });
                },
                async uploadByUrl(url) {
                  try {
                    const response = await fetch(url);
                    const blob = await response.blob();
                    return new Promise((resolve) => {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        resolve({
                          success: 1,
                          file: {
                            url: reader.result,
                          },
                        });
                      };
                      reader.readAsDataURL(blob);
                    });
                  } catch (error) {
                    return {
                      success: 1,
                      file: { url },
                    };
                  }
                },
              },
            },
          },
        },
        onChange: async () => {
          try {
            const savedData = await editor.save();
            onChange(savedData);
          } catch (error) {
            console.error("Error saving editor data:", error);
          }
        },
      });

      ejsRef.current = editor;
    };

    initEditor();

    return () => {
      if (ejsRef.current?.destroy) {
        ejsRef.current.destroy();
        ejsRef.current = null;
      }
    };
  }, [onChange]);

  return <div id="editorjs" ref={editorRef} className="prose max-w-none" />;
}