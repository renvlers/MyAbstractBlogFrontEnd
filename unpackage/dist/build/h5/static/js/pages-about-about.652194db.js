(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-about-about","pages-card-card"],{"03a2":function(t,e,a){var n=a("84cd");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=a("4f06").default;r("1ee68910",n,!0,{sourceMap:!1,shadowMode:!1})},"3c4c":function(t,e,a){"use strict";var n=a("fbfc"),r=a.n(n);r.a},"4d02":function(t,e,a){"use strict";a("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("a9e3");var n={name:"u-image",props:{src:{type:String,default:""},mode:{type:String,default:"aspectFill"},width:{type:[String,Number],default:"100%"},height:{type:[String,Number],default:"auto"},shape:{type:String,default:"square"},borderRadius:{type:[String,Number],default:0},lazyLoad:{type:Boolean,default:!0},showMenuByLongpress:{type:Boolean,default:!0},loadingIcon:{type:String,default:"photo"},errorIcon:{type:String,default:"error-circle"},showLoading:{type:Boolean,default:!0},showError:{type:Boolean,default:!0},fade:{type:Boolean,default:!0},webp:{type:Boolean,default:!1},duration:{type:[String,Number],default:500},bgColor:{type:String,default:"#f3f4f6"}},data:function(){return{isError:!1,loading:!0,opacity:1,durationTime:this.duration,backgroundStyle:{}}},watch:{src:{immediate:!0,handler:function(t){t?(this.isError=!1,this.loading=!0):(this.isError=!0,this.loading=!1)}}},computed:{wrapStyle:function(){var t={};return t.width=this.$u.addUnit(this.width),t.height=this.$u.addUnit(this.height),t.borderRadius="circle"==this.shape?"50%":this.$u.addUnit(this.borderRadius),t.overflow=this.borderRadius>0?"hidden":"visible",this.fade&&(t.opacity=this.opacity,t.transition="opacity ".concat(Number(this.durationTime)/1e3,"s ease-in-out")),t}},methods:{onClick:function(){this.$emit("click")},onErrorHandler:function(t){this.loading=!1,this.isError=!0,this.$emit("error",t)},onLoadHandler:function(){var t=this;if(this.loading=!1,this.isError=!1,this.$emit("load"),!this.fade)return this.removeBgColor();this.opacity=0,this.durationTime=0,setTimeout((function(){t.durationTime=t.duration,t.opacity=1,setTimeout((function(){t.removeBgColor()}),t.durationTime)}),50)},removeBgColor:function(){this.backgroundStyle={backgroundColor:"transparent"}}}};e.default=n},"500e":function(t,e,a){"use strict";a.r(e);var n=a("a0a3"),r=a.n(n);for(var i in n)["default"].indexOf(i)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(i);e["default"]=r.a},"550e":function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,".card[data-v-3d96e2b2]{border:1px solid #ccc;border-radius:8px;padding:16px;margin:8px;box-shadow:0 2px 4px rgba(0,0,0,.1); /* 添加阴影效果 */transition:box-shadow .3s ease /* 添加阴影变化的过渡效果 */}.card[data-v-3d96e2b2]:hover{box-shadow:0 4px 8px rgba(0,0,0,.2) /* 鼠标悬停时增加阴影效果 */}.card-header[data-v-3d96e2b2]{font-size:18px;font-weight:700;margin-bottom:8px}.card-content[data-v-3d96e2b2]{font-size:16px;margin-bottom:16px}.card-footer[data-v-3d96e2b2]{font-size:14px;color:#666}",""]),t.exports=e},"5ee4":function(t,e,a){"use strict";a.r(e);var n=a("92e8"),r=a("d0d0");for(var i in r)["default"].indexOf(i)<0&&function(t){a.d(e,t,(function(){return r[t]}))}(i);a("8567"),a("3c4c");var o=a("f0c5"),d=Object(o["a"])(r["default"],n["b"],n["c"],!1,null,"3d96e2b2",null,!1,n["a"],void 0);e["default"]=d.exports},6602:function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.u-image[data-v-722e0642]{position:relative;transition:opacity .5s ease-in-out}.u-image__image[data-v-722e0642]{width:100%;height:100%}.u-image__loading[data-v-722e0642], .u-image__error[data-v-722e0642]{position:absolute;top:0;left:0;width:100%;height:100%;display:flex;flex-direction:row;align-items:center;justify-content:center;background-color:#f3f4f6;color:#909399;font-size:%?46?%}',""]),t.exports=e},"6e6f":function(t,e,a){"use strict";a.r(e);var n=a("9b66"),r=a("ae8a5");for(var i in r)["default"].indexOf(i)<0&&function(t){a.d(e,t,(function(){return r[t]}))}(i);a("d75b");var o=a("f0c5"),d=Object(o["a"])(r["default"],n["b"],n["c"],!1,null,"722e0642",null,!1,n["a"],void 0);e["default"]=d.exports},"84cd":function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.wrap[data-v-0803b914]{padding:%?24?%}.u-row[data-v-0803b914]{margin:%?40?% 0}.demo-layout[data-v-0803b914]{height:%?80?%;border-radius:%?8?%}.bg-purple[data-v-0803b914]{background:#d3dce6}.bg-purple-light[data-v-0803b914]{background:#e5e9f2}.bg-purple-dark[data-v-0803b914]{background:#99a9bf}',""]),t.exports=e},8567:function(t,e,a){"use strict";var n=a("f4ea"),r=a.n(n);r.a},"92e8":function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){}));var n=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card"},[e("div",{staticClass:"card-header"},[this._v(this._s(this.title))]),e("div",{staticClass:"card-content"},[this._t("default")],2),e("div",{staticClass:"card-footer"},[this._v(this._s(this.footer))])])},r=[]},"9b66":function(t,e,a){"use strict";a.d(e,"b",(function(){return r})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){return n}));var n={uIcon:a("c0bc").default},r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"u-image",style:[t.wrapStyle,t.backgroundStyle],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClick.apply(void 0,arguments)}}},[t.isError?t._e():a("v-uni-image",{staticClass:"u-image__image",style:{borderRadius:"circle"==t.shape?"50%":t.$u.addUnit(t.borderRadius)},attrs:{src:t.src,mode:t.mode,"lazy-load":t.lazyLoad,"show-menu-by-longpress":t.showMenuByLongpress},on:{error:function(e){arguments[0]=e=t.$handleEvent(e),t.onErrorHandler.apply(void 0,arguments)},load:function(e){arguments[0]=e=t.$handleEvent(e),t.onLoadHandler.apply(void 0,arguments)}}}),t.showLoading&&t.loading?a("v-uni-view",{staticClass:"u-image__loading",style:{borderRadius:"circle"==t.shape?"50%":t.$u.addUnit(t.borderRadius),backgroundColor:this.bgColor}},[t.$slots.loading?t._t("loading"):a("u-icon",{attrs:{name:t.loadingIcon,width:t.width,height:t.height}})],2):t._e(),t.showError&&t.isError&&!t.loading?a("v-uni-view",{staticClass:"u-image__error",style:{borderRadius:"circle"==t.shape?"50%":t.$u.addUnit(t.borderRadius)}},[t.$slots.error?t._t("error"):a("u-icon",{attrs:{name:t.errorIcon,width:t.width,height:t.height}})],2):t._e()],1)},i=[]},a0a3:function(t,e,a){"use strict";a("7a82");var n=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n(a("5ee4")),i=n(a("10aa")),o=n(a("4ec9")),d={components:{Card:r.default},onLoad:function(){uni.setNavigationBarTitle({title:this.translations.关于})},data:function(){return{src:"https://ts3.cn.mm.bing.net/th?id=OIP-C._tHrVEicLiuuAFW_zLGzfQHaEf&w=321&h=194&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",translations:"en-US"===this.language?o.default:i.default}},methods:{}};e.default=d},aa69:function(t,e,a){"use strict";a.d(e,"b",(function(){return r})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){return n}));var n={uImage:a("6e6f").default,uCellGroup:a("fa45").default,uCellItem:a("9908").default},r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"global-view",class:{"dark-theme":t.darkTheme}},[a("v-uni-view",{staticClass:"container"},[a("u-image",{attrs:{width:"100%","border-radius":"5",height:"400rpx",src:t.src}}),a("v-uni-view",{staticClass:"u-m-t-20"},[a("u-cell-group",[a("u-cell-item",{attrs:{title:t.translations.当前版本,value:"V 1.0",arrow:!1}}),a("u-cell-item",{attrs:{title:t.translations.版本更新,value:t.translations.已是最新版本,arrow:!1}}),a("u-cell-item",{attrs:{title:t.translations.功能介绍}}),a("u-cell-item",{attrs:{title:t.translations.帮助}}),a("u-cell-item",{attrs:{title:t.translations.反馈}})],1)],1)],1)],1)},i=[]},ae8a5:function(t,e,a){"use strict";a.r(e);var n=a("4d02"),r=a.n(n);for(var i in n)["default"].indexOf(i)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(i);e["default"]=r.a},c007:function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,".card[data-v-3d96e2b2]{border:1px solid #ccc;border-radius:8px;padding:16px;margin:8px;box-shadow:0 2px 4px rgba(0,0,0,.1);width:80%}.card-header[data-v-3d96e2b2]{font-size:18px;font-weight:700;margin-bottom:8px}.card-content[data-v-3d96e2b2]{font-size:16px;margin-bottom:16px}.card-footer[data-v-3d96e2b2]{font-size:14px;color:#666}",""]),t.exports=e},cd40:function(t,e,a){var n=a("6602");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=a("4f06").default;r("f94ff7dc",n,!0,{sourceMap:!1,shadowMode:!1})},cfc1:function(t,e,a){"use strict";var n=a("03a2"),r=a.n(n);r.a},d0d0:function(t,e,a){"use strict";a.r(e);var n=a("e756"),r=a.n(n);for(var i in n)["default"].indexOf(i)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(i);e["default"]=r.a},d75b:function(t,e,a){"use strict";var n=a("cd40"),r=a.n(n);r.a},e756:function(t,e,a){"use strict";a("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{title:String,footer:String}};e.default=n},f4ea:function(t,e,a){var n=a("550e");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=a("4f06").default;r("5999cf90",n,!0,{sourceMap:!1,shadowMode:!1})},fbfc:function(t,e,a){var n=a("c007");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=a("4f06").default;r("7ce44379",n,!0,{sourceMap:!1,shadowMode:!1})},fd5d:function(t,e,a){"use strict";a.r(e);var n=a("aa69"),r=a("500e");for(var i in r)["default"].indexOf(i)<0&&function(t){a.d(e,t,(function(){return r[t]}))}(i);a("cfc1");var o=a("f0c5"),d=Object(o["a"])(r["default"],n["b"],n["c"],!1,null,"0803b914",null,!1,n["a"],void 0);e["default"]=d.exports}}]);