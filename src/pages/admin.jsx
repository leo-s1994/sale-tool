// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, useToast } from '@/components/ui';
// @ts-ignore;
import { MoreHorizontal, Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';

// 模拟产品数据
const mockProducts = [{
  id: 1,
  name: '高端服务器',
  description: '企业级服务器，支持高并发处理',
  price: 29999,
  image: 'https://images.unsplash.com/photo-1563014959-7aaa83350992?w=300&h=200&fit=crop',
  pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
}, {
  id: 2,
  name: '网络交换机',
  description: '千兆以太网交换机，24端口',
  price: 8999,
  image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=200&fit=crop',
  pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
}, {
  id: 3,
  name: '存储设备',
  description: 'NAS网络存储解决方案',
  price: 15999,
  image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=200&fit=crop',
  pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
}];
export default function Admin(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [products, setProducts] = useState(mockProducts);
  const handleEdit = product => {
    $w.utils.navigateTo({
      pageId: 'productForm',
      params: {
        productId: product.id,
        edit: true
      }
    });
  };
  const handleDelete = productId => {
    setProducts(products.filter(p => p.id !== productId));
    toast({
      title: "删除成功",
      description: "产品已删除"
    });
  };
  const handleAddProduct = () => {
    $w.utils.navigateTo({
      pageId: 'productForm'
    });
  };
  const handleBack = () => {
    $w.utils.navigateBack();
  };
  return <div style={style} className="min-h-screen bg-background">
      {/* 头部 */}
      <div className="bg-card border-b border-border p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={handleBack} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">后台管理</h1>
          </div>
          <Button onClick={handleAddProduct}>
            <Plus className="w-4 h-4 mr-2" />
            添加产品
          </Button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-card border border-border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>产品图片</TableHead>
                <TableHead>产品名称</TableHead>
                <TableHead>描述</TableHead>
                <TableHead>价格</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(product => <TableRow key={product.id}>
                  <TableCell>
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-muted-foreground line-clamp-2">
                    {product.description}
                  </TableCell>
                  <TableCell className="text-primary font-bold">¥{product.price}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(product)}>
                          <Edit className="w-4 h-4 mr-2" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(product.id)} className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>

          {products.length === 0 && <div className="text-center py-12">
              <p className="text-muted-foreground">暂无产品数据</p>
            </div>}
        </div>
      </div>
    </div>;
}