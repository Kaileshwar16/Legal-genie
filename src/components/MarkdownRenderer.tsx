
import { useEffect, useState } from 'react';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Simple markdown parsing
    const parseMarkdown = (markdown: string) => {
      let html = markdown;
      
      // Headers
      html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold my-4">$1</h1>');
      html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold my-3">$1</h2>');
      html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold my-2">$1</h3>');

      // Bold
      html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Lists
      html = html.replace(/^\s*\- (.*$)/gim, '<li class="ml-6 list-disc">$1</li>');
      html = html.replace(/^\s*\d+\. (.*$)/gim, '<li class="ml-6 list-decimal">$1</li>');

      // Fix list groups
      html = html.replace(/<\/li>\n<li/g, '</li><li');
      html = html.replace(/<li(.*?)>([^]*)(?=(<h|<li|<\/ul|$))/g, (match, p1, content) => {
        if (match.includes('<li class="ml-6 list-disc">')) {
          return `<ul class="my-2 space-y-1"><li${p1}>${content}</li></ul>`;
        } else if (match.includes('<li class="ml-6 list-decimal">')) {
          return `<ol class="my-2 space-y-1"><li${p1}>${content}</li></ol>`;
        }
        return match;
      });

      // Paragraphs
      html = html.replace(/^([^<].*)\n$/gm, '<p class="my-2">$1</p>');
      
      // New lines
      html = html.replace(/\n/g, '<br />');

      return html;
    };

    setHtmlContent(parseMarkdown(content));
  }, [content]);

  return (
    <div className="markdown-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}
