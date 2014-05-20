
# 演示文档

----


<div>
    <ol id="links">
        <li>
            Link Text: <input name="text" type="text" />
            Link Url: <input name="url" type="text" /><br/>
            Link Title: <input name="title" type="text" />
            Link Seed: <input name="seed" type="text" />
        </li>
    </ol>
    <a style="margin-left:2em;" href="javascript:addLinkLine()">+Add</a>
</div>

<p>
请从 Excel 或　Numbers 等工具拷贝部分内容，然后粘贴到第一列输入框。
</p>

<hr />
<div>
    <ol id="payments">
        <li>
            收款人: <input name="targetUser" type="text" />
            金额: <input name="pay" type="number" />
        </li>
    </ol>
    <a style="margin-left:2em;" href="javascript:addPaymentLine()">+Add</a>
</div>

````js
seajs.use(['../pasteboard'], function(PasteBoard){
    var links = document.getElementById("links");
    var payments = document.getElementById("payments");

    PasteBoard.on("paste", function(text, evt){
        var elem = evt.target;
        if("text"!=elem.getAttribute("name")){return;}

        var list = text.split("\n");
        links.removeChild(elem.parentNode);
        for(var i=0,line,l=list.length; i<l; i++){
            if(/^\s*$/.test(list[i])){continue;}
            line = list[i].split("\t");
            addLinkLine(line[0], line[1], line[2], line[3]);
        }
    });

    PasteBoard.on("paste", function(text, evt){
        var elem = evt.target;
        if("targetUser"!=elem.getAttribute("name")){return;}

        var list = text.split("\n");
        payments.removeChild(elem.parentNode);
        for(var i=0,line,l=list.length; i<l; i++){
            if(/^\s*$/.test(list[i])){continue;}
            line = list[i].split("\t");
            addPaymentLine(line[0], line[1]);
        }
    });

});

    // for links.
    function addLinkLine(text, url, title, seed){
        var li = document.createElement("li");
        li.innerHTML =
            'Link Text: <input type="text" name="text" value="'+(text||'')+'" /> '+
            'Link Url: <input type="url" name="url" value="'+(url||'')+'" /><br/>'+
            'Link Title: <input type="text" name="title" value="'+(title||'')+'" /> '+
            'Link Seed: <input type="text" name="seed" value="'+(seed||'')+'" /> '+
            '<a onclick="delLinkLine(this)" href="javascript:void(0);">(X)Del</a>';
        links.appendChild(li);
    }
    function delLinkLine(a){
        links.removeChild(a.parentNode);
    }

    // for payments.
    function addPaymentLine(user, pay){
        var li = document.createElement("li");
        li.innerHTML =
            '收款人: <input name="targetUser" type="text" value="'+(user||'')+'" />'+
            '金额: <input name="pay" type="number" value="'+(pay||'')+'" />'+
            '<a onclick="delPaymentLine(this)" href="javascript:void(0);">(X)Del</a>';
        payments.appendChild(li);
    }
    function delPaymentLine(a){
        links.removeChild(a.parentNode);
    }
````
