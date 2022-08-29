<template>
  <div ref="editorDom" class="h-full" :style="`width:${props.width}px`"></div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { EditorView, basicSetup } from "codemirror";
import type { ViewUpdate } from "@codemirror/view";
import { EditorState, Facet } from "@codemirror/state";
import { Extension } from "@codemirror/state";
import { keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { LanguageSupport } from "@codemirror/language";
import { syntaxHighlighting } from "@codemirror/language";
import { projectTheme } from "./theme/projectTheme";
import { projectHighlightStyle } from "./theme/projectHighlightStyle";

import { javascriptLanguage } from "@codemirror/lang-javascript";
import { syntaxTree } from "@codemirror/language";

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
    type: Object as PropType<Extension>,
    default: projectTheme,
  },
  //宽度
  width: {
    type: Number,
    default: 600,
  },
});

const emit = defineEmits(["changeCode"]);

const completePropertyAfter = ["PropertyName", ".", "?."];
const dontCompleteIn = [
  "TemplateString",
  "LineComment",
  "BlockComment",
  "VariableDefinition",
  "PropertyDefinition",
];

function completeFromGlobalScope(context: any) {
  let nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1);

  if (
    completePropertyAfter.includes(nodeBefore.name) &&
    nodeBefore.parent?.name == "MemberExpression"
  ) {
    let object = nodeBefore.parent.getChild("Expression");
    if (object?.name == "VariableName") {
      let from = /\./.test(nodeBefore.name) ? nodeBefore.to : nodeBefore.from;
      let variableName = context.state.sliceDoc(object.from, object.to);
      if (typeof window[variableName] == "object")
        return completeProperties(from, window[variableName]);
    }
  } else if (nodeBefore.name == "VariableName") {
    return completeProperties(nodeBefore.from, window);
  } else if (context.explicit && !dontCompleteIn.includes(nodeBefore.name)) {
    return completeProperties(context.pos, window);
  }
  return null;
}
function completeProperties(from: number, object: Object) {
  let options = [];
  for (let name in object) {
    options.push({
      label: name,
      type: typeof object[name] == "function" ? "function" : "variable",
    });
  }
  return {
    from,
    options,
    validFor: /^[\w$]*$/,
  };
}
const globalJavaScriptCompletions = javascriptLanguage.data.of({
  autocomplete: completeFromGlobalScope,
});

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
        globalJavaScriptCompletions,
        // oneDarkTheme,
        projectTheme,
        syntaxHighlighting(projectHighlightStyle),
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

<style>
.ͼ1.cm-editor {
  height: 100%;
}
</style>
