<template>
  <div ref="editorDom" :style="`width:${width}px;font-family: JetBrainsMono;`"></div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { EditorView } from "codemirror";
import { lineNumbers, ViewUpdate } from "@codemirror/view";
import { countColumn, EditorState, StateEffect, Text } from "@codemirror/state";
import { Extension } from "@codemirror/state";
import { foldAll, LanguageSupport, StringStream } from "@codemirror/language";
import { Theme } from "./theme/projectTheme";
import { basicSetup } from "./setup";
import { javascriptLanguage } from "@codemirror/lang-javascript";
import { syntaxTree } from "@codemirror/language";
import { useWebEditorStates } from "@/hooks/webEditor/useWebEditorState";
let editor: EditorView; //将editor移出来可进行更多操作,如获取行数等
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
  isCmd: {
    type: Boolean,
    default: false,
  },
});

const editorDom = ref(null);
const emit = defineEmits(["changeCode"]);
const completePropertyAfter = ["PropertyName", ".", "?."];
const webEditorState = useWebEditorStates();
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

const resetEditorDoc = () => {
  //cmd清空值
  editor.setState(editorState);
};

defineExpose({
  resetEditorDoc,
});

const offsetToPos = (doc: Text, offset: number) => {
  let line = doc.lineAt(offset);
  return { line: line.number - 1, ch: offset - line.from };
}; //codemirror6和5的区别在于,6需要自己手动计算行和列,通过lineAt传参offset(光标所指向的当前是第几个字符串)来判定当前是在哪一行
const editorState = EditorState.create({
  //为了实现cmd功能重置值,将editorState移出来可更新state
  doc: props.modelValue,
  extensions: [
    props.setup,
    props.language,
    globalJavaScriptCompletions,
    props.theme,
    // 新版本一切皆插件，所以实时侦听数据变化也要通过写插件实现
    EditorView.updateListener.of((v: ViewUpdate) => {
      if (props.isEditable && !props.isCmd) {
        const { line, ch } = offsetToPos(v.state.doc, v.state.selection.main.head);
        webEditorState.setLines(line, ch);
      }

      if (props.modelValue != v.state.doc.toString()) {
        emit("changeCode", v.state.doc.toString());
      }
    }),
    EditorView.editable.of(props.isEditable), //codemirror6修改值都需要通过of来修改
  ],
});
onMounted(() => {
  //初始化编辑器实例
  editor = new EditorView({
    parent: editorDom.value,
    state: editorState,
  });
  if (!props.isEditable) {
    foldAll(editor);
  }
  editor.focus();
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
