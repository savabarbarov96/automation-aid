
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Bold, Italic, Link as LinkIcon, List, ListOrdered, Heading1, Heading2, Image, Code, Quote, Eye } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minRows?: number;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Започнете да пишете...",
  minRows = 10
}) => {
  const [currentTab, setCurrentTab] = useState<string>("edit");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  
  const insertAtCursor = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);
    
    const newValue = beforeText + prefix + selectedText + suffix + afterText;
    onChange(newValue);
    
    // Set focus and selection back to the textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        end + prefix.length
      );
    }, 0);
  };
  
  const formatHandlers = {
    h1: () => insertAtCursor("# ", "\n"),
    h2: () => insertAtCursor("## ", "\n"),
    bold: () => insertAtCursor("**", "**"),
    italic: () => insertAtCursor("*", "*"),
    link: () => insertAtCursor("[", "](url)"),
    ul: () => insertAtCursor("- ", "\n"),
    ol: () => insertAtCursor("1. ", "\n"),
    image: () => insertAtCursor("![alt text](", ")"),
    code: () => insertAtCursor("```\n", "\n```"),
    quote: () => insertAtCursor("> ", "\n")
  };
  
  const renderPreview = () => {
    // Simple conversion of markdown to HTML for preview purposes
    const html = value
      .replace(/# (.*?)(\n|$)/g, '<h1>$1</h1>')
      .replace(/## (.*?)(\n|$)/g, '<h2>$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/- (.*?)(\n|$)/g, '<li>$1</li>')
      .replace(/1\. (.*?)(\n|$)/g, '<li>$1</li>')
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width: 100%" />')
      .replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>')
      .replace(/> (.*?)(\n|$)/g, '<blockquote>$1</blockquote>')
      .replace(/\n/g, '<br/>');
    
    return (
      <div 
        className="p-4 bg-white/5 rounded-md prose prose-invert max-w-none" 
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };
  
  return (
    <div className="border border-input rounded-md overflow-hidden">
      <div className="bg-muted p-2 flex flex-wrap gap-1 border-b border-input">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatHandlers.h1}
          title="Заглавие 1"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatHandlers.h2}
          title="Заглавие 2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatHandlers.bold}
          title="Удебелен"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatHandlers.italic}
          title="Курсив"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatHandlers.link}
          title="Линк"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatHandlers.ul}
          title="Списък"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatHandlers.ol}
          title="Номериран списък"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatHandlers.image}
          title="Изображение"
        >
          <Image className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatHandlers.code}
          title="Код"
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatHandlers.quote}
          title="Цитат"
        >
          <Quote className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <div className="border-b border-input">
          <TabsList className="w-full bg-transparent rounded-none h-auto p-0">
            <TabsTrigger value="edit" className="flex-1 rounded-none">
              Редактиране
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex-1 rounded-none">
              <Eye className="mr-2 h-4 w-4" /> Преглед
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="edit" className="m-0">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={minRows}
            className="border-0 focus-visible:ring-0 rounded-none resize-y min-h-[300px]"
          />
        </TabsContent>
        
        <TabsContent value="preview" className="m-0 p-4 min-h-[300px]">
          {renderPreview()}
        </TabsContent>
      </Tabs>
      
      <div className="bg-muted p-2 border-t border-input">
        <p className="text-xs text-muted-foreground">
          Използва се <strong>markdown</strong> синтаксис. <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Научете повече</a>
        </p>
      </div>
    </div>
  );
};
