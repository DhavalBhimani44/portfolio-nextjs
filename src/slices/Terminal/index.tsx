"use client"
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useState } from "react";
import { TbClipboardCopy } from "react-icons/tb";
import { TiTickOutline } from "react-icons/ti";

/**
 * Props for `Terminal`.
 */
export type TerminalProps = SliceComponentProps<Content.TerminalSlice>;

/**
 * Component for "Terminal" Slices.
 */
const Terminal = ({ slice }: TerminalProps): JSX.Element => {
  const [copied, setCopied] = useState(false);

  const getCodeString = (richText: any): string => {
    let text = '';
    richText.forEach((element: any) => {
      if (element.type === 'paragraph') {
        text += element.text + ' ';
      } else if (element.type === 'list-item') {
        text += element.text + '\n';
      }
    });
    return text;
  };

  const copyToClipboard = () => {
    const codeString = getCodeString(slice.primary.code_string);
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000); // Reset copied state after 4 seconds
  };

  return (
    <div className="bg-gray-800 text-white rounded-md">
      <div className="flex justify-between items-center">
        <span className="ml-3">{slice.primary.terminal_type}</span>
        <button onClick={copyToClipboard} className="p-2 flex items-center text-xs text-gray-400 mr-2">
        {copied ? <TiTickOutline className="mr-1 text-lg"/> : <TbClipboardCopy className="mr-1 text-lg"/>} {copied ? 'Copied!' : 'Copy code'}
        </button>
      </div>
      <pre className="overflow-auto p-1 mt-2 bg-black rounded-md text-md">
        <code>
          <PrismicRichText field={slice.primary.code_string} />
        </code>
      </pre>
    </div>
  );
};

export default Terminal;
