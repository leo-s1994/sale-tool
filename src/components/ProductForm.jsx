// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Textarea, Button, useToast, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';

// @ts-ignore;
import { useForm } from 'react-hook-form';
import { ImageUpload } from '@/components/ImageUpload';
import { PDFUpload } from '@/components/PDFUpload';
import { ModelAssociation } from '@/components/ModelAssociation';
import { SupplierSelect } from '@/components/SupplierSelect';
import { CategorySelect } from '@/components/CategorySelect';
export function ProductForm({
  product,
  onSubmit,
  onCancel
}) {
  const {
    toast
  } = useToast();
  const [existingModels, setExistingModels] = useState([]);
  const [existingSuppliers, setExistingSuppliers] = useState([]);
  const [existingCategories, setExistingCategories] = useState([]);

  // 模拟获取产品数据用于型号关联、供应商和分类列表
  useEffect(() => {
    // 这里应该从API获取产品列表
    const mockProducts = [{
      id: '1',
      name: '高端服务器',
      model: 'PowerEdge R750',
      supplier: '戴尔科技',
      category: '服务器'
    }, {
      id: '2',
      name: '网络交换机',
      model: 'S5720-52X-EI-24S',
      supplier: '华为',
      category: '网络设备'
    }, {
      id: '3',
      name: '存储设备',
      model: 'DS1821+',
      supplier: '群晖',
      category: '存储设备'
    }, {
      id: '4',
      name: '服务器配件',
      model: 'MEM-16GB',
      supplier: '金士顿',
      category: '配件'
    }];

    // 提取所有型号用于关联选择
    const models = mockProducts.map(p => p.model).filter(Boolean);
    setExistingModels(models);

    // 提取所有供应商用于下拉选择
    const suppliers = mockProducts.map(p => p.supplier).filter(Boolean);
    setExistingSuppliers(suppliers);

    // 提取所有分类用于下拉选择
    const categories = mockProducts.map(p => p.category).filter(Boolean);
    setExistingCategories(categories);
  }, []);
  const form = useForm({
    defaultValues: product || {
      product_code: generateProductCode(),
      name: '',
      supplier: '',
      category: '',
      model: '',
      description: '',
      short_description: '',
      price: '',
      image: '',
      pdf_url: '',
      specifications: [],
      notes: '',
      model_associations: []
    }
  });

  // 生成产品编号的函数
  function generateProductCode() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `PROD-${timestamp}-${random}`.toUpperCase();
  }
  const handleSubmit = async data => {
    try {
      // 确保产品编号不为空
      if (!data.product_code) {
        data.product_code = generateProductCode();
      }

      // 转换价格为数字
      if (data.price) {
        data.price = Number(data.price);
      }

      // 保存供应商到本地存储（实际应该保存到数据库）
      if (data.supplier && !existingSuppliers.includes(data.supplier)) {
        const updatedSuppliers = [...existingSuppliers, data.supplier].sort();
        setExistingSuppliers(updatedSuppliers);
        // 这里应该调用API保存供应商到数据库
        console.log('新供应商已添加:', data.supplier);
      }

      // 保存分类到本地存储（实际应该保存到数据库）
      if (data.category && !existingCategories.includes(data.category)) {
        const updatedCategories = [...existingCategories, data.category].sort();
        setExistingCategories(updatedCategories);
        // 这里应该调用API保存分类到数据库
        console.log('新产品分类已添加:', data.category);
      }
      await onSubmit(data);
      toast({
        title: "操作成功",
        description: product ? "产品更新成功" : "产品添加成功"
      });
    } catch (error) {
      toast({
        title: "操作失败",
        description: error.message,
        variant: "destructive"
      });
    }
  };
  return <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 p-6">
        {/* 产品编号 - 自动生成，只读 */}
        <FormField control={form.control} name="product_code" render={({
        field
      }) => <FormItem>
              <FormLabel>产品编号</FormLabel>
              <FormControl>
                <Input placeholder="自动生成产品编号" {...field} readOnly className="bg-muted" />
              </FormControl>
              <FormDescription>系统自动生成的唯一产品编号</FormDescription>
              <FormMessage />
            </FormItem>} />
        
        {/* 产品名称 */}
        <FormField control={form.control} name="name" render={({
        field
      }) => <FormItem>
              <FormLabel>产品名称</FormLabel>
              <FormControl>
                <Input placeholder="输入产品名称" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />
        
        {/* 厂商/供应商 */}
        <FormField control={form.control} name="supplier" render={({
        field
      }) => <FormItem>
              <FormLabel>厂商/供应商</FormLabel>
              <FormControl>
                <SupplierSelect value={field.value} onChange={field.onChange} existingSuppliers={existingSuppliers} />
              </FormControl>
              <FormDescription>选择现有供应商或输入新的供应商名称</FormDescription>
              <FormMessage />
            </FormItem>} />
        
        {/* 产品分类 - 更新为下拉选择 */}
        <FormField control={form.control} name="category" render={({
        field
      }) => <FormItem>
              <FormLabel>产品分类</FormLabel>
              <FormControl>
                <CategorySelect value={field.value} onChange={field.onChange} existingCategories={existingCategories} />
              </FormControl>
              <FormDescription>选择现有分类或输入新的产品分类</FormDescription>
              <FormMessage />
            </FormItem>} />
        
        {/* 产品型号 */}
        <FormField control={form.control} name="model" render={({
        field
      }) => <FormItem>
              <FormLabel>产品型号</FormLabel>
              <FormControl>
                <Input placeholder="输入产品型号" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />
        
        {/* 型号关联功能 */}
        <FormField control={form.control} name="model_associations" render={({
        field
      }) => <FormItem>
              <FormLabel>型号关联</FormLabel>
              <FormControl>
                <ModelAssociation value={field.value} onChange={field.onChange} existingModels={existingModels} />
              </FormControl>
              <FormDescription>
                关联其他相关产品型号，可以为每个关联型号添加备注信息
              </FormDescription>
              <FormMessage />
            </FormItem>} />
        
        {/* 价格 */}
        <FormField control={form.control} name="price" render={({
        field
      }) => <FormItem>
              <FormLabel>价格</FormLabel>
              <FormControl>
                <Input type="number" placeholder="输入价格" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />
        
        {/* 产品图片上传 */}
        <FormField control={form.control} name="image" render={({
        field
      }) => <FormItem>
              <FormLabel>产品图片</FormLabel>
              <FormControl>
                <ImageUpload value={field.value} onChange={field.onChange} onRemove={() => field.onChange('')} />
              </FormControl>
              <FormDescription>上传产品展示图片，支持 JPG, PNG, GIF 格式</FormDescription>
              <FormMessage />
            </FormItem>} />
        
        {/* PDF文档上传 */}
        <FormField control={form.control} name="pdf_url" render={({
        field
      }) => <FormItem>
              <FormLabel>PDF文档</FormLabel>
              <FormControl>
                <PDFUpload value={field.value} onChange={field.onChange} onRemove={() => field.onChange('')} />
              </FormControl>
              <FormDescription>上传产品资料PDF文档，支持在线查看</FormDescription>
              <FormMessage />
            </FormItem>} />
        
        {/* 产品文字描述 */}
        <FormField control={form.control} name="description" render={({
        field
      }) => <FormItem>
              <FormLabel>产品文字描述</FormLabel>
              <FormControl>
                <Textarea placeholder="输入详细的产品描述" {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>} />
        
        {/* 简化描述 */}
        <FormField control={form.control} name="short_description" render={({
        field
      }) => <FormItem>
              <FormLabel>简化描述</FormLabel>
              <FormControl>
                <Input placeholder="输入简化的产品描述" {...field} />
              </FormControl>
              <FormDescription>用于卡片显示的简短描述</FormDescription>
              <FormMessage />
            </FormItem>} />
        
        {/* 备注 */}
        <FormField control={form.control} name="notes" render={({
        field
      }) => <FormItem>
              <FormLabel>备注</FormLabel>
              <FormControl>
                <Textarea placeholder="输入备注信息" {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>} />
        
        <div className="flex space-x-4">
          <Button type="submit">{product ? '更新' : '添加'}产品</Button>
          <Button type="button" variant="outline" onClick={onCancel}>取消</Button>
        </div>
      </form>
    </Form>;
}