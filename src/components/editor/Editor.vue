<template>
  <div
    ref="editorDom"
    :class="`h-full`"
    :style="`width:${width}px;font-family: JetBrainsMono;`"
  ></div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { EditorView } from "codemirror";
import type { ViewUpdate } from "@codemirror/view";
import { EditorState, Facet } from "@codemirror/state";
import { Extension } from "@codemirror/state";
import { foldAll, LanguageSupport } from "@codemirror/language";
import { Theme } from "./theme/projectTheme";
import { basicSetup, emmetKeyMap } from "./setup";
import { javascriptLanguage } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { syntaxTree } from "@codemirror/language";
import { abbreviationTracker } from "@emmetio/codemirror6-plugin";
const props = defineProps({
  // 编译器内的文本
  modelValue: {
    type: String,
    default: "",
  },
  // 语言模式
  language: {
    type: LanguageSupport,
    default: javascriptLanguage,
  },
  // 主题
  theme: {
    type: Object as PropType<Extension>,
    default: Theme,
  },
  //宽度
  width: {
    type: Number,
    default: 600,
  },
  isEditable: {
    type: Boolean,
    default: true,
  },
  setup: {
    type: Array as PropType<Extension[]>,
    default: basicSetup,
  },
});

const editorDom = ref(null);
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
  console.log("context.state", context.state);
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
  //初始化编辑器实例
  const editor = new EditorView({
    parent: editorDom.value,
    state: EditorState.create({
      doc: props.modelValue,
      extensions: [
        props.setup,
        props.language,
        globalJavaScriptCompletions,
        props.theme,
        // 新版本一切皆插件，所以实时侦听数据变化也要通过写插件实现
        EditorView.updateListener.of((v: ViewUpdate) => {
          if (props.modelValue != v.state.doc.toString()) {
            emit("changeCode", v.state.doc.toString());
          } else {
            // console.log("数据没更新");
          }
        }),
        EditorView.editable.of(props.isEditable), //codemirror6修改值都需要通过of来修改
      ],
    }),
  });

  if (!props.isEditable) {
    foldAll(editor);
  }
});
</script>

<style>
.cm-editor {
  height: 100%;
}
::-webkit-scrollbar {
  outline: none;
  width: 12px;
  height: 12px;
  background-color: transparent;
  @include setTransition(all, 0.3s, ease);
}
::-webkit-scrollbar-track {
  background-color: rgba(30, 30, 30, 0);
}
::-webkit-scrollbar-thumb {
  background-color: rgba(160, 160, 160, 0.3);
}
::-webkit-scrollbar-thumb:hover {
  outline: none;
  background-color: rgba(173, 173, 173, 0.7);
}
</style>
