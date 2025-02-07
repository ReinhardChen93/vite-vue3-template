// 声明文件 告诉引入.vue文件的类型是什么

declare module '*.vue' {
  import type { DefineComponent } from 'vue'; //* 定义组件
  const component: DefineComponent <{}, {}, any>; //* 定义组件类型

  export default component;
}