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
    code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '');
        return <Syntax language={match ? match[1] : 'js'} value={children}/>
    }
};

export const Markdown = ({source}) => <ReactMarkdown components={renderers} children={source} />
