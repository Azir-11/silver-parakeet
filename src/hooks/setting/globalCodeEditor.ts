import { EditorView, basicSetup } from "codemirror";
import { EditorState, Facet } from "@codemirror/state";
import { keymap } from "@codemirror/view";
import type { ViewUpdate } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import type { LanguageSupport } from "@codemirror/language";
import { computed, ref } from "vue";

const localValue = ref<string>();
//值

// let startState = EditorState.create({
//     doc: code.value,
//     extensions: [keymap.of(defaultKeymap)],
//   });



export interface editorSetting {
  defaultValue: string; //默认值
  language: LanguageSupport; //语言(目前只有html,css,js)
  theme?: string;//主题(可选,以后添加多点)
  width?: string;//宽度(可选)
}

let editor: EditorView;
export const createEditor = (setting: editorSetting): EditorView => {
  //初始化实例
  editor = new EditorView({
    parent: document.querySelector("#editor"),
    state: EditorState.create({
      doc: setting.defaultValue,
      extensions: [
        // basicSetup 是一套插件集合，包含了很多常用插件
        basicSetup,
        setting.language,
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
  return editor;
};

export const destoryEditor = (Editor: EditorView) => {
  //销毁实例
  Editor.destroy();
};

export const getlocalValue = computed(() => localValue); //获取值
