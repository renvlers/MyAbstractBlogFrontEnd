# bctos-rich-editor 介绍

bctos-rich-editor是tinymce最新的5.10版本基础开发，主要扩展实现图片和视频上传到uniCloud的云存储中。

特别是视频上传部分，官网和网上的方案都是通过虚拟一个input按钮然后通过表单的方式上传，并不适用于云存储的上传参数要求。

研究了很久最终发现其实uniCloud提供了chooseAndUploadFile接口可以简单而且完美解决tinymce的文件上传问题（不局限于视频）。


### 前端富文本组件说明

本编辑器编辑的内容，建议使用我另一个插件 [bctos-rich-text](https://ext.dcloud.net.cn/plugin?id=6712) 解析，它能解决rich-text组件不支持视频播放和图片宽度超出手机显示界面的问题。

它能在小程序里完美实现视频与图文混排展示

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-042c6b2e-63dd-4fe1-b729-b6327b68450a/df3588f1-bc52-42ed-9c25-87771d48cbe6.png)

### 安装方式

本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，`HBuilderX 2.5.5`起，只需将本组件导入项目，在页面`template`中即可直接使用，无需在页面中`import`和注册`components`。

### 基本用法

设置 `v-model` 属性后，组件会自动初始化内容并显示出编辑器界面

```html
<template>
      <uni-forms-item name="content" label="产品介绍">
        <bctos-rich-editor v-model="content" />
      </uni-forms-item>
</template>

```

```javascript

export default {
	data() { 
		return {
			content: `<p>这里是内容段落一，下面放置了第一个视频</p><br>
			<p><video controls="controls">
			<source src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-042c6b2e-63dd-4fe1-b729-b6327b68450a/d906ba15-9041-4137-bc3f-44a413c855e0.mp4" type="video/mp4" /></video></p><br>
			<p>这里是内容段落二，下面放置了第二个视频</p><br>
			<p><video controls="controls">
			<source src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-042c6b2e-63dd-4fe1-b729-b6327b68450a/ae4a89d7-5c7e-48d2-b6f9-0da5c848bbda.mp4" type="video/mp4" /></video></p><br>
			<p>后面其它更多内容...</p>`,
		}
	}
}
```


## API

### bctos-rich-text Props

| 属性名| 类型				|必填	| 默认值	| 说明		|
| :-:	| :-:				|:-:	|:-:		| :-:		|
|v-model| String			|否		|-			| 富文本内容|
|id		| String			|否		|自动随机值	| 编辑器ID	|
|height	| String 或 Number	|否		|360		| 高度		|
|width	| String 或 Number	|否		|auto		| 宽度		|

## 参考资料

[tinymce中文文档](http://tinymce.ax-z.cn/)
[tian-article-admin插件](https://ext.dcloud.net.cn/plugin?name=tian-article-admin)

## 更多帮助

如果还想扩展其它功能，欢迎联系定制开发：QQ: 203163051