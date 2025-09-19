// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Button, useToast } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft } from 'lucide-react';

import { ProductForm } from '@/components/ProductForm';
// 模拟产品数据
const mockProducts = {
  1: {
    id: 1,
    name: '高端服务器',
    description: '企业级服务器，支持高并发处理',
    price: 29999,
    image: 'https://images.unsplash.com/photo-1563014959-7aaa83350992?w=300&h=200&fit=crop',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  2: {
    id: 2,
    name: '网络交换机',
    description: '千兆以太网交换机，24端口',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=200&fit=crop',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  3: {
    id: 3,
    name: '存储设备',
    description: 'NAS网络存储解决方案',
    price: 15999,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=200&fit=crop',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
};
export default function ProductFormPage(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const params = $w.page.dataset.params;
  const productId = params?.productId;
  const isEdit = params?.edit;
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState(Object.values(mockProducts));
  useEffect(() => {
    if (productId && isEdit) {
      setProduct(mockProducts[productId]);
    }
  }, [productId, isEdit]);
  const handleSubmit = async formData => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (isEdit && productId) {
        // 更新产品
        const updatedProducts = products.map(p => p.id === parseInt(productId) ? {
          ...p,
          ...formData
        } : p);
        setProducts(updatedProducts);
      } else {
        // 添加新产品
        const newProduct = {
          id: Date.now(),
          ...formData
        };
        setProducts([...products, newProduct]);
      }
      toast({
        title: "成功",
        description: isEdit ? "产品更新成功" : "产品添加成功"
      });
      handleBack();
    } catch (error) {
      toast({
        title: "错误",
        description: "操作失败，请重试",
        variant: "destructive"
      });
    }
  };
  const handleCancel = () => {
    handleBack();
  };
  const handleBack = () => {
    $w.utils.navigateBack();
  };
  return <div style={style} className="min-h-screen bg-background">
      {/* 头部 */}
      <div className="bg-card border-b border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center space-x-4">
          <Button variant="ghost" onClick={handleBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            {isEdit ? '编辑产品' : '添加产品'}
          </h1>
        </div>
      </div>

      {/* 表单内容 */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-card border border-border rounded-lg">
          <ProductForm product={product} onSubmit={handleSubmit} onCancel={handleCancel} />
        </div>
      </div>
    </div>;
}