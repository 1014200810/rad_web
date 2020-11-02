<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: 葛璐豪
 * @Date: 2020-10-04 21:55:47
 * @LastEditors: Seven
 * @LastEditTime: 2020-10-06 15:51:49
-->
# vue项目搭建

## vue命令行创建

- vue create .   //当前文件夹创建vue项目
- 选择Mannually select features 
- 常用:Router(路由,跳转页面)、Vuex 、 CSS Pre-processiors 、Linter
- 不选择history
- 选择node-sass
- ESlint 代码检测工具 
- 选择fix and on commit 检测git时是否规范
- 选择in dedicated config files 配置文件放在单独文件中
- 不保存当前配置
- vue add element-ui  //饿了么开发的前端
框架
- npm i normalize.css //使得浏览器统一css
## vue项目结构

### 外层
- .browserslistrc 浏览器配置文件
- .editcorconfig 编辑器配置文件
- .eslintrc.js 代码检测配置文件
- .env  通用配置文件 一般是api调用接口
### Src
- assets 资源文件
   1.icons  svg
   2.images 
   3.style css
- views 视图
- components 组件 放可重用组件
### public
- index.html 主页面
- favicon.ico 网页图标