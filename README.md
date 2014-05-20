
# PasteBoard.

----

支持批量粘贴的通用解决方案。

## 使用说明

```js
var PasteBoard = require("pasteboard");
var CSV = require("csv");

PasteBoard.on("paste", function(text, evt){
  var a = CSV.parse(text, "\t");
  a.each(function(e, i){
    alert(e.join());
  })
});
```

## API

### on(String event_name, Function handler)

绑定事件。

### off(String event_name [, Function handler])

解除事件绑定。

## Event

### paste

用户将粘贴板的内容粘贴到页面上时触发。

## 批量粘贴相比文件上传的优势：

1. 客户端分布式处理，无需服务器提供文件存储，复杂的文件解析逻辑。
2. 与普通页面表单行为＆校验逻辑一致。
3. 及时的异常输入反馈。
4. 实时的处理能力(文件上传需要分时处理)。
5. 前端都无需太多的额外开发，后端无需任何开发。
