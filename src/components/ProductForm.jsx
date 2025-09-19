// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Textarea, Button, useToast, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Badge, X } from '@/components/ui';

// @ts-ignore;
import { useForm } from 'react-hook-form';
import { ImageUpload } from '@/components/ImageUpload';
import { PDFUpload } from '@/components/PDFUpload';
import { ModelAssociation } from '@/components/ModelAssociation';
export function ProductForm({
  product,
  onSubmit,
  onCancel
}) {
  const {
    toast
  } = useToast();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [productNote, setProductNote] = useState('');
  const [existingModels, setExistingModels] = useState([]);

  // 模拟获取关联产品数据
  useEffect(() => {
    // 这里应该从API获取产品列表
    const mockProducts = [{
      id: '1',
      name: '高端服务器',
      model: 'PowerEdge R750'
    }, {
      id: '2',
      name: '网络交换机',
      model: 'S5720-52X-EI-24S'
    }, {
      id: '3',
      name: '存储设备',
      model: 'DS1821+'
    }];
    setRelatedProducts(mockProducts);

    // 提取所有型号用于关联选择
    const models = mockProducts.map(p => p.model).filter(Boolean);
    setExistingModels(models);
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
      related_products: [],
      model_associations: []
    }
  });

  // 生成产品编号的函数
  function generateProductCode() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `PROD-${timestamp}-${random}`.toUpperCase();
  }

  // 添加关联产品
  const addRelatedProduct = () => {
    if (!selectedProduct) return;
    const currentRelatedProducts = form.getValues('related_products') || [];
    const productExists = currentRelatedProducts.some(item => item.productId === selectedProduct);
    if (productExists) {
      toast({
        title: "提示",
        description: "该产品已关联",
        variant: "default"
      });
      return;
    }
    const newRelatedProduct = {
      productId: selectedProduct,
      note: productNote.trim()
    };
    const updatedRelatedProducts = [...currentRelatedProducts, newRelatedProduct];
    form.setValue('related_products', updatedRelatedProducts);
    setSelectedProduct('');
    setProductNote('');
  };

  // 移除关联产品
  const removeRelatedProduct = productId => {
    const currentRelatedProducts = form.getValues('related_products') || [];
    const updatedRelatedProducts = currentRelatedProducts.filter(item => item.productId !== productId);
    form.setValue('related_products', updatedRelatedProducts);
  };

  // 获取产品名称
  const getProductName = productId => {
    const product = relatedProducts.find(p => p.id === productId);
    return product ? product.name : '未知产品';
  };
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
        
        {/* 关联产品选择器 */}
        <FormItem>
          <FormLabel>关联产品</FormLabel>
          <div className="space-y-3">
            {/* 选择关联产品 */}
            <div className="flex gap-3">
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="选择关联产品" />
                </SelectTrigger>
                <SelectContent>
                  {relatedProducts.map(prod => <SelectItem key={prod.id} value={prod.id}>
                      {prod.name}
                    </SelectItem>)}
                </SelectContent>
              </Select>
              
              <Input placeholder="关联备注（可选）" value={productNote} onChange={e => setProductNote(e.target.value)} className="flex-1" />
              
              <Button type="button" onClick={addRelatedProduct} disabled={!selectedProduct}>
                添加
              </Button>
            </div>
            
            {/* 已选择的关联产品列表 */}
            <div className="space-y-2">
              {form.watch('related_products')?.map((item, index) => <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{getProductName(item.productId)}</div>
                    {item.note && <div className="text-sm text-muted-foreground mt-1">
                        备注: {item.note}
                      </div>}
                  </div>
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeRelatedProduct(item.productId)} className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </div>)}
            </div>
          </div>
          <FormDescription>
            选择其他产品作为关联产品，可以为每个关联产品添加备注信息
          </FormDescription>
        </FormItem>
        
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