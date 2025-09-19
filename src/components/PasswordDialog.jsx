// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, Input, Button, useToast } from '@/components/ui';
// @ts-ignore;
import { Lock, X } from 'lucide-react';

export function PasswordDialog({
  open,
  onOpenChange,
  onSuccess
}) {
  const {
    toast
  } = useToast();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      // 模拟密码验证 - 实际应用中应该使用更安全的验证方式
      if (password === '123456') {
        // 默认密码，实际应用中应该从配置或数据库获取
        onSuccess();
        onOpenChange(false);
        setPassword('');
      } else {
        toast({
          title: "验证失败",
          description: "密码不正确",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "验证错误",
        description: "请重试",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setPassword('');
    onOpenChange(false);
  };
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Lock className="w-5 h-5 mr-2 text-primary" />
            价格查看权限验证
          </DialogTitle>
          <DialogDescription>
            请输入密码以查看产品价格信息
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input type="password" placeholder="请输入密码" value={password} onChange={e => setPassword(e.target.value)} required className="w-full" />
          </div>
          
          <div className="flex space-x-3 justify-end">
            <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
              <X className="w-4 h-4 mr-2" />
              取消
            </Button>
            <Button type="submit" disabled={loading || !password}>
              {loading ? '验证中...' : '确认'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>;
}