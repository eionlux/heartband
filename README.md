# 心率实时监测（小米手环）

一个轻量的浏览器端心率监测页面，通过 **Web Bluetooth** 连接支持标准 BLE Heart Rate Service 的手环，实时显示心率、心率区间和最近的测量曲线。界面为中文，采用原生 HTML、CSS 和 JavaScript，无需安装前端依赖。

> 设备兼容性取决于手环是否向浏览器开放标准心率服务（UUID `180D`）及心率测量特征（UUID `2A37`）。小米手环不同型号和固件的行为可能不同；本项目不保证适配所有型号。

## 功能

- 使用浏览器蓝牙选择并连接附近的心率设备
- 订阅 BLE 心率测量通知，兼容 8 位和 16 位 BPM 数据
- 显示当前心率、简单心率区间、最近数据曲线和连接日志
- 支持主动断开及断连后的重新连接
- 数据仅在当前页面内用于显示，不会上传到服务器或保存为长期记录

## 运行

需要安装 Node.js（无需额外 npm 套件），并使用支持 Web Bluetooth 的桌面版 Chrome 或 Edge。浏览器必须通过安全上下文访问页面：HTTPS 或本机 `localhost`。请开启电脑蓝牙，并允许浏览器访问蓝牙设备。

```bash
node server.js
```

然后在同一台电脑上打开 [http://localhost:8668](http://localhost:8668)，点击“连接手环”，在浏览器设备选择窗口中选择手环。也可以通过 `PORT` 环境变量指定端口：

```bash
# macOS / Linux
PORT=3000 node server.js

# Windows PowerShell
$env:PORT=3000; node server.js
```

不要直接用 `file://` 打开 `index.html`。Web Bluetooth 的设备选择需要由用户点击触发；若未发现设备，请检查设备是否支持标准心率服务，以及是否已与其他应用连接。

## 代码结构

```text
heartband/
├── index.html   # 页面结构、样式与前端逻辑：蓝牙连接、心率解析、状态和曲线绘制
├── server.js    # Node.js 静态文件服务，默认监听 127.0.0.1:8668
├── img/
│   └── cat.png  # 页面背景图
└── README.md    # 项目介绍、运行说明和目录结构
```

## 技术说明

- 蓝牙服务：Heart Rate Service `0000180d-0000-1000-8000-00805f9b34fb`
- 心率特征：Heart Rate Measurement `00002a37-0000-1000-8000-00805f9b34fb`
- 页面使用浏览器 `navigator.bluetooth` API；本机服务仅提供静态文件，不接收心率数据。

## 许可

当前仓库未声明开源许可证。若要允许他人依法复用、修改或分发代码，请由项目维护者选择并添加合适的许可证。背景图片也应单独确认其使用授权。
