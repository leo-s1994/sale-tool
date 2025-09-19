import HOME from '../pages/home.jsx';
import PRODUCTDETAIL from '../pages/productDetail.jsx';
import PDFVIEWER from '../pages/pdfViewer.jsx';
import ADMIN from '../pages/admin.jsx';
import PRODUCTFORM from '../pages/productForm.jsx';
export const routers = [{
  id: "home",
  component: HOME
}, {
  id: "productDetail",
  component: PRODUCTDETAIL
}, {
  id: "pdfViewer",
  component: PDFVIEWER
}, {
  id: "admin",
  component: ADMIN
}, {
  id: "productForm",
  component: PRODUCTFORM
}]