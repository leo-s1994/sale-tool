// @ts-ignore;
import React, { useState, useRef } from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Upload, X, Image as ImageIcon } from 'lucide-react';

export function ImageUpload({
  value,
  onChange,
  onRemove,
  className
}) {
  const {
    toast
  } = useToast();
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const handleFileSelect = async event => {
    const file = event.target.files[0];
    if (!file) return;

    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      toast({
        title: "文件类型错误",
        description: "请选择图片文件",
        variant: "destructive"
      });
      return;
    }

    // 检查文件大小 (限制5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "文件过大",
        description: "图片大小不能超过5MB",
        variant: "destructive"
      });
      return;
    }
    setUploading(true);
    try {
      // 这里应该调用云存储API上传文件
      // 模拟上传过程
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 模拟生成文件URL
      const fileUrl = URL.createObjectURL(file);
      onChange(fileUrl);
      toast({
        title: "上传成功",
        description: "图片上传成功"
      });
    } catch (error) {
      toast({
        title: "上传失败",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
      // 清空文件输入
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };
  const handleRemove = () => {
    onRemove();
    toast({
      title: "已移除",
      description: "图片已移除"
    });
  };
  return <div className={className}>
      <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" className="hidden" />
      
      {value ? <div className="relative group">
          <img src={value} alt="产品图片" className="w-full h-48 object-cover rounded-lg border border-border" />
          <Button type="button" variant="destructive" size="icon" onClick={handleRemove} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <X className="w-4 h-4" />
          </Button>
        </div> : <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer" onClick={handleClickUpload}>
          <div className="flex flex-col items-center justify-center space-y-3">
            <ImageIcon className="w-12 h-12 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">点击上传图片</p>
              <p className="text-xs text-muted-foreground mt-1">支持 JPG, PNG, GIF 格式，最大5MB</p>
            </div>
            <Button type="button" variant="outline" size="sm" disabled={uploading}>
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? '上传中...' : '选择图片'}
            </Button>
          </div>
        </div>}
    </div>;
}