// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';

export default function PDFViewer(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const params = $w.page.dataset.params;
  const pdfUrl = params?.pdfUrl;
  const productName = params?.productName || '产品文档';
  const handleDownload = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    } else {
      toast({
        title: "错误",
        description: "无法下载文档",
        variant: "destructive"
      });
    }
  };
  const handleBack = () => {
    $w.utils.navigateBack();
  };
  const handleOpenInNewTab = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    }
  };
  if (!pdfUrl) {
    return <div style={style} className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">PDF文档链接无效</p>
          <Button onClick={handleBack} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回
          </Button>
        </div>
      </div>;
  }
  return <div style={style} className="min-h-screen bg-background">
      {/* 头部工具栏 */}
      <div className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={handleBack} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-foreground">{productName} - 技术文档</h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleOpenInNewTab}>
              <ExternalLink className="w-4 h-4 mr-2" />
              新标签页打开
            </Button>
            <Button onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              下载PDF
            </Button>
          </div>
        </div>
      </div>

      {/* PDF查看器 */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">PDF</span>
              </div>
              <p className="text-muted-foreground mb-4">正在加载PDF文档...</p>
              <p className="text-sm text-muted-foreground">
                如果PDF没有自动加载，请点击上方按钮在新标签页打开或下载
              </p>
            </div>
          </div>
          
          {/* 实际PDF嵌入（简化版） */}
          <div className="mt-4 text-center">
            <Button onClick={handleOpenInNewTab} variant="outline">
              <ExternalLink className="w-4 h-4 mr-2" />
              点击这里在新标签页中查看完整PDF文档
            </Button>
          </div>
        </div>
      </div>
    </div>;
}