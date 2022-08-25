<template>
  <div id="editor" ref="editorDom"></div>
</template>

<script lang="ts" setup>
import { EditorView, basicSetup } from "codemirror";
import type { ViewUpdate } from "@codemirror/view";
import { EditorState, Facet } from "@codemirror/state";
import { keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { LanguageSupport } from "@codemirror/language";

const editorDom = ref(null);

const props = defineProps({
  // 编译器内的文本
  modelValue: {
    type: String,
    default: "",
  },
  // 语言模式
  language: {
    type: LanguageSupport,
    default: "css",
  },
  // 主题
  theme: {
    type: String,
    default: "vs-dark",
  },
  //宽度
  width: {
    type: String,
    default: "600px",
  },
});

const emit = defineEmits(["changeCode"]);

onMounted(() => {
  //初始化实例
  const editor = new EditorView({
    parent: editorDom.value,
    state: EditorState.create({
      doc: props.modelValue,
      extensions: [
        // basicSetup 是一套插件集合，包含了很多常用插件
        basicSetup,
        props.language,
        // 新版本一切皆插件，所以实时侦听数据变化也要通过写插件实现
        EditorView.updateListener.of((v: ViewUpdate) => {
          if (props.modelValue != v.state.doc.toString()) {
            emit("changeCode", v.state.doc.toString());
          } else {
            // console.log("数据没更新");
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
  width: v-bind(props.width);
  height: 90vh;
  transition: width 0.5s;
}
</style>
