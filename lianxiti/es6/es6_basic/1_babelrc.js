//.babelrc详解
// {
//   "presets": [],//存放的是，编译代码时候需要依赖的语言解析包
//   "plugins": []//存放的是，编译代码时候需要依赖的插件信息
// }


/**
 * 安装依赖的语言解析包
  在当前项目的根目录下安装（不是安装在全局）
  npm install --save-dev babel-preset-latest  安装已经发布的语言标准解析模块
  npm install --save-dev babel-preset-stage-2  安装当前还没有发布，但是已经进入草案的

  {
    "presets": [
      "latest",
      "react",
      "stage-2"
    ],
    "plugins": []
  }

  # babel es6 -d es5
  # babel es6/1.js -o es5/1_es.js
  # babel es6 -d es5 -w
 */