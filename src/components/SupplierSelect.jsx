// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Input, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Plus, X } from 'lucide-react';

export function SupplierSelect({
  value,
  onChange,
  existingSuppliers = []
}) {
  const {
    toast
  } = useToast();
  const [customSupplier, setCustomSupplier] = useState('');
  const [suppliers, setSuppliers] = useState(existingSuppliers);
  const [showCustomInput, setShowCustomInput] = useState(false);

  // 初始化供应商列表
  useEffect(() => {
    // 去重并排序
    const uniqueSuppliers = [...new Set(existingSuppliers.filter(s => s && s.trim()))].sort();
    setSuppliers(uniqueSuppliers);
  }, [existingSuppliers]);

  // 添加自定义供应商
  const addCustomSupplier = () => {
    const trimmedSupplier = customSupplier.trim();
    if (!trimmedSupplier) {
      toast({
        title: "提示",
        description: "请输入供应商名称",
        variant: "default"
      });
      return;
    }

    // 检查是否已存在
    if (suppliers.includes(trimmedSupplier)) {
      toast({
        title: "提示",
        description: "该供应商已存在",
        variant: "default"
      });
      return;
    }

    // 添加到列表并选择
    const updatedSuppliers = [...suppliers, trimmedSupplier].sort();
    setSuppliers(updatedSuppliers);
    onChange(trimmedSupplier);
    setCustomSupplier('');
    setShowCustomInput(false);
    toast({
      title: "添加成功",
      description: `已添加供应商: ${trimmedSupplier}`,
      variant: "default"
    });
  };

  // 处理选择变化
  const handleSelectChange = selectedValue => {
    if (selectedValue === 'custom') {
      setShowCustomInput(true);
    } else {
      onChange(selectedValue);
    }
  };

  // 取消自定义输入
  const cancelCustomInput = () => {
    setShowCustomInput(false);
    setCustomSupplier('');
  };
  return <div className="space-y-2">
      {showCustomInput ? <div className="flex gap-2">
          <Input placeholder="输入新的供应商名称" value={customSupplier} onChange={e => setCustomSupplier(e.target.value)} onKeyPress={e => {
        if (e.key === 'Enter') {
          addCustomSupplier();
        }
      }} className="flex-1" />
          <Button onClick={addCustomSupplier} size="sm">
            <Plus className="w-4 h-4 mr-1" />
            添加
          </Button>
          <Button variant="outline" onClick={cancelCustomInput} size="sm">
            <X className="w-4 h-4" />
          </Button>
        </div> : <Select value={value} onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder="选择或输入供应商" />
          </SelectTrigger>
          <SelectContent>
            {/* 现有供应商列表 */}
            {suppliers.map((supplier, index) => <SelectItem key={index} value={supplier}>
                {supplier}
              </SelectItem>)}
            
            {/* 分隔线 */}
            {suppliers.length > 0 && <div className="h-px bg-border my-1" />}
            
            {/* 自定义输入选项 */}
            <SelectItem value="custom" className="text-primary font-medium">
              <Plus className="w-4 h-4 mr-2 inline" />
              添加新供应商...
            </SelectItem>
          </SelectContent>
        </Select>}
      
      {!showCustomInput && value && <p className="text-xs text-muted-foreground">
          当前选择: {value}
        </p>}
    </div>;
}