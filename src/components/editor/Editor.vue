<template>
  <div id="editor" ref="dom"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { EditorView, basicSetup } from "codemirror";
import { EditorState, Facet } from "@codemirror/state";
import { keymap } from "@codemirror/view";
import type { ViewUpdate } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";

const code = ref("null");
let startState = EditorState.create({
  doc: code.value,
  extensions: [keymap.of(defaultKeymap)],
});
const localValue = ref("");

onMounted(() => {
  const editor = new EditorView({
    parent: document.querySelector("#editor"),
    state: EditorState.create({
      doc: "123",
      extensions: [
        // basicSetup 是一套插件集合，包含了很多常用插件
        basicSetup,
        // 这里只使用 js 解析器
        javascript(),
        // 新版本一切皆插件，所以实时侦听数据变化也要通过写插件实现
        EditorView.updateListener.of((v: ViewUpdate) => {
          // console.log(v.state.doc.toJSON);
          if (localValue.value != v.state.doc.toString()) {
            localValue.value = v.state.doc.toString();
            console.log("数据更新了");
          } else {
            console.log("数据没更新");
          }
        }),
      ],
    }),
  });
});
</script>

<style scoped>
.editor {
  /*动态绑定宽度*/
  /* width: v-bind(props.width); */
  width: 800px;
  height: 90vh;
  transition: width 0.5s;
}
</style>
