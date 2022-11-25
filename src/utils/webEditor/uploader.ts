const HttpUrl = /^((?!\\|\/|:|\*|\?|<|>|\|).){1,255}$/;

export interface fileInfos {
  html: string;
  css: string;
  js: string;
  links: string[];
  scripts: string[];
}
interface fileResult {
  content: fileInfos | string | ArrayBuffer;
  type: string | typeof ModeMimeTypeMap;
}

interface fileType {
  HTML?: fileResult;
  JavaScript?: fileResult;
  CSS?: fileResult;
}
const ModeMimeTypeMap = {
  md: "Markdown",
  pug: "Pug",
  sass: "Sass",
  scss: "Scss",
  less: "Less",
  styl: "Stylus",
  ts: "TypeScript",
  coffee: "CoffeeScript",
  jsx: "JSX",
  html: "HTML",
  css: "CSS",
  js: "JavaScript",
};

function judgeExtension(edit: string) {
  switch (edit) {
    case "html":
    case "md":
    case "pug":
      return "HTML";
    case "css":
    case "sass":
    case "scss":
    case "less":
    case "styl":
      return "CSS";
    case "js":
    case "ts":
    case "coffee":
    case "jsx":
      return "JavaScript";
  }
}
export const limitMimeType = [
  "html",
  "css",
  "js",
  "jsx",
  "md",
  "pug",
  "sass",
  "scss",
  "less",
  "styl",
  "ts",
  "coffee",
];
/**
 * Get the contents of the uploaded file list in the instance
 * Since the files of the same type are uploaded, the following files will overwrite the contents of the previous files
 * so if there are duplicate files in the list, only the contents of the following files will be read
 * 获取实例中上传文件列表的内容
 * 由于上传相同类型的文件，后面的文件会覆盖前面文件的内容，因此如果列表中有重复类型的文件，只读取后面文件的内容
 * @param {Array} fileList 文件列表
 * @returns {Object}
 */
const uploader = async (fileList: File[], isResoleHTML: boolean): Promise<fileType> => {
  /**
   * reverse the fileList, save the contents of files of different types, and skip files of the same type
   * 翻转数组，将非重复类型文件内容存入，跳过相同类型文件
   */
  const list = fileList.reverse();
  const fileObj: fileType = {};
  for (let i = 0, k = list.length; i < k; i++) {
    const current = fileList[i];
    const extension = getMimeType(current.name);
    const type = judgeExtension(getMimeType(current.name));
    if (!Object.prototype.hasOwnProperty.call(fileObj, type)) {
      await fileReader(current, extension, isResoleHTML).then((res) => {
        fileObj[type] = res;
      });
    } else {
      continue;
    }
  }
  return fileObj;
};

/**
 * Read the file and get the processed text
 * If the file is html, you need to distinguish the html, css and javascript code inside
 * 读取文件并获取处理后的文本
 * 如果文件是html，需要把里面的html，css和javascript代码区分开
 * @param {File} file
 * @param {String} extension 文件后缀
 * @param {Boolean} isResoleHTML 是否分解html文件
 * @returns {Promise}
 */

const fileReader = async (
  file: File,
  extension: string,
  isResoleHTML: boolean = true,
): Promise<fileResult> => {
  const reader = new FileReader();
  reader.readAsText(file, "UTF-8");
  return new Promise((resolve) => {
    reader.onload = (e) => {
      const fileString = e.target.result;
      if (extension === "html" && isResoleHTML) {
        const fileInfo = resolveHTML(fileString as string);
        resolve({
          content: fileInfo,
          type: "html",
        });
      } else {
        resolve({
          content: fileString,
          type: ModeMimeTypeMap[extension],
        });
      }
    };
  });
};

/**
 * Analyze html
 * Decompose html files into html, css and javascript codes
 * Take out the external links contained in it
 * 分析html
 * 将html文件分解成html，css和javascript代码
 * 取出里面包含的外部链接
 * @param {String} content
 * @returns {Object}
 */
const resolveHTML = (content: string) => {
  let html: string,
    css: string,
    js: string,
    tmpCode: string,
    result: RegExpExecArray | RegExpMatchArray;
  // html
  result = /<body[^>]*>([\s\S]*)<\/body>/.exec(content);
  if (result && result.length === 2) tmpCode = result[1];
  html = tmpCode.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  // css
  result = /<style>(([\s\S])*?)<\/style>/g.exec(content);
  if (result && result.length >= 2) css = result[1];
  // external css
  const linkList = content.match(/<link.*?(?:>|\/>)/gi);
  const links: string[] = [];
  if (linkList) {
    let url = "";
    for (let i = 0, content; (content = linkList[i++]); ) {
      result = content.match(/<link .*?href=\"(.+?)\"/);
      if (result && result.length === 2) url = result[1];
      if (HttpUrl.test(url)) links.push(url);
    }
  }
  // js
  const codeList = content.match(/<script>([\s\S]+?)<\/script>/gi);
  if (codeList) {
    let code = "";
    for (let i = 0, content; (content = codeList[i++]); ) {
      result = /<script>([\s\S]+?)<\/script>/gi.exec(content);
      if (result && result.length === 2) code = result[1];
      js += code + "\n";
    }
  }
  // external js
  const scriptList = content.match(/<script.*?(?:>|\/>)\<\/script\>/gi);
  const scripts: string[] = [];
  if (scriptList) {
    let url = "";
    for (let i = 0, content: string; (content = scriptList[i++]); ) {
      result = content.match(/<script .*?src=\"(.+?)\"/);
      if (result && result.length === 2) url = result[1];
      if (HttpUrl.test(url)) scripts.push(url);
    }
  }
  html = html.replaceAll("<!--  -->", "");
  js = js.replaceAll("undefined", "");
  return {
    html,
    css,
    js,
    links,
    scripts,
  };
};

/**
 * Get the file mimetype
 * 获取文件后缀名
 * @param {String} fileName
 * @returns {String}
 */
const getMimeType = (fileName: string): string => {
  const pos = fileName.lastIndexOf(".");
  return fileName.substring(pos + 1);
};

export default uploader;
