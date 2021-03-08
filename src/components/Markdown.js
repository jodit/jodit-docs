import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { agate } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import ReactMarkdown from "react-markdown";
import React from "react";

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('typescript', ts);

export const Syntax = ({value, children, language}) => <SyntaxHighlighter
    showLineNumbers={false}
    style={agate}
    language={language}
    children={value || children}
/>

export const renderers = {
    code: ({ language, value }) => <Syntax language={language} value={value}/>
};

export const Markdown = ({source}) => <ReactMarkdown renderers={renderers} source={source} />
