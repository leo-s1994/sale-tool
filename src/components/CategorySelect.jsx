// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Input, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Plus, X } from 'lucide-react';

export function CategorySelect({
  value,
  onChange,
  existingCategories = []
}) {
  const {
    toast
  } = useToast();
  const [customCategory, setCustomCategory] = useState('');
  const [categories, setCategories] = useState(existingCategories);
  const [showCustomInput, setShowCustomInput] = useState(false);

  // 初始化分类列表
  useEffect(() => {
    // 去重并排序
    const uniqueCategories = [...new Set(existingCategories.filter(c => c && c.trim()))].sort();
    setCategories(uniqueCategories);
  }, [existingCategories]);

  // 添加自定义分类
  const addCustomCategory = () => {
    const trimmedCategory = customCategory.trim();
    if (!trimmedCategory) {
      toast({
        title: "提示",
        description: "请输入产品分类名称",
        variant: "default"
      });
      return;
    }

    // 检查是否已存在
    if (categories.includes(trimmedCategory)) {
      toast({
        title: "提示",
        description: "该产品分类已存在",
        variant: "default"
      });
      return;
    }

    // 添加到列表并选择
    const updatedCategories = [...categories, trimmedCategory].sort();
    setCategories(updatedCategories);
    onChange(trimmedCategory);
    setCustomCategory('');
    setShowCustomInput(false);
    toast({
      title: "添加成功",
      description: `已添加产品分类: ${trimmedCategory}`,
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
    setCustomCategory('');
  };
  return <div className="space-y-2">
      {showCustomInput ? <div className="flex gap-2">
          <Input placeholder="输入新的产品分类" value={customCategory} onChange={e => setCustomCategory(e.target.value)} onKeyPress={e => {
        if (e.key === 'Enter') {
          addCustomCategory();
        }
      }} className="flex-1" />
          <Button onClick={addCustomCategory} size="sm">
            <Plus className="w-4 h-4 mr-1" />
            添加
          </Button>
          <Button variant="outline" onClick={cancelCustomInput} size="sm">
            <X className="w-4 h-4" />
          </Button>
        </div> : <Select value={value} onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder="选择或输入产品分类" />
          </SelectTrigger>
          <SelectContent>
            {/* 常用分类 */}
            <div className="px-3 py-2 text-xs text-muted-foreground font-medium">常用分类</div>
            <SelectItem value="服务器">服务器</SelectItem>
            <SelectItem value="网络设备">网络设备</SelectItem>
            <SelectItem value="存储设备">存储设备</SelectItem>
            <SelectItem value="软件">软件</SelectItem>
            <SelectItem value="配件">配件</SelectItem>
            
            {/* 已有分类列表 */}
            {categories.length > 0 && <>
                <div className="h-px bg-border my-1" />
                <div className="px-3 py-2 text-xs text-muted-foreground font-medium">已有分类</div>
                {categories.map((category, index) => <SelectItem key={index} value={category}>
                    {category}
                  </SelectItem>)}
              </>}
            
            {/* 分隔线 */}
            <div className="h-px bg-border my-1" />
            
            {/* 自定义输入选项 */}
            <SelectItem value="custom" className="text-primary font-medium">
              <Plus className="w-4 h-4 mr-2 inline" />
              添加新分类...
            </SelectItem>
          </SelectContent>
        </Select>}
      
      {!showCustomInput && value && <p className="text-xs text-muted-foreground">
          当前选择: {value}
        </p>}
    </div>;
}