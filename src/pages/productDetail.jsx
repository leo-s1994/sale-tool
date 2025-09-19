// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, useToast, Badge, Separator } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Download, Hash, Tag, Box, FileText, Info } from 'lucide-react';

// 模拟产品数据 - 更新为包含所有新字段的数据结构
const mockProducts = {
  1: {
    id: 1,
    product_code: 'PROD-1A2B3C4D',
    name: '高端服务器',
    supplier: '戴尔科技',
    category: '服务器',
    model: 'PowerEdge R750',
    description: '企业级服务器，支持高并发处理，适用于大型数据中心。采用最新处理器技术，提供卓越的性能和可靠性。',
    short_description: '高性能企业级服务器',
    price: 29999,
    image: 'https://images.unsplash.com/photo-1563014959-7aaa83350992?w=600&h=400&fit=crop',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    specifications: ['处理器: Intel Xeon Gold 6338', '内存: 256GB DDR4', '存储: 4TB SSD', '网络: 双万兆网卡'],
    notes: '支持热插拔硬盘，提供3年原厂保修服务',
    related_products: ['2', '3']
  },
  2: {
    id: 2,
    product_code: 'PROD-2E3F4G5H',
    name: '网络交换机',
    supplier: '华为',
    category: '网络设备',
    model: 'S5720-52X-EI-24S',
    description: '千兆以太网交换机，24端口，支持PoE功能，适合中小型企业网络部署。',
    short_description: '24口千兆PoE交换机',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=400&fit=crop',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    specifications: ['端口: 24×千兆电口 + 4×SFP', 'PoE: 支持', '交换容量: 256Gbps', '包转发率: 95Mpps'],
    notes: '支持VLAN划分和QoS功能',
    related_products: ['1']
  },
  3: {
    id: 3,
    product_code: 'PROD-3I4J5K6L',
    name: '存储设备',
    supplier: '群晖',
    category: '存储设备',
    model: 'DS1821+',
    description: 'NAS网络存储解决方案，支持多用户同时访问，数据备份和恢复功能完善。',
    short_description: '8盘位NAS网络存储',
    price: 15999,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=400&fit=crop',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    specifications: ['容量: 16TB (可扩展)', '接口: 双千兆网口', 'RAID: 支持多种RAID级别', '用户数: 支持50+并发用户'],
    notes: '支持SSD缓存加速，内置备份软件',
    related_products: ['1', '2']
  }
};
export default function ProductDetail(props) {
  const {
    $w,
    style
  } = props;
  const {
    toast
  } = useToast();
  const productId = $w.page.dataset.params?.productId;
  const product = mockProducts[productId];
  const handleViewPDF = () => {
    if (product && product.pdf_url) {
      $w.utils.navigateTo({
        pageId: 'pdfViewer',
        params: {
          pdfUrl: product.pdf_url,
          productName: product.name
        }
      });
    } else {
      toast({
        title: "错误",
        description: "该产品暂无PDF文档",
        variant: "destructive"
      });
    }
  };
  const handleBack = () => {
    $w.utils.navigateBack();
  };
  if (!product) {
    return <div style={style} className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">产品不存在</p>
          <Button onClick={handleBack} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
        </div>
      </div>;
  }
  return <div style={style} className="min-h-screen bg-background">
      {/* 头部 */}
      <div className="bg-card border-b border-border p-4">
        <div className="max-w-6xl mx-auto flex items-center space-x-4">
          <Button variant="ghost" onClick={handleBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{product.name}</h1>
            {product.model && <p className="text-muted-foreground mt-1">{product.model}</p>}
          </div>
          {product.product_code && <Badge variant="secondary" className="ml-auto">
              <Hash className="w-4 h-4 mr-1" />
              {product.product_code}
            </Badge>}
        </div>
      </div>

      {/* 产品详情内容 */}
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 产品图片 */}
          <div className="space-y-4">
            <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-lg shadow-lg" />
            
            {/* 基础信息卡片 */}
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2 text-primary" />
                产品基本信息
              </h3>
              
              <div className="space-y-3">
                {product.category && <div className="flex items-center">
                    <Tag className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">分类: </span>
                    <Badge variant="outline" className="ml-2">{product.category}</Badge>
                  </div>}
                
                {product.supplier && <div className="flex items-center">
                    <Box className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">供应商: </span>
                    <span className="text-foreground ml-2">{product.supplier}</span>
                  </div>}
                
                {product.short_description && <div className="pt-2">
                    <p className="text-muted-foreground text-sm">{product.short_description}</p>
                  </div>}
              </div>
            </div>
          </div>

          {/* 产品详细信息 */}
          <div className="space-y-6">
            {/* 价格和描述 */}
            <div className="space-y-4">
              <div>
                <h2 className="text-3xl font-bold text-primary">¥{product.price}</h2>
                <p className="text-muted-foreground mt-2">{product.description}</p>
              </div>

              <Separator />

              {/* 技术规格 */}
              {product.specifications && product.specifications.length > 0 && <div>
                  <h3 className="text-lg font-semibold mb-4">技术规格</h3>
                  <ul className="space-y-2">
                    {product.specifications.map((spec, index) => <li key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                          <span className="text-foreground">{spec}</span>
                        </li>)}
                  </ul>
                </div>}

              {/* 备注信息 */}
              {product.notes && <div className="pt-4">
                  <h3 className="text-lg font-semibold mb-3">备注信息</h3>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-foreground text-sm">{product.notes}</p>
                  </div>
                </div>}

              {/* 操作按钮 */}
              <div className="flex space-x-4 pt-6">
                <Button onClick={handleViewPDF} className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  查看PDF文档
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 关联产品信息 */}
        {product.related_products && product.related_products.length > 0 && <div className="pt-8">
            <Separator />
            <div className="pt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                关联产品
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.related_products.map(relatedId => {
              const relatedProduct = mockProducts[relatedId];
              return relatedProduct ? <div key={relatedId} className="bg-card p-4 rounded-lg border border-border hover:border-primary transition-colors">
                        <h4 className="font-medium text-foreground">{relatedProduct.name}</h4>
                        {relatedProduct.model && <p className="text-sm text-muted-foreground mt-1">{relatedProduct.model}</p>}
                        {relatedProduct.short_description && <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{relatedProduct.short_description}</p>}
                      </div> : null;
            })}
              </div>
            </div>
          </div>}
      </div>
    </div>;
}