"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import PreviewPanel from "@/components/blog/PreviewPanel";

const EditorPanel = dynamic(() => import("@/components/blog/EditorPanel"), {
  ssr: false,
});


export default function BlogMakerPage() {
  const [editorData, setEditorData] = useState(null);

  return (
    <div className="flex h-screen">
      {/* Left = Editor */}
      <div className="w-1/2 border-r">
        <EditorPanel onChange={setEditorData} />
      </div>

      {/* Right = Preview */}
      <div className="w-1/2">
        <PreviewPanel data={editorData} />
      </div>
    </div>
  );
}
