// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Input, Button, useToast, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Badge } from '@/components/ui';
// @ts-ignore;
import { Search, X, Plus } from 'lucide-react';

export function ModelAssociation({
  value = [],
  onChange,
  existingModels = []
}) {
  const {
    toast
  } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [modelNote, setModelNote] = useState('');
  const [availableModels, setAvailableModels] = useState([]);

  // 初始化可用型号列表
  useEffect(() => {
    // 从现有产品中提取所有型号，过滤掉空值和重复值
    const uniqueModels = [...new Set(existingModels.filter(model => model && model.trim()))];
    setAvailableModels(uniqueModels);
  }, [existingModels]);

  // 过滤型号列表
  const filteredModels = availableModels.filter(model => model.toLowerCase().includes(searchTerm.toLowerCase()));

  // 添加关联型号
  const addModelAssociation = () => {
    if (!selectedModel) {
      toast({
        title: "提示",
        description: "请选择要关联的型号",
        variant: "default"
      });
      return;
    }
    const currentAssociations = value || [];
    const modelExists = currentAssociations.some(item => item.model === selectedModel);
    if (modelExists) {
      toast({
        title: "提示",
        description: "该型号已关联",
        variant: "default"
      });
      return;
    }
    const newAssociation = {
      model: selectedModel,
      note: modelNote.trim()
    };
    const updatedAssociations = [...currentAssociations, newAssociation];
    onChange(updatedAssociations);

    // 重置表单
    setSelectedModel('');
    setModelNote('');
    setSearchTerm('');
  };

  // 移除关联型号
  const removeModelAssociation = modelToRemove => {
    const currentAssociations = value || [];
    const updatedAssociations = currentAssociations.filter(item => item.model !== modelToRemove);
    onChange(updatedAssociations);
  };

  // 处理搜索
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setAvailableModels([...new Set(existingModels.filter(model => model && model.trim()))]);
      return;
    }
  };

  // 回车键搜索
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return <div className="space-y-4">
      {/* 搜索和选择区域 */}
      <div className="bg-muted/50 p-4 rounded-lg border border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          {/* 搜索输入框 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="搜索型号..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyPress={handleKeyPress} className="pl-10" />
          </div>

          {/* 型号选择器 */}
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger>
              <SelectValue placeholder="选择型号" />
            </SelectTrigger>
            <SelectContent>
              {filteredModels.length > 0 ? filteredModels.map((model, index) => <SelectItem key={index} value={model}>
                    {model}
                  </SelectItem>) : <div className="px-3 py-2 text-sm text-muted-foreground">
                  {searchTerm ? `未找到"${searchTerm}"相关型号` : '暂无可用型号'}
                </div>}
            </SelectContent>
          </Select>

          {/* 备注输入框 */}
          <Input placeholder="关联备注（可选）" value={modelNote} onChange={e => setModelNote(e.target.value)} />
        </div>

        {/* 添加按钮 */}
        <Button onClick={addModelAssociation} disabled={!selectedModel} className="w-full md:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          添加关联
        </Button>
      </div>

      {/* 已关联型号列表 */}
      {value && value.length > 0 && <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">已关联型号</h4>
          {value.map((item, index) => <div key={index} className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {item.model}
                  </Badge>
                  {item.note && <span className="text-sm text-muted-foreground">
                      备注: {item.note}
                    </span>}
                </div>
              </div>
              <Button type="button" variant="ghost" size="icon" onClick={() => removeModelAssociation(item.model)} className="h-8 w-8 text-destructive hover:text-destructive/90">
                <X className="h-4 w-4" />
              </Button>
            </div>)}
        </div>}

      {/* 空状态提示 */}
      {(!value || value.length === 0) && <div className="text-center py-8 border border-dashed border-border rounded-lg">
          <p className="text-muted-foreground text-sm">
            暂无关联型号，请添加型号关联
          </p>
        </div>}
    </div>;
}