    var bhxh = QueryString("BHXH");
    if (bhxh) {
        $("#txtBHXH").val(bhxh).prop("disabled", true);
    };

    InitgridControl1(" and bhxh="+bhxh);

    function saveKCZFData() {
        if (!checkData()) {
            return;
        }
        var zxxkzh = $("#txtZXXKZH").val();
        var guid = QueryString("GUID");
        var data={ zxxkzh: zxxkzh, guid: guid,bhxh:$("#txtBHXH").val()};
        $.ajax({
            type: "POST",
            url: _path + "/KCZF/DataManage/UpdateGDZBExp",
            data: data,
            async: false,
            success: function (res) {
                if (res) {
                    return;
                }
                else {
                    //showMessage(res.Message);
                    return "";
                }
                
            },
            error: function (res) {
                showMessage(res);
            }
        });
        saveData();
    }

    function checkData() {
        if ($("#txtZXXKZH").val() == "" || $("#txtZXXKZH").val() == null) {
            alert("请输入许可证号！");
            return false;
        }
        var strZXXKZH = $("#txtZXXKZH").val();
        var reg = /^\d{13}$|^C\d{22}$/;
        if (!strZXXKZH.match(reg)) {
            alert("请输入正确格式的最新许可证号！");
            return false;
        }
        return true;
    }
    var XUHAO = $("#txtXUHAO").val();
    function addGDZB() {
        if($("#txtBHXH").val()=="0"){
            alert("请先填写变化序号！");
            return;
        }
        var BHXH=$("#txtBHXH").val();
        $("#txtBHXH").prop("disabled", true);
        var GUID = QueryString("GUID");
        var rtVal = window.showModalDialog(getRootPath() + "/VFD/Data/ZB2?GUID=" + GUID + "&XUHAO=" + XUHAO+"&BHXH="+BHXH, "", "dialogHeight=230px;dialogWidth=480px;");
        if (!rtVal) {
            XUHAO = parseInt(XUHAO) + 1;
            InitgridControl1(" and BHXH="+$("#txtBHXH").val());
        }
    }


    function InitgridControl1(filterString) {
        var gridProp = new VfdxGrid();
        gridProp.ID = "gridZB2";
        gridProp.IsPage = false;
        gridProp.PageSize = 0;
        gridProp.OrderColumn = "";
        gridProp.Edit = false;
        gridProp.PagePosition = "right";
        gridProp.FilterString = filterString;
        gridProp.OrderType = "";
        gridProp.FixedHeight = false;
        gridProp.Height = "68px";
        gridProp.ShowSequence = false;
        gridProp.ShowCheckbox = false;
        gridProp.HideHead = false;
        gridProp.ByPercent = true;
        gridProp.HeadArr = new Array
        (
        { text: "序号", width: "100", align: "center" },
        { text: "X坐标", width: "100", align: "center" },
        { text: "Y坐标", width: "100", align: "center" }
        );
        gridProp.ColumnArr = new Array
        (
        { columnType: "lab", name: "XUHAO", align: "center" },
        { columnType: "lab", name: "ZZBX", align: "center" },
        { columnType: "lab", name: "HZBY", align: "center" }
        );
        gridProp.InitFun = function () {
            var gridContent = {
                RequestUrl: window.document.location.href,
                ReadName: "@ViewBag.ModulePage/DKZB_ZB",
                vModel: gridProp.getModel(),
                SortKeyWord: ""
            };
            $.post(_path + "/VFDAPI/Custom/GetGridModels", gridContent, function (response) {
                gridProp.initGrid(response);
            });
        }
        gridProp.InitFun();
    }
    
    function uploadFile(){
        var txtZXXKZH = $("#txtZXXKZH").val();
        if(txtZXXKZH == null || txtZXXKZH == ""){
            alert("最新许可证号不能为null");
            return; 
        }
        var txtBHXH = $("#txtBHXH").val();
        if(txtBHXH == null || txtBHXH == ""){
            alert("变化序号不能为null");
            return; 
        }
        window.showModalDialog("../../kczf/datamanage/ViewDKZBXX?txtZXXKZH="+txtZXXKZH+"&txtBHXH="+txtBHXH,"","dialogWidth:400px; dialogHeight:200px");
    }