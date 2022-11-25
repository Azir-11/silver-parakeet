<template>
  <div>
    <p>上传本地文件,格式可以是HTML,CSS,JS</p>
    <p>如上传的是HTML文件,则会分解HTML,把链接分解导入iframe中</p>
    <n-upload multiple directory-dnd :max="5" :file-list="fileList" @change="chooseFile">
      <n-upload-dragger>
        <div style="margin-bottom: 12px">
          <n-icon size="48" :depth="3">
            <archive-icon />
          </n-icon>
        </div>
        <n-text style="font-size: 16px"> 点击或者拖动文件到该区域来上传 </n-text>
      </n-upload-dragger>
    </n-upload>
    <div class="flex justify-center">
      <n-button v-if="fileLists.length > 0" type="default" class="self-center w-30" @click="upload"
        >上传</n-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
import { type UploadFileInfo } from "naive-ui";
import uploader, { type fileInfos, limitMimeType } from "@/utils/webEditor/uploader";
import { useWebCodes } from "@/hooks/webEditor/useWebCodes";
const fileLists = ref<UploadFileInfo[]>([]); //naiveui中展示的文件列表
const filterFileList = ref<File[]>([]); //过滤后的文件列表

const webCodes = useWebCodes();
const getMimeType = (fileName: string): string => {
  return fileName.substring(fileName.lastIndexOf(".") + 1); //获取文件类型
};
const chooseFile = (data: { fileList: UploadFileInfo[] }) => {
  //过滤选择过后的文件
  fileLists.value = data.fileList;
  filterFileList.value = fileLists.value.map((item) => {
    if (limitMimeType.includes(getMimeType(item.file.name))) return item.file;
  });
};

const upload = async () => {
  const fileList = filterFileList.value;
  const codeObj: fileInfos = {
    html: "",
    css: "",
    js: "",
    links: [],
    scripts: [],
  };
  await uploader(fileList, true)
    .then((res) => {
      const { HTML, CSS, JavaScript } = res;
      if (HTML) {
        const { html, css, js, links, scripts } = HTML.content as fileInfos;
        if (html) codeObj.html = html;
        if (css) codeObj.css = css;
        if (js) codeObj.js = js;
      }
      if (CSS) {
        codeObj.css = CSS.content as string;
      }
      if (JavaScript) {
        codeObj.js = JavaScript.content as string;
      }
      const { html, css, js } = codeObj;
      webCodes.setTotalCode({ HTML: html, CSS: css, JS: js });
      window.$message.success("上传成功,所有文件都上传完毕");
    })
    .catch(() => {
      window.$message.warning("上传失败,文件上传过程出错");
    });
};
</script>

<style></style>
