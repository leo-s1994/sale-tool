// @ts-ignore;
import React, { useState, useRef } from 'react';
// @ts-ignore;
import { Button, Progress, useToast } from '@/components/ui';
// @ts-ignore;
import { Upload, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export function ExcelImport({
  onImportComplete
}) {
  const {
    toast
  } = useToast();
  const fileInputRef = useRef(null);
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [importResult, setImportResult] = useState(null);
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = async event => {
    const file = event.target.files[0];
    if (!file) return;

    // 检查文件类型
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast({
        title: "文件格式错误",
        description: "请选择Excel文件(.xlsx或.xls格式)",
        variant: "destructive"
      });
      return;
    }

    // 开始导入
    setIsImporting(true);
    setProgress(0);
    setImportResult(null);
    try {
      // 模拟文件读取和解析过程
      await simulateExcelImport(file);
      toast({
        title: "导入成功",
        description: "产品数据已成功导入",
        variant: "default"
      });
      if (onImportComplete) {
        onImportComplete();
      }
    } catch (error) {
      console.error('导入失败:', error);
      toast({
        title: "导入失败",
        description: error.message || "请检查Excel文件格式是否正确",
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
      setProgress(100);
    }
  };
  const simulateExcelImport = async file => {
    return new Promise((resolve, reject) => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        setProgress(currentProgress);
        if (currentProgress >= 90) {
          clearInterval(interval);

          // 模拟数据处理完成
          setTimeout(() => {
            setImportResult({
              total: 15,
              success: 12,
              failed: 3,
              errors: [{
                row: 5,
                message: "产品编号重复"
              }, {
                row: 8,
                message: "价格格式错误"
              }, {
                row: 12,
                message: "必填字段缺失"
              }]
            });
            resolve();
          }, 1000);
        }
      }, 200);
    });
  };
  const resetImport = () => {
    setProgress(0);
    setImportResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  return <div className="bg-card p-6 rounded-lg border border-border">
      <div className="flex items-center space-x-3 mb-4">
        <FileText className="w-6 h-6 text-primary" />
        <h3 className="text-lg font-semibold">Excel批量导入</h3>
      </div>

      <div className="space-y-4">
        {/* 上传区域 */}
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground mb-4">
            支持.xlsx和.xls格式的Excel文件
          </p>
          <Button onClick={handleFileSelect} disabled={isImporting} className="relative">
            <Upload className="w-4 h-4 mr-2" />
            选择Excel文件
            <input ref={fileInputRef} type="file" accept=".xlsx,.xls" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled={isImporting} />
          </Button>
        </div>

        {/* 导入进度 */}
        {isImporting && <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>导入中...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>}

        {/* 导入结果 */}
        {importResult && <div className="space-y-3">
            <div className={`p-4 rounded-lg ${importResult.failed > 0 ? 'bg-yellow-100 border-yellow-200' : 'bg-green-100 border-green-200'} border`}>
              <div className="flex items-center space-x-2 mb-2">
                {importResult.failed > 0 ? <AlertCircle className="w-5 h-5 text-yellow-600" /> : <CheckCircle className="w-5 h-5 text-green-600" />}
                <span className={`font-medium ${importResult.failed > 0 ? 'text-yellow-800' : 'text-green-800'}`}>
                  导入完成
                </span>
              </div>
              <p className={`text-sm ${importResult.failed > 0 ? 'text-yellow-700' : 'text-green-700'}`}>
                总计: {importResult.total} 条, 
                成功: {importResult.success} 条, 
                失败: {importResult.failed} 条
              </p>
            </div>

            {/* 错误详情 */}
            {importResult.failed > 0 && <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-800 mb-2">失败记录详情:</h4>
                <div className="space-y-2 text-sm text-red-700">
                  {importResult.errors.map((error, index) => <div key={index} className="flex items-start space-x-2">
                      <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>第 {error.row} 行: {error.message}</span>
                    </div>)}
                </div>
              </div>}

            <Button onClick={resetImport} variant="outline" size="sm">
              重新导入
            </Button>
          </div>}

        {/* 使用说明 */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Excel模板说明:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• 第一行为表头，包含: 产品编号、产品名称、厂商、分类、型号、价格等字段</li>
            <li>• 产品编号必须唯一且不为空</li>
            <li>• 价格字段请使用数字格式</li>
            <li>• 分类字段请使用系统中已有的分类名称</li>
          </ul>
        </div>
      </div>
    </div>;
}