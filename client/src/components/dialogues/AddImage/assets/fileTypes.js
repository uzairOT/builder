import pdf from './svgs/pdf.svg';
import doc from './svgs/doc.svg';
import xls from './svgs/xls.svg';
import ppt from './svgs/ppt.svg';
import txt from './svgs/txt.svg';
import zip from './svgs/zip.svg';
export const fileTypeIcons = new Map();
fileTypeIcons.set("pdf", pdf);
fileTypeIcons.set("doc", doc);
fileTypeIcons.set("docx", doc);
fileTypeIcons.set("xls", xls); // Excel Spreadsheet (old)
fileTypeIcons.set("xlsx", xls); // Excel Spreadsheet (current)
fileTypeIcons.set("ppt", ppt); // PowerPoint Presentation (old)
fileTypeIcons.set("pptx", ppt); // PowerPoint Presentation (current)
fileTypeIcons.set("txt", txt);
fileTypeIcons.set("zip", zip);