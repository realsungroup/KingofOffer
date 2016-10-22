var appfunctions = appfunctions || {};
var appConfig;
var online=null;

//http://www.realsun.me:8003/rispweb/
//http://kingofdinner.realsun.me:8081/rispweb
appfunctions.system=new function(){
    this.doParseText=function(text,fnSuccess,fnError)
    {
             var data = mini.decode(text);
                    
                    if (data.error == -1) {
                        if (fnError != null) {
                            fnError(data.message);
                            return ;
                        }
                    }
                    var adata = [];
                    var subdata = [];
                    var total=0;
                    adata = data.data[0];
                    if (!(data.total==1))
                    {  
                         
                      if (fnError != null) {
                            fnError("找不到对应的窗口号,登入失败!");
                            return;
                        }
                    }
                   
                    if (fnSuccess != null) {
                        appConfig.app.winno=adata.C3_530122591910;
                        appConfig.app.winname=adata.C3_530122607223;
                        appConfig.app.canteenno=adata.C3_530124612816;
                        appConfig.app.canteenname=adata.C3_530124613082;
                        appConfig.app.user=adata.C3_530122651019;
                        appConfig.app.upass=adata.C3_530122663363;
                        appConfig.app.loginUrl=adata.C3_530122630863;
                        appConfig.app.localbaseUrl=adata.C3_530122737504;
                        var dbh=new dbHelper(appConfig.app.baseUrl,appConfig.app.hostuser,appConfig.app.hostucode);
                        
                        var aRecord=new onerecord(adata.REC_ID,"modified");
                        var records=[];
                        
                        records.push(aRecord);
                        var json=mini.encode(records);
                        //alert(json);
                        dbh.dbSavedata(appConfig.app.hostwebpos,0,json,fnsaved,fnnosave,fnsyserror);
                        function fnsaved(data)
                        {
                             localStorage.setItem('doWindowlogin',JSON.stringify(text));
                             fnSuccess("窗口机登入成功!");
                             return;
                        }
                        function fnnosave(error)
                        {
                             appConfig.app.winno=0;
                             appConfig.app.winname="";
                             appConfig.app.canteenno=0;
                             appConfig.app.canteenname="";
                             appConfig.app.user="";
                             appConfig.app.upass="";
                             appConfig.app.loginUrl="";
                             appConfig.app.localbaseUrl="";
                             localStorage.setItem('doWindowlogin',"");
                             fnError(error.message);
                            return ;
                        }
                        function fnsyserror(error)
                        {
                             appConfig.app.winno=0;
                             appConfig.app.winname="";
                             appConfig.app.canteenno=0;
                             appConfig.app.canteenname="";
                             appConfig.app.user="";
                             appConfig.app.upass="";
                             appConfig.app.loginUrl="";
                             appConfig.app.localbaseUrl="";
                              localStorage.setItem('doWindowlogin',"");
                             fnError("系统错误");
                            return ;
                        }
                    }
    }
    this.doWindowlogin=function(loginrandcode,fnSuccess,fnError)
    {
        var url;
        var cmswhere="C3_530389677320="+loginrandcode;               
        var self=this;
        url = appConfig.app.baseUrl + "&method=" + appConfig.app.getMethod + "&user=" + appConfig.app.hostuser + "&ucode=" + appConfig.app.hostucode + "&resid=" + appConfig.app.hostwebpos + "&cmswhere=" + cmswhere;
          $.ajax({
            url: url,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            success: function (text) {
                if (text !== "") {
                   self.doParseText(text,fnSuccess,fnError);
                }
                else
                {
                    fnError("数据为空");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (fnSyserror != null) {
                    fnError("doWindowlogin:系统错误");
                }
            } });
    }
    this.doLogin=function(user,upass,fnSuccess, fnError, fnSyserror) {

           var url;
           url = appConfig.app.loginUrl +"&apitoken=KingOfDinner123456789&clienttype=mobile&user="+user+"&upass="+upass;
           $.ajax({
            url: url,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            success: function (text) {
                if (text !== "") {
                    var data = mini.decode(text);
                    if (data.error !== 0) {
                        if (fnError != null) {
                            fnError(data);
                        }
                    }
                    else{  
                        if (fnSuccess != null) {
                          
                            fnSuccess(data);
                          }
                        }
                   }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (fnSyserror != null) {
                    fnSyserror(jqXHR, textStatus, errorThrown);
                }
            } });

     };




}
appfunctions.uploadFile = new function () {
    var uploadFile = this;
    this.swfFileUpload = function (aappConfig, fileupload) {
        fileupload.setUploadUrl(aappConfig.app.uploadFileUrl + "?savepath=e:\\web\\rispweb\\upfiles&httppath=" + aappConfig.app.httppath);
        fileupload.startUpload();
    };
this.ajaxFileUpload = function (aappConfig, inputFile) {
        mini.parse();
        scriptLoaded();
        function scriptLoaded() {
            alert('scriptLoaded');
            $.ajaxFileUpload({
                url: aappConfig.app.uploadFileUrl,
                fileElementId: inputFile,
                data: { savepath: "e:\\web\\rispweb\\upfiles" },
                dataType: 'json',
                success: function (data, status) {
                    if (data) {
                        alert("上传成功: " + data);
                    }
                    else {
                        alert("上传成功,无返回信息 ");
                    }
                },
                error: function (data, status, e) {
                    alert(e);
                },
                complete: function () {
                    var jq = $("#file1 > input:file");
                    jq.before(inputFile);
                    jq.remove();
                }
            });
        }
    };


};
var onerecord=(function()
{
    function onerecord(id,action)
    {
        this._id=1;
        this._state=action;
        this.REC_ID=id;
    }
    return onerecord;
}());
var dbHelper = (function () {
    function dbHelper(baseurl, user, ucode) {
        this.saveMethod = appConfig.app.saveMethod;
        this.getMethod = appConfig.app.getMethod;
        this.baseUrl = baseurl;
        this.user = user;
        this.ucode = ucode;
    }
     
    dbHelper.prototype.dbGetdata = function (resid, subresid, cmswhere, fnSuccess, fnError, fnSyserror,pageSize,pageIndex) {
        var url;
        url = this.baseUrl + "&method=" + this.getMethod + "&user=" + this.user + "&ucode=" + this.ucode + "&resid=" + resid + "&subresid=" + subresid + "&cmswhere=" + cmswhere;
        if ((pageSize >0))
        {
             url=url+"&pageIndex="+pageIndex+"&pageSize="+pageSize;
        }
        
        $.ajax({
            url: url,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            success: function (text) {
                if (text !== "") {
                    var data = mini.decode(text);
                    if (data.error == -1) {
                        if (fnError != null) {
                            fnError(data);
                        }
                    }
                    var adata = [];
                    var subdata = [];
                    var total=0;
                    adata = data.data;
                    if (data.total)
                    {  total = data.total;}
                 
                    if (data.subdata != null) {
                        subdata = data.subdata.data;
                    }
                    if (fnSuccess != null) {

                        fnSuccess(adata, subdata,total);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (fnSyserror != null) {
                    fnSyserror(jqXHR, textStatus, errorThrown);
                }
            } });
    };
    dbHelper.prototype.dbSavedata = function (resid, subresid, json, fnSuccess, fnError, fnSyserror) {
        var url;
        url = this.baseUrl + "&method=" + this.saveMethod + "&user=" + this.user + "&ucode=" + this.ucode;
        $.ajax({
            url: url,
            async: false,
            dataType: "jsonp",
            jsonp: "jsoncallback",
            type: 'post',
            data: { data: json, resid: resid },
            cache: false,
            success: function (text) {
                if (text.error == "0") {
                    if (fnSuccess != null) {
                        fnSuccess(text);
                    }
                }
                else {
                    if (fnError != null) {
                        fnError(text);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (fnSyserror != null) {
                    fnSyserror(jqXHR, textStatus, errorThrown);
                }
            }
        });
    };
    return dbHelper;
}());
var miniPanel = (function () {
    function miniPanel(element) {
        this.element = element;
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toLocaleTimeString();
    }
    miniPanel.prototype.start = function () {
        var _this = this;
        var jsonString = '{"messge": "ok","error":"-1"}';
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toLocaleTimeString(); }, 500);
    };
    miniPanel.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    miniPanel.prototype.appendPanel = function (parentelement, panelid, mini, classname, title, url, fnload, expanded, iconCls) {
        this.mini_control = document.createElement('div');
        this.mini_control.id = panelid;
        this.mini_control.className = classname;
        this.mini_control.title = title;
        parentelement.appendChild(this.mini_control);
        mini.parse();
        var aPanel = mini.get(panelid);
        aPanel.set({ "width": "auto", "height": "800", "iconCls": iconCls, "expanded": expanded, "onbuttonclick": "onbuttonclick" });
        aPanel.load(url, function () {
            var iFrame = aPanel.getIFrameEl();
            fnload(iFrame);
        }, null);
    };
    return miniPanel;
}());
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var str=(window.location.href);
    str=str.substr(str.indexOf("?"));
    var r = str.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
function onbuttonclick(e) {
    if (e.name = "collapse") {
        setTimeout(function () {
            if (e.sender.expanded == true) {
                e.sender.set({ "height": "400px" });
            }
        }, 500);
    }
}
