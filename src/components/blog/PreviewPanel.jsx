"use client";

export default function PreviewPanel({ data }) {
  if (!data) {
    return (
      <div className="p-6 text-gray-500 italic">
        Start writing in the editor to see preview...
      </div>
    );
  }

  return (
    <div className="p-6 overflow-y-auto h-full">
      <h2 className="text-xl font-bold mb-4">Live Preview</h2>

      {data.blocks?.map((block, i) => {
        switch (block.type) {
          case "header":
            return (
              <h1 key={i} className="text-3xl font-bold my-4">
                {block.data.text}
              </h1>
            );
          case "paragraph":
            return (
              <p key={i} className="text-lg leading-relaxed text-gray-700 my-2">
                {block.data.text}
              </p>
            );
          case "list":
            return (
              <ul key={i} className="list-disc list-inside my-2">
                {block.data.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "image":
            return (
              <img
                key={i}
                src={block.data.file?.url}
                alt=""
                className="rounded-lg shadow-md my-4"
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
