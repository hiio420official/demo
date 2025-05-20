'use client';

import { Editor } from '@tinymce/tinymce-react';
import { Card } from 'antd';
import { useState, useEffect } from 'react';
interface BlobInfo {
  blob: () => Blob;
}

interface FilePickerCallback {
  (url: string, meta?: { alt?: string }): void;
}

interface FilePickerMeta {
  filetype: 'image' | 'media';
}

interface TinyMCEEditor {
  getContainer: () => HTMLElement;
  on: (event: string, callback: () => void) => void;
}

const TinyMCEEditor = () => {
  const [content, setContent] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleImageUpload = (blobInfo: BlobInfo) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject('이미지 업로드에 실패했습니다.');
      };
      reader.readAsDataURL(blobInfo.blob());
    });
  };

  const handleVideoUpload = (blobInfo: BlobInfo) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject('동영상 업로드에 실패했습니다.');
      };
      reader.readAsDataURL(blobInfo.blob());
    });
  };

  return (
    <Card title="TinyMCE 에디터" style={{ margin: '20px' }}>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 1000,
            background: '#fff',
            fontSize: '12px',
            color: '#666',
            width: "100px",
            height: "30px"
          }}
        >
        </div>
        <Editor
          tinymceScriptSrc={'https://cdnjs.cloudflare.com/ajax/libs/tinymce/7.6.1/tinymce.min.js'}
          licenseKey='gpl'
          init={{
            height: 500,
            menubar: true,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
              'media', 'image', 'video'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'image media | removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            images_upload_handler: handleImageUpload,
            media_upload_handler: handleVideoUpload,
            file_picker_types: 'image media',
            images_upload_base_path: '/images',
            media_upload_base_path: '/media',
            automatic_uploads: true,
            file_picker_callback: (callback: FilePickerCallback, value: string, meta: FilePickerMeta) => {
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', meta.filetype === 'image' ? 'image/*' : 'video/*');

              input.onchange = (e: Event) => {
                const target = e.target as HTMLInputElement;
                const file = target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    callback(reader.result as string, {
                      alt: file.name
                    });
                  };
                  reader.readAsDataURL(file);
                }
              };

              input.click();
            },
            setup: (editor: TinyMCEEditor) => {
              editor.on('init', () => {
                editor.getContainer().style.transition = "border-color 0.15s ease-in-out";
              });
              editor.on('focus', () => {
                editor.getContainer().style.borderColor = '#40a9ff';
              });
              editor.on('blur', () => {
                editor.getContainer().style.borderColor = '#d9d9d9';
              });
            }
          }}
          onEditorChange={(content) => setContent(content)}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>미리보기:</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </Card>
  );
};

export default TinyMCEEditor; 