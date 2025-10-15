"use client";
import { FileJson } from "lucide-react";


export default function PreviewPanel({ data }) {
  if (!data || !data.blocks || data.blocks.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <div className="text-center">
          <FileJson className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Start writing in the editor to see preview...</p>
        </div>
      </div>
    );
  }

  const renderBlock = (block, index) => {
    switch (block.type) {
      case "header":
        const HeadingTag = `h${block.data.level || 2}`;
        const headerSizes = {
          1: "text-4xl font-bold",
          2: "text-3xl font-bold",
          3: "text-2xl font-semibold",
          4: "text-xl font-semibold",
          5: "text-lg font-semibold",
          6: "text-base font-semibold"
        };
        return (
          <HeadingTag
            key={index}
            className={`${headerSizes[block.data.level || 2]} mb-4 mt-6`}
          >
            {block.data.text}
          </HeadingTag>
        );

      case "paragraph":
        return (
          <p
            key={index}
            className="mb-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: block.data.text }}
          />
        );

      case "list":
        const ListTag = block.data.style === "ordered" ? "ol" : "ul";
        const listClass = block.data.style === "ordered" 
          ? "list-decimal list-inside mb-4 space-y-2" 
          : "list-disc list-inside mb-4 space-y-2";
        return (
          <ListTag key={index} className={listClass}>
            {block.data.items.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ListTag>
        );

      case "checklist":
        return (
          <div key={index} className="mb-4 space-y-2">
            {block.data.items.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.checked}
                  readOnly
                  className="w-4 h-4"
                />
                <span className={item.checked ? "line-through text-gray-500" : ""}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        );

      case "quote":
        return (
          <blockquote key={index} className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic">
            <p className="mb-2">{block.data.text}</p>
            {block.data.caption && (
              <cite className="text-sm text-gray-600">— {block.data.caption}</cite>
            )}
          </blockquote>
        );

      case "code":
        return (
          <pre key={index} className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
            <code>{block.data.code}</code>
          </pre>
        );

      case "delimiter":
        return (
          <div key={index} className="text-center my-8">
            <span className="text-2xl">* * *</span>
          </div>
        );

      case "table":
        return (
          <div key={index} className="mb-4 overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <tbody>
                {block.data.content.map((row, i) => (
                  <tr key={i} className={i === 0 && block.data.withHeadings ? "bg-gray-100 font-semibold" : ""}>
                    {row.map((cell, j) => {
                      const CellTag = i === 0 && block.data.withHeadings ? "th" : "td";
                      return (
                        <CellTag
                          key={j}
                          className="border border-gray-300 px-4 py-2"
                        >
                          {cell}
                        </CellTag>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "image":
        return (
          <figure key={index} className="mb-4">
            <img
              src={block.data.file.url}
              alt={block.data.caption || "Image"}
              className="max-w-full h-auto rounded-lg"
            />
            {block.data.caption && (
              <figcaption className="text-center text-sm text-gray-600 mt-2">
                {block.data.caption}
              </figcaption>
            )}
          </figure>
        );

      default:
        return (
          <div key={index} className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              Unsupported block type: {block.type}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="prose max-w-none">
      {data.blocks.map((block, i) => renderBlock(block, i))}
    </div>
  );
}
