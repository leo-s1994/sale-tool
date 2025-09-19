// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Input, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Search, Plus, Settings, Eye, EyeOff } from 'lucide-react';

import { ProductCard } from '@/components/ProductCard';
import { PasswordDialog } from '@/components/PasswordDialog';
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
export default function Home(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [showPrices, setShowPrices] = useState(false); // 控制价格显示的状态
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  useEffect(() => {
    const filtered = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase()) || product.model && product.model.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredProducts(filtered);
  }, [searchTerm, products]);
  const handleViewDetails = product => {
    $w.utils.navigateTo({
      pageId: 'productDetail',
      params: {
        productId: product.id
      }
    });
  };
  const handleViewPDF = product => {
    $w.utils.navigateTo({
      pageId: 'pdfViewer',
      params: {
        pdfUrl: product.pdf_url,
        productName: product.name
      }
    });
  };
  const goToAdmin = () => {
    $w.utils.navigateTo({
      pageId: 'admin'
    });
  };
  const goToAddProduct = () => {
    $w.utils.navigateTo({
      pageId: 'productForm'
    });
  };
  const handleTogglePrices = () => {
    if (showPrices) {
      // 如果已经显示价格，直接隐藏
      setShowPrices(false);
    } else {
      // 如果当前隐藏价格，打开密码验证对话框
      setPasswordDialogOpen(true);
    }
  };
  const handlePasswordSuccess = () => {
    setShowPrices(true);
    toast({
      title: "验证成功",
      description: "已显示产品价格"
    });
  };
  return <div style={style} className="min-h-screen bg-background">
      {/* 头部搜索栏 */}
      <div className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">销售工具</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="搜索产品名称、型号或描述..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-80" />
            </div>
            {/* 价格切换按钮 */}
            <Button variant="ghost" size="icon" onClick={handleTogglePrices} className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground" title={showPrices ? '隐藏价格' : '显示价格'}>
              {showPrices ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            <Button variant="outline" onClick={goToAdmin}>
              <Settings className="w-4 h-4 mr-2" />
              后台管理
            </Button>
            <Button onClick={goToAddProduct}>
              <Plus className="w-4 h-4 mr-2" />
              添加产品
            </Button>
          </div>
        </div>
      </div>

      {/* 产品列表 */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => <ProductCard key={product.id} product={product} showPrice={showPrices} onViewDetails={handleViewDetails} onViewPDF={handleViewPDF} />)}
        </div>
        
        {filteredProducts.length === 0 && <div className="text-center py-12">
            <p className="text-muted-foreground">没有找到相关产品</p>
          </div>}
      </div>

      {/* 密码验证对话框 */}
      <PasswordDialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen} onSuccess={handlePasswordSuccess} />
    </div>;
}