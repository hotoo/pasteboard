
var Events = require("arale-events");
var $ = require("jquery");

var PasteBoard = {};

var tempClipboard = null;
var _event = new Events();

/*
 * make temp pasteboard object.
 * @return {HTMLElement<TextArea>}
 */
function makeTempBoard(){
  var board = $(document.createElement("textarea"));
  board.css({
    display: "none",
    position: "absolute",
    width: "1px",
    height: "1px",
    left: "-1000px",
    top: "-1000px"
  });
  return board;
};

/*
 * init.
 * keyboard event handler.
 * @param {KeyBoardEvent} evt.
 */
$(document).keydown(function(evt){
  if(!tempClipboard){
    tempClipboard = makeTempBoard();
    $(document.body).append(tempClipboard);
  }
  if(!evt.ctrlKey && !evt.metaKey){return;}
  var keyCode = evt.keyCode || evt.which;
  if(86 != keyCode){return;} // v

  tempClipboard.show().focus();

  /*
   * trigger paste event handler.
   */
  window.setTimeout(function(){
    var text = tempClipboard.val();
    if("" == text){return false;}
    _event.trigger("paste", text, evt);
    tempClipboard.hide().val("");
  }, 50);
  return true;
});


PasteBoard.on = function(evt, handler, context){
  if("paste" !== evt){return;}
  _event.on(evt, handler, context);
};

module.exports = PasteBoard;
