// @ts-ignore;
import React, { useState, useRef } from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Upload, X, FileText, Download } from 'lucide-react';

export function PDFUpload({
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
    if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
      toast({
        title: "文件类型错误",
        description: "请选择PDF文件",
        variant: "destructive"
      });
      return;
    }

    // 检查文件大小 (限制20MB)
    if (file.size > 20 * 1024 * 1024) {
      toast({
        title: "文件过大",
        description: "PDF文件大小不能超过20MB",
        variant: "destructive"
      });
      return;
    }
    setUploading(true);
    try {
      // 这里应该调用云存储API上传文件
      // 模拟上传过程
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 模拟生成文件URL
      const fileUrl = URL.createObjectURL(file);
      onChange(fileUrl);
      toast({
        title: "上传成功",
        description: "PDF文件上传成功"
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
      description: "PDF文件已移除"
    });
  };
  const handleViewPDF = () => {
    if (value) {
      window.open(value, '_blank');
    }
  };
  return <div className={className}>
      <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept=".pdf,application/pdf" className="hidden" />
      
      {value ? <div className="border border-border rounded-lg p-4 bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm font-medium text-foreground">PDF文档</p>
                <p className="text-xs text-muted-foreground">已上传产品资料文档</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button type="button" variant="outline" size="sm" onClick={handleViewPDF}>
                <Download className="w-4 h-4 mr-1" />
                查看
              </Button>
              <Button type="button" variant="destructive" size="icon" onClick={handleRemove}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div> : <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer" onClick={handleClickUpload}>
          <div className="flex flex-col items-center justify-center space-y-3">
            <FileText className="w-12 h-12 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">点击上传PDF文档</p>
              <p className="text-xs text-muted-foreground mt-1">支持 PDF 格式，最大20MB</p>
            </div>
            <Button type="button" variant="outline" size="sm" disabled={uploading}>
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? '上传中...' : '选择PDF文件'}
            </Button>
          </div>
        </div>}
    </div>;
}