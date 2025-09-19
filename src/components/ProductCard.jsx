// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge } from '@/components/ui';
// @ts-ignore;
import { Eye, Download, Hash, Tag, Box } from 'lucide-react';

export function ProductCard({
  product,
  showPrice = false,
  onViewDetails,
  onViewPDF
}) {
  return <Card className="bg-card border-border hover:shadow-lg transition-shadow group">
      <CardHeader className="p-4 relative">
        <img src={product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop"} alt={product.model || '产品图片'} className="w-full h-48 object-cover rounded-lg" />
        {/* 产品类别徽章 */}
        {product.category && <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-primary/90 backdrop-blur-sm text-primary-foreground border-border">
              <Tag className="w-3 h-3 mr-1" />
              {product.category}
            </Badge>
          </div>}
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {/* 产品型号作为主要标题 */}
        <div>
          {product.model && <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {product.model}
            </CardTitle>}
          {/* 简化描述作为副标题 */}
          {product.short_description && <p className="text-sm text-muted-foreground mt-1">{product.short_description}</p>}
        </div>

        {/* 产品编号和供应商信息 */}
        <div className="flex flex-wrap gap-2">
          {product.product_code && <Badge variant="outline" className="text-xs">
              <Hash className="w-3 h-3 mr-1" />
              {product.product_code}
            </Badge>}
          {product.supplier && <Badge variant="outline" className="text-xs">
              <Box className="w-3 h-3 mr-1" />
              {product.supplier}
            </Badge>}
        </div>

        {/* 产品描述 */}
        {product.description && <CardDescription className="text-muted-foreground line-clamp-2 text-sm">
            {product.description}
          </CardDescription>}

        {/* 价格和操作按钮 */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex-1">
            {showPrice && <div className="space-y-1">
                <span className="text-2xl font-bold text-primary">¥{product.price}</span>
                {product.price && <p className="text-xs text-muted-foreground">含税价格</p>}
              </div>}
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={() => onViewDetails(product)} className="text-xs">
              <Eye className="w-3 h-3 mr-1" />
              详情
            </Button>
            <Button size="sm" onClick={() => onViewPDF(product)} className="text-xs">
              <Download className="w-3 h-3 mr-1" />
              PDF
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>;
}