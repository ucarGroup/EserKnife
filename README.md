# EserKnife
EserKnife 是一个Es的运维管理工具，fork自kopf，但它不是es的插件，而是独立的java应用。
## 功能
- 集成了kopf、bigdesk插件，免去插件安装的过程
- 跨集群迁移、字段映射、别名管理等索引管理工具
- 基于多个系统指标的监控报警
- 基于用户认证的集群管理功能
- 兼容es所有版本
## 截图
##### 集群管理
![](https://raw.githubusercontent.com/ucarGroup/EserKnife/master/img/cluster.png "")
##### 文档查询
![](https://raw.githubusercontent.com/ucarGroup/EserKnife/master/img/query.png "")
##### rest客户端
![](https://raw.githubusercontent.com/ucarGroup/EserKnife/master/img/rest.png "")
##### 监控
![](https://raw.githubusercontent.com/ucarGroup/EserKnife/master/img/stat1.png "")
##### 索引管理
![](https://raw.githubusercontent.com/ucarGroup/EserKnife/master/img/index_manage.png "")
##### 管理后台
![](https://raw.githubusercontent.com/ucarGroup/EserKnife/master/img/alarm.png "")
## 安装
1. 运行script中的脚本初始化数据库
2. 修改数据库配置 src/main/filters/test.properties
3. 构建war包，部署
4. 访问  http://ip:port/eserknife/login.jsp   admin/1
## 协议
MIT
