// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, useToast } from '@/components/ui';
// @ts-ignore;
import { MoreHorizontal, Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';

// 模拟产品数据 - 更新为包含产品型号信息
const mockProducts = [{
  id: 1,
  product_code: 'PROD-1A2B3C4D',
  name: '高端服务器',
  supplier: '戴尔科技',
  category: '服务器',
  model: 'PowerEdge R750',
  description: '企业级服务器，支持高并发处理，适用于大型数据中心。采用最新处理器技术，提供卓越的性能和可靠性。',
  short_description: '高性能企业级服务器',
  price: 29999,
  image: 'https://images.unsplash.com/photo-1563014959-7aaa83350992?w=300&h=200&fit=crop',
  pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  specifications: ['处理器: Intel Xeon Gold 6338', '内存: 256GB DDR4', '存储: 4TB SSD', '网络: 双万兆网卡'],
  notes: '支持热插拔硬盘，提供3年原厂保修服务',
  related_products: ['2', '3']
}, {
  id: 2,
  product_code: 'PROD-2E3F4G5H',
  name: '网络交换机',
  supplier: '华为',
  category: '网络设备',
  model: 'S5720-52X-EI-24S',
  description: '千兆以太网交换机，24端口，支持PoE功能，适合中小型企业网络部署。',
  short_description: '24口千兆PoE交换机',
  price: 8999,
  image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=200&fit=crop',
  pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  specifications: ['端口: 24×千兆电口 + 4×SFP', 'PoE: 支持', '交换容量: 256Gbps', '包转发率: 95Mpps'],
  notes: '支持VLAN划分和QoS功能',
  related_products: ['1']
}, {
  id: 3,
  product_code: 'PROD-3I4J5K6L',
  name: '存储设备',
  supplier: '群晖',
  category: '存储设备',
  model: 'DS1821+',
  description: 'NAS网络存储解决方案，支持多用户同时访问，数据备份和恢复功能完善。',
  short_description: '8盘位NAS网络存储',
  price: 15999,
  image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=200&fit=crop',
  pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  specifications: ['容量: 16TB (可扩展)', '接口: 双千兆网口', 'RAID: 支持多种RAID级别', '用户数: 支持50+并发用户'],
  notes: '支持SSD缓存加速，内置备份软件',
  related_products: ['1', '2']
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
                <TableHead>产品型号</TableHead>
                <TableHead>分类</TableHead>
                <TableHead>供应商</TableHead>
                <TableHead>价格</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(product => <TableRow key={product.id}>
                  <TableCell>
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>
                      <div>{product.name}</div>
                      {product.short_description && <div className="text-xs text-muted-foreground mt-1">
                          {product.short_description}
                        </div>}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {product.model || '-'}
                  </TableCell>
                  <TableCell>
                    {product.category && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {product.category}
                      </span>}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {product.supplier || '-'}
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