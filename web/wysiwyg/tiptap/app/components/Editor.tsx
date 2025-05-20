'use client';

import {
    AlignCenterOutlined,
    AlignLeftOutlined,
    AlignRightOutlined,
    BoldOutlined,
    CodeOutlined,
    ItalicOutlined,
    LinkOutlined,
    MoreOutlined,
    OrderedListOutlined,
    PictureOutlined,
    PlayCircleOutlined,
    TableOutlined,
    UnderlineOutlined,
    UnorderedListOutlined,
    YoutubeOutlined,
} from '@ant-design/icons';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button, ColorPicker, Dropdown, Input, message, Modal, Select, Tooltip, Upload } from 'antd';
import { common, createLowlight } from 'lowlight';
import { useCallback, useState } from 'react';

const lowlight = createLowlight(common);

const formatHtml = (html: string): string => {
  let formatted = '';
  let indent = 0;
  const tab = '  ';

  html.split(/>\s*</).forEach((element) => {
    if (element.match(/^\/\w/)) {
      indent--;
    }

    formatted += tab.repeat(indent) + '<' + element + '>\n';

    if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith('input')) {
      indent++;
    }
  });

  return formatted.substring(1, formatted.length - 1);
};

const Editor = () => {
  const [isHtmlModalVisible, setIsHtmlModalVisible] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const [isYoutubeModalVisible, setIsYoutubeModalVisible] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const handleImageUpload = useCallback(async (file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        editor?.chain().focus().setImage({ src: base64 }).run();
      };
      reader.readAsDataURL(file);
      return false;
    } catch {
      message.error('이미지 업로드에 실패했습니다.');
      return false;
    }
  }, []);

  const handleVideoUpload = useCallback(async (file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        editor?.chain().focus().insertContent(`
          <video controls width="100%">
            <source src="${base64}" type="${file.type}">
            브라우저가 비디오를 지원하지 않습니다.
          </video>
        `).run();
      };
      reader.readAsDataURL(file);
      return false;
    } catch {
      message.error('비디오 업로드에 실패했습니다.');
      return false;
    }
  }, []);

  const handlePaste = useCallback((event: React.ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        event.preventDefault();
        const file = item.getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64 = e.target?.result as string;
            editor?.chain().focus().setImage({ src: base64 }).run();
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        allowBase64: true,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: '<p>에디터에 내용을 입력하세요...</p>',
    
    onUpdate: ({ editor }) => {
      setHtmlContent(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const showHtmlModal = () => {
    const html = editor.getHTML();
    try {
      const formattedHtml = formatHtml(html);
      setHtmlContent(formattedHtml);
    } catch {
      setHtmlContent(html);
      message.warning('HTML 포맷팅에 실패했습니다. 원본 HTML을 표시합니다.');
    }
    setIsHtmlModalVisible(true);
  };

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtmlContent(e.target.value);
  };

  const applyHtmlChanges = () => {
    try {
      const formattedHtml = formatHtml(htmlContent);
      editor.commands.setContent(formattedHtml);
    } catch {
      message.error('HTML 형식이 올바르지 않습니다.');
      return;
    }
    setIsHtmlModalVisible(false);
  };

  const handleYoutubeEmbed = () => {
    if (!youtubeUrl) {
      message.error('유튜브 URL을 입력해주세요.');
      return;
    }

    const videoId = youtubeUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
    
    if (!videoId) {
      message.error('올바른 유튜브 URL을 입력해주세요.');
      return;
    }

    editor.chain().focus().insertContent(`
      <div class="youtube-embed">
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/${videoId}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    `).run();

    setYoutubeUrl('');
    setIsYoutubeModalVisible(false);
  };

  const moreMenuItems = [
    {
      key: 'fontSize',
      label: (
        <Select
          defaultValue="16"
          style={{ width: 120 }}
          onChange={(value) => {
            editor?.chain().focus().setMark('textStyle', { fontSize: `${value}px` }).run();
          }}
          options={[
            { value: '12', label: '12px' },
            { value: '14', label: '14px' },
            { value: '16', label: '16px' },
            { value: '18', label: '18px' },
            { value: '20', label: '20px' },
            { value: '24', label: '24px' },
            { value: '28', label: '28px' },
            { value: '32', label: '32px' },
          ]}
        />
      ),
    },
    {
      key: 'lineHeight',
      label: (
        <Select
          defaultValue="1"
          style={{ width: 120 }}
          onChange={(value) => {
            editor?.chain().focus().setMark('textStyle', { lineHeight: value }).run();
          }}
          options={[
            { value: '1', label: '줄 간격 1' },
            { value: '1.5', label: '줄 간격 1.5' },
            { value: '2', label: '줄 간격 2' },
            { value: '2.5', label: '줄 간격 2.5' },
            { value: '3', label: '줄 간격 3' },
          ]}
        />
      ),
    },
    {
      key: 'color',
      label: (
        <ColorPicker
          onChange={(color) => editor?.chain().focus().setColor(color.toHexString()).run()}
        />
      ),
    },
  ];

  return (
    <div className="border rounded-lg bg-white shadow-sm focus-within:border-blue-500 transition-colors">
      <div className="border-b p-2 bg-gray-50">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 md:gap-2">
          <div className="flex items-center gap-1">
            <Tooltip title="굵게">
              <Button
                size="small"
                icon={<BoldOutlined />}
                onClick={() => editor.chain().focus().toggleBold().run()}
                type={editor.isActive('bold') ? 'primary' : 'text'}
                className="hover:bg-gray-100 transition-colors"
              />
            </Tooltip>
            <Tooltip title="기울임">
              <Button
                size="small"
                icon={<ItalicOutlined />}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                type={editor.isActive('italic') ? 'primary' : 'text'}
                className="hover:bg-gray-100 transition-colors"
              />
            </Tooltip>
            <Tooltip title="밑줄">
              <Button
                size="small"
                icon={<UnderlineOutlined />}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                type={editor.isActive('underline') ? 'primary' : 'text'}
                className="hover:bg-gray-100 transition-colors"
              />
            </Tooltip>
          </div>

          <div className="flex items-center gap-1">
            <Tooltip title="링크">
              <Button
                size="small"
                icon={<LinkOutlined />}
                onClick={() => {
                  const url = window.prompt('링크 URL을 입력하세요:');
                  if (url) {
                    editor.chain().focus().setLink({ href: url }).run();
                  }
                }}
                type={editor.isActive('link') ? 'primary' : 'text'}
                className="hover:bg-gray-100 transition-colors"
              />
            </Tooltip>
            <Tooltip title="이미지 업로드">
              <Upload
                accept="image/*"
                showUploadList={false}
                beforeUpload={handleImageUpload}
              >
                <Button 
                  size="small" 
                  icon={<PictureOutlined />} 
                  type="text"
                  className="hover:bg-gray-100 transition-colors"
                />
              </Upload>
            </Tooltip>
            <Tooltip title="비디오 업로드">
              <Upload
                accept="video/*"
                showUploadList={false}
                beforeUpload={handleVideoUpload}
              >
                <Button 
                  size="small" 
                  icon={<PlayCircleOutlined />} 
                  type="text"
                  className="hover:bg-gray-100 transition-colors"
                />
              </Upload>
            </Tooltip>
          </div>

          <div className="flex items-center gap-1">
            <Tooltip title="유튜브 임베드">
              <Button
                size="small"
                icon={<YoutubeOutlined />}
                onClick={() => setIsYoutubeModalVisible(true)}
                type="text"
                className="hover:bg-gray-100 transition-colors"
              />
            </Tooltip>
            <Tooltip title="테이블">
              <Button
                size="small"
                icon={<TableOutlined />}
                onClick={() => {
                  editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
                }}
                type="text"
                className="hover:bg-gray-100 transition-colors"
              />
            </Tooltip>
            <Tooltip title="HTML 편집">
              <Button
                size="small"
                icon={<CodeOutlined />}
                onClick={showHtmlModal}
                type="text"
                className="hover:bg-gray-100 transition-colors"
              />
            </Tooltip>
          </div>

          <div className="flex items-center gap-1">
            <Tooltip title="순서 있는 목록">
              <Button
                size="small"
                icon={<OrderedListOutlined />}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                type={editor.isActive('orderedList') ? 'primary' : 'text'}
                className="hover:bg-gray-100 transition-colors"
              />
            </Tooltip>
            <Tooltip title="순서 없는 목록">
              <Button
                size="small"
                icon={<UnorderedListOutlined />}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                type={editor.isActive('bulletList') ? 'primary' : 'text'}
                className="hover:bg-gray-100 transition-colors"
              />
            </Tooltip>
          </div>

          <div className="flex items-center gap-1">
            <Tooltip title="왼쪽 정렬">
              <Button
                size="small"
                icon={<AlignLeftOutlined />}
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                type={editor.isActive({ textAlign: 'left' }) ? 'primary' : 'text'}
                className="hover:bg-gray-100 transition-colors"
              />
            </Tooltip>
            <Tooltip title="가운데 정렬">
              <Button
                size="small"
                icon={<AlignCenterOutlined />}
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                type={editor.isActive({ textAlign: 'center' }) ? 'primary' : 'text'}
                className="hover:bg-gray-100 transition-colors"
              />
            </Tooltip>
            <Tooltip title="오른쪽 정렬">
              <Button
                size="small"
                icon={<AlignRightOutlined />}
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                type={editor.isActive({ textAlign: 'right' }) ? 'primary' : 'text'}
                className="hover:bg-gray-100 transition-colors"
              />
            </Tooltip>
          </div>

          <div className="flex items-center gap-1">
            <Dropdown
              menu={{ items: moreMenuItems }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Button 
                size="small" 
                icon={<MoreOutlined />} 
                type="text"
                className="hover:bg-gray-100 transition-colors"
              />
            </Dropdown>
          </div>
        </div>
      </div>
      <EditorContent 
        editor={editor} 
        className="min-h-[300px] max-h-[600px] overflow-y-auto resize-y p-4 [&_p]:m-0 [&_p]:p-0"
        onPaste={handlePaste}
      />
      <Modal
        title="HTML 편집"
        open={isHtmlModalVisible}
        onOk={applyHtmlChanges}
        onCancel={() => setIsHtmlModalVisible(false)}
        width={800}
      >
        <textarea
          value={htmlContent}
          onChange={handleHtmlChange}
          className="w-full h-[400px] p-4 font-mono text-sm border rounded"
        />
      </Modal>
      <Modal
        title="유튜브 임베드"
        open={isYoutubeModalVisible}
        onOk={handleYoutubeEmbed}
        onCancel={() => {
          setYoutubeUrl('');
          setIsYoutubeModalVisible(false);
        }}
      >
        <Input
          placeholder="유튜브 URL을 입력하세요"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Editor; 