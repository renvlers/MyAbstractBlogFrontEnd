(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-login"],{"043a":function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){}));var n=function(){var t=this.$createElement,e=this._self._c||t;return e("v-uni-view",{staticClass:"u-form"},[this._t("default")],2)},o=[]},"0b9b":function(t,e,a){"use strict";a.r(e);var n=a("50e1"),o=a.n(n);for(var i in n)["default"].indexOf(i)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(i);e["default"]=o.a},2591:function(t,e,a){"use strict";(function(t){a("7a82");var n=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(a("10aa")),i=n(a("4ec9")),r={data:function(){return{show:!1,validateForm:{user:{mail:"",password:""}},rules:{mail:[{required:!0,message:"请输入邮箱!",trigger:"blur"}],password:[{required:!0,message:"请输入密码!",trigger:"blur"}]},translations:"en-US"===this.language?i.default:o.default}},computed:{inputStyle:function(){var t={};return this.validateForm.user.mail&&(t.color="#fff",t.backgroundColor=this.$u.color["warning"]),t}},onReady:function(){this.$refs.validateFormRef.setRules(this.rules)},onLoad:function(){uni.setNavigationBarTitle({title:this.translations.登录}),this.darkTheme?uni.setNavigationBarColor({frontColor:"#ffffff",backgroundColor:"#2a2a2a"}):uni.setNavigationBarColor({frontColor:"#000000",backgroundColor:"#f8f8f8"})},onShow:function(){},methods:{toRegister:function(){uni.navigateTo({url:"/pages/user/register/register"})},login:function(){var e=this;this.$refs.validateFormRef.validate((function(a){a&&uni.request({url:"/api/user/login",data:{email:e.validateForm.user.mail,password:e.validateForm.user.password},method:"GET",timeout:5e3,success:function(a){t("log","res:",a," at pages/login/login.vue:107"),"登录成功"==a.data.message&&200===a.data.code?(uni.setStorageSync("user",a.data.data),uni.switchTab({url:"/pages/profile/profile",success:function(t){uni.$emit("loginSuccess",t.data.data)},fail:function(e){t("error","导航错误:",e," at pages/login/login.vue:116")}})):"用户不存在"===a.data.message||"密码错误"===a.data.message?e.$u.toast("用户名或密码错误"):e.$u.toast("网络错误")},fail:function(a){t("log",a," at pages/login/login.vue:127"),e.$u.toast("网络错误")}})}))},forget:function(){uni.navigateTo({url:"/pages/forget/forget"})}}};e.default=r}).call(this,a("0de9")["log"])},"462a":function(t,e,a){"use strict";a.r(e);var n=a("043a"),o=a("0b9b");for(var i in o)["default"].indexOf(i)<0&&function(t){a.d(e,t,(function(){return o[t]}))}(i);a("f6fc");var r=a("f0c5"),s=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,"48f01182",null,!1,n["a"],void 0);e["default"]=s.exports},"50e1":function(t,e,a){"use strict";a("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("a9e3"),a("d81d"),a("d3b7"),a("14d9"),a("c975");var n={name:"u-form",props:{model:{type:Object,default:function(){return{}}},errorType:{type:Array,default:function(){return["message","toast"]}},borderBottom:{type:Boolean,default:!0},labelPosition:{type:String,default:"left"},labelWidth:{type:[String,Number],default:90},labelAlign:{type:String,default:"left"},labelStyle:{type:Object,default:function(){return{}}}},provide:function(){return{uForm:this}},data:function(){return{rules:{}}},created:function(){this.fields=[]},methods:{setRules:function(t){this.rules=t},resetFields:function(){this.fields.map((function(t){t.resetField()}))},validate:function(t){var e=this;return new Promise((function(a){var n=!0,o=0,i=[];e.fields.map((function(r){r.validation("",(function(r){r&&(n=!1,i.push(r)),++o===e.fields.length&&(a(n),-1===e.errorType.indexOf("none")&&e.errorType.indexOf("toast")>=0&&i.length&&e.$u.toast(i[0]),"function"==typeof t&&t(n))}))}))}))}}};e.default=n},"54f1":function(t,e,a){"use strict";a.r(e);var n=a("b1e7"),o=a("9dcf");for(var i in o)["default"].indexOf(i)<0&&function(t){a.d(e,t,(function(){return o[t]}))}(i);a("800d");var r=a("f0c5"),s=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,"69956ea0",null,!1,n["a"],void 0);e["default"]=s.exports},"800d":function(t,e,a){"use strict";var n=a("dbc0"),o=a.n(n);o.a},"94f5":function(t,e,a){var n=a("a2f2");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=a("4f06").default;o("2b7bb967",n,!0,{sourceMap:!1,shadowMode:!1})},"9dcf":function(t,e,a){"use strict";a.r(e);var n=a("2591"),o=a.n(n);for(var i in n)["default"].indexOf(i)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(i);e["default"]=o.a},a2f2:function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */',""]),t.exports=e},b1e7:function(t,e,a){"use strict";a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){return n}));var n={uForm:a("462a").default,uFormItem:a("eadc").default,uInput:a("dcbd").default},o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"global-view wrap",class:{"dark-theme":t.darkTheme}},[a("v-uni-view",{staticClass:"container"},[a("v-uni-view",{staticClass:"content"},[a("v-uni-view",{staticClass:"title"},[t._v(t._s(t.translations.登录)+" BLOG")]),a("u-form",{ref:"validateFormRef",attrs:{model:t.validateForm.user}},[a("u-form-item",{attrs:{label:t.translations.邮箱,prop:"mail","border-bottom":!1}},[a("u-input",{staticClass:"input-box",attrs:{placeholder:""},model:{value:t.validateForm.user.mail,callback:function(e){t.$set(t.validateForm.user,"mail",e)},expression:"validateForm.user.mail"}})],1),a("u-form-item",{attrs:{label:t.translations.密码,prop:"password","border-bottom":!1}},[a("u-input",{staticClass:"input-box",attrs:{type:"password",placeholder:""},model:{value:t.validateForm.user.password,callback:function(e){t.$set(t.validateForm.user,"password",e)},expression:"validateForm.user.password"}})],1)],1),a("v-uni-button",{staticClass:"green-button",staticStyle:{"margin-top":"20rpx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.login()}}},[t._v(t._s(t.translations.登录))]),a("v-uni-view",{staticClass:"alternative"},[a("v-uni-view",{staticClass:"password",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toRegister()}}},[t._v(t._s(t.translations.注册))]),a("v-uni-view",{staticClass:"issue",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.forget()}}},[t._v(t._s(t.translations.忘记密码))])],1)],1)],1)],1)},i=[]},cf54:function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-69956ea0]{background-color:#fff}body.?%PAGE?%[data-v-69956ea0]{background-color:#fff}.input-box[data-v-69956ea0]{background-color:#fff;border-radius:%?10?%;box-shadow:%?0?% %?0?% %?10?% rgba(0,0,0,.1)}.wrap[data-v-69956ea0]{font-size:%?28?%}.wrap .content[data-v-69956ea0]{width:%?600?%;margin:%?80?% auto 0}.wrap .content .title[data-v-69956ea0]{text-align:center;font-size:%?60?%;font-weight:400;margin-bottom:%?40?%}.wrap .content uni-input[data-v-69956ea0]{text-align:left;margin-bottom:%?10?%;padding-bottom:%?6?%}.wrap .content .text[data-v-69956ea0]{text-align:center}.wrap .content .tips[data-v-69956ea0]{color:#909399;margin-bottom:%?60?%;margin-top:%?8?%}.wrap .content .loginBtn[data-v-69956ea0]{margin-top:%?60?%;background-color:#fdf3d0;color:#909399;border:none;font-size:%?30?%;padding:%?12?% 0}.wrap .content .loginBtn[data-v-69956ea0]::after{border:none}.wrap .content .alternative[data-v-69956ea0]{color:#909399;display:flex;justify-content:space-between;margin-top:%?30?%}.wrap .buttom .loginType[data-v-69956ea0]{display:flex;padding:%?350?% %?150?% %?150?% %?150?%;justify-content:space-between}.wrap .buttom .loginType .item[data-v-69956ea0]{display:flex;flex-direction:column;align-items:center;color:#606266;font-size:%?28?%}.wrap .buttom .hint[data-v-69956ea0]{padding:%?20?% %?40?%;font-size:%?20?%;color:#909399}.wrap .buttom .hint .link[data-v-69956ea0]{color:#f90}',""]),t.exports=e},dbc0:function(t,e,a){var n=a("cf54");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=a("4f06").default;o("4b04f82c",n,!0,{sourceMap:!1,shadowMode:!1})},f6fc:function(t,e,a){"use strict";var n=a("94f5"),o=a.n(n);o.a}}]);