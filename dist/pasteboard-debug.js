
define("#pasteboard/0.9.7/pasteboard-debug", ["#events/0.9.1/events-debug", "#jquery/1.7.2/jquery-debug"], function(require, exports){

    PasteBoard = exports;

    var Events = require('#events/0.9.1/events-debug');
    var $ = require('#jquery/1.7.2/jquery-debug');

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
});
