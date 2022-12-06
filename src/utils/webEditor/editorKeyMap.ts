import { useWebCodes } from "@/hooks/webEditor/useWebCodes";
import { Command, KeyBinding } from "@codemirror/view";
import { format } from "./codeFormatter";
import { EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";
const webCodesStore = useWebCodes();
const formatCode = (view: EditorView) => {
  const { getModeCode, getTeamplateModes, getIndex, getEditorState, getCursorPosition } =
    webCodesStore;
  const result: string = format(getModeCode, getTeamplateModes[getIndex]);
  webCodesStore.setModeCode(result);
  view.dispatch({
    changes: { from: 0, to: view.state.doc.length, insert: result },
  });
  return true;
};
const formatKeyMap: KeyBinding = {
  win: "Shift-Alt-f",
  linux: "Shift-Alt-f",
  mac: "Shift-Alt-f",
  run: formatCode,
};

export const customEditorKeyMap: KeyBinding[] = [formatKeyMap];
