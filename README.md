# 【框架】itera-cli：项目迭代一体化工程框架（总纲）

## 介绍

### 一、itera-cli 是什么

-------------------

itera (读音 /ɪtəˈreɪ/) 基于webpack，是一套用于项目迭代的工程式框架。与其它框架不同的是，itera-cli自身封装的一套继承体系并着重用于项目的迭代，既有着导入模块的es6思想，也开放着第三方插件或库的静态引入。
itera-cli将项目模块化，又模块化项目，它不依赖于任何业务，更可多端开发。
itera-cli有着严重的技能三级分化：

 1. 【初阶】：针对于项目/业务开发的工程师，门槛低，通过简单的配置项以及html+css+js的基础知识即可即学即用。

> [【快速入口】itera-cli（初阶教程）](https://blog.csdn.net/mcky_love/article/details/79760782 "【快速入口】itera-cli（初阶入门）")

 2. 【中阶】：针对于需求扩展性的研发，修改导入的文件或对不满足的需求进行扩展配置项、钩子等。

> [【快速入口】itera-cli（中阶教程）](https://blog.csdn.net/mcky_love/article/details/79760782 "【快速入口】itera-cli（中阶教程）")

 3. 【高阶】：针对插件、命令指示符、版本等底层的研发/维护。

> [【快速入口】itera-cli（高阶教程）](https://blog.csdn.net/mcky_love/article/details/79760782 "【快速入口】itera-cli（高阶教程）")

无论是成本较低的初创型公司或偏向于集成式管理的大型公司，我相信 - 这都是个不错的选择。

-------------------

### 二、优势

-------------------

 1. **0业务挂钩**
 2. **定制化构建工程**（> 通过丰富的配置项生成项目）
 3. **门槛低**（> 有一定html基础即可维护开发）
 4. **更优的维护性，更低的维护成本**（> [路由/js/模板]名称一致）
 5. **更严密的过程钩子**（> 包含页面的生命周期以及每个模块的渲染过程）
 6. **更高的扩展性**（> 开发中依然可修改配置项进行扩展**或构建**）
 7. ......

-------------------

### 三、简单的技术栈

-------------------

 1. h5+c3+es6
 2. webpack
 3. node（插件方向）
 4. layui（默认ui库，可自定义）
 5. jq以及jq插件
 6. artTemplate
 7. echarts、map、excel等（根据业务自定义添加）

> “配置项、路由”这类方面皆为js封装。
> “脚手架、插件、命令行”等详细的技术栈暂未提及，此类到高阶再谈。

-------------------

### 四、兼容性

-------------------

itera-cli不支持IE9以下版本
>**IE9 ~ IE11/Edge范围内，模板只能使用es5语法**

-------------------

## 起步

### 一、npm安装

-------------------

在用itera-cli构建大型工程时，推荐yarn、cnpm安装。

> cnpm install itera-cli -g

输入

> itera -v

![命令指示符](http://img.blog.csdn.net/20180409101917251?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvTWNreV9Mb3Zl/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

显示版本号即为正常

-------------------

### 二、迭代框架构建（cli）

-------------------

itera-cli提供了命令行工具，可用于快速搭建繁多的大型工程。
该工具为现代化的前端开发工作流提供了开箱即用的构建配置。只需几分钟即可创建并启动一个带热重载、保存时静态检查以及可用于生产环境的构建配置的项目：

> itera init demo

他会有一些询问（类似于Vue），回车即可。

> cd demo

安装依赖（推荐cnpm、yarn）

> yarn

-------------------

### 三、初窥项目

-------------------

itera-cli中内置了一个“chanyejiance”的项目，可用于测试以及查看，所以直接来看看效果吧！

> npm run auto

构建项目并生成底层配置项。

> npm run json

构建项目并生成依赖。

> npm run start

跑服务，走你！

![开发登录面](http://img.blog.csdn.net/20180409104312736?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvTWNreV9Mb3Zl/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

> 这其实可用一行命令来完成上三句 “npm run dev” 但速度偏慢，不建议使用。

服务成功跑起后，这就是开发的界面了，如今已有了一个项目“产业监测”> 点击进入

![开发界面](http://img.blog.csdn.net/20180409104456394?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvTWNreV9Mb3Zl/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

当前开发环境在IE9下，试试打包。

> npm run chanyejiance

![打包界面](http://img.blog.csdn.net/20180409104724107?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvTWNreV9Mb3Zl/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

目录下生成dist文件，打开其中的index.html页面，效果一致，完成。

-------------------

#### 如何配置项目，如何开发项目？请移步至三级分化教程。


> [1、【快速入口】itera-cli（初阶教程）](https://blog.csdn.net/mcky_love/article/details/79760782 "【快速入口】itera-cli（初阶入门）")

> [2、【快速入口】itera-cli（中阶教程）](https://blog.csdn.net/mcky_love/article/details/79760782 "【快速入口】itera-cli（中阶教程）")

> [3、【快速入口】itera-cli（高阶教程）](https://blog.csdn.net/mcky_love/article/details/79760782 "【快速入口】itera-cli（高阶教程）")

-------------------

## 关于

make：o︻そ╆OVE▅▅▅▆▇◤（清一色天空）

blog：http://blog.csdn.net/mcky_love

掘金：https://juejin.im/user/59fbe6c66fb9a045186a159a/posts

github：https://github.com/gs3170981/webpack_artTemplate.git

-------------------

