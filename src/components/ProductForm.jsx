// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Textarea, Button, useToast, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';

// @ts-ignore;
import { useForm } from 'react-hook-form';
import { ImageUpload } from '@/components/ImageUpload';
import { PDFUpload } from '@/components/PDFUpload';
export function ProductForm({
  product,
  onSubmit,
  onCancel
}) {
  const {
    toast
  } = useToast();
  const [relatedProducts, setRelatedProducts] = useState([]);

  // 模拟获取关联产品数据
  useEffect(() => {
    // 这里应该从API获取产品列表
    const mockProducts = [{
      id: '1',
      name: '高端服务器'
    }, {
      id: '2',
      name: '网络交换机'
    }, {
      id: '3',
      name: '存储设备'
    }];
    setRelatedProducts(mockProducts);
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
      related_products: []
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

      // 转换关联产品为数组（如果是字符串）
      if (typeof data.related_products === 'string') {
        data.related_products = data.related_products.split(',').filter(Boolean);
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
                <Input placeholder="输入厂商或供应商名称" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />
        
        {/* 产品分类 */}
        <FormField control={form.control} name="category" render={({
        field
      }) => <FormItem>
              <FormLabel>产品分类</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="选择产品分类" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="服务器">服务器</SelectItem>
                  <SelectItem value="网络设备">网络设备</SelectItem>
                  <SelectItem value="存储设备">存储设备</SelectItem>
                  <SelectItem value="软件">软件</SelectItem>
                  <SelectItem value="配件">配件</SelectItem>
                  <SelectItem value="其他">其他</SelectItem>
                </SelectContent>
              </Select>
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
        
        {/* 关联产品选择器 */}
        <FormField control={form.control} name="related_products" render={({
        field
      }) => <FormItem>
              <FormLabel>关联产品</FormLabel>
              <Select onValueChange={value => {
          const currentValues = field.value || [];
          if (!currentValues.includes(value)) {
            field.onChange([...currentValues, value]);
          }
        }} defaultValue="">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="选择关联产品" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {relatedProducts.map(prod => <SelectItem key={prod.id} value={prod.id}>
                        {prod.name}
                      </SelectItem>)}
                </SelectContent>
              </Select>
              <FormDescription>
                已选择的关联产品: {field.value && field.value.length > 0 ? field.value.join(', ') : '无'}
              </FormDescription>
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