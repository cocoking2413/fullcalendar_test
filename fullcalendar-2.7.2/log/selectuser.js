/**
 * Created by Administrator on 2016-06-14.
 */
Array.prototype.indexOf = function (el) {
    for (var i = 0, n = this.length; i < n; i++) {
        if (this[i] === el) {
            return i;
        }
    }
    return -1;
};
Array.prototype.findUid = function (uid) {
    for (var i = 0, n = this.length; i < n; i++) {
        if (this[i].Uid === uid) {
            return i + 1;
        }
    }
    return 0;
};
Array.prototype.removeUid = function (uid) {
    for (var i = 0, n = this.length; i < n; i++) {
        if (this[i].Uid === uid) {
            this.splice(i, 1);
            return true;
        }
    }
    return false;
};
$(function () {
    //处理已有选中人员列表
    var loadSelectUids = new Array();
    if (user_datas.selectUids.trim() != "") {
        var uids = user_datas.selectUids.trim();
        try {
            if (uids.indexOf(",") > 0) {
                var uidsstr = uids.split(',');
                if (uidsstr.length > 0) {
                    $.each(uidsstr, function (i, idstr) {
                        try {
                            var a = parseInt(idstr);
                            if (!isNaN(a)) {
                                loadSelectUids.push(a);
                            }
                        } catch (e){ console.error(e.stack);
                        }
                    });
                }
            } else {
                try {
                    var a = parseInt(uids);
                    if (!isNaN(a)) {
                        loadSelectUids.push(a);
                    }
                } catch(e) { console.error(e.stack);
                }
            }
        } catch (e) {
            console.error(e.stack);
        }
    }
    //添加用户列表
    var userlist_depart = $("#userlist_depart");
    var userlist_position = $("#userlist_position");
    var userlist_role = $("#userlist_role");

    $.ajax({
        type: 'post',
        url: user_datas.url,
        data: {exceptUids: user_datas.exceptUids},
        dataType: 'text',
        success: function (data) {
            if (data != 'False') {
                var data = eval(data);
                $.each(data, function (index, element) {
                    element.Uid = element.ID;
                    element.Data = {
                        Uid: element.Uid,
                        RemarkName: element.RemarkName,
                        DepartID: element.DepartID,
                        PositionID: element.PositionID,
                        RoleID: element.RoleID
                    };
                    user_datas.userlistAll.push(element);
                    if(loadSelectUids.indexOf(element.Uid)>-1&&(user_datas.selectUserList.findUid(element.Uid) == 0)){//预设选中项
                        user_datas.selectUserList.push(element);
                    }
                    if (user_datas.userlistSelectAll.findUid(element.Uid) == 0) {
                        user_datas.userlistSelectAll.push(element);
                    }
                });
                if (user_datas.userlistAll.length > 0) {
                    //左侧数据加载+模板渲染
                    left_init();
                    //右侧渲染
                    rightRender();
                    //左侧列表处理
                    leftRender();
           
                } else {
                    alert("获取用户列表失败！请关闭重试");
                }
            } else {
                alert("获取用户列表失败！");
            }
        },
        error: function (result) {
            alert(JSON.stringify(result));
        }
    });

    function left_init() {
        //分组过滤数据，到各自的组
        var departMap = {}, positionMap = {}, roleMap = {};//objmap={id:{Name:ordername,Data:Data}}
        departMap.mapids = new Array();
        positionMap.mapids = new Array();
        roleMap.mapids = new Array();
        departMap.List = new Array();
        positionMap.List = new Array();
        roleMap.List = new Array();
        $.each(user_datas.userlistAll, function (index, item) {
            if (departMap.mapids.indexOf(item.DepartID) >= 0) {
                departMap.List[departMap.mapids.indexOf(item.DepartID)].Data.push({
                    Uid: item.Uid,
                    RemarkName: item.RemarkName,
                    DepartID: item.DepartID,
                    PositionID: item.PositionID,
                    RoleID: item.RoleID,
                    Data: item.Data
                });
            } else {
                departMap.mapids.push(item.DepartID);
                departMap.List.push({
                    ID: item.DepartID,
                    Name: item.DepartName,
                    Data: [{
                        Uid: item.Uid,
                        RemarkName: item.RemarkName,
                        DepartID: item.DepartID,
                        PositionID: item.PositionID,
                        RoleID: item.RoleID,
                        Data: item.Data
                    }]
                });
            }
            if (positionMap.mapids.indexOf(item.PositionID) >= 0) {
                positionMap.List[positionMap.mapids.indexOf(item.PositionID)].Data.push({
                    Uid: item.Uid,
                    RemarkName: item.RemarkName,
                    DepartID: item.DepartID,
                    PositionID: item.PositionID,
                    RoleID: item.RoleID,
                    Data: item.Data
                });
            } else {
                positionMap.mapids.push(item.PositionID);
                positionMap.List.push({
                    ID: item.PositionID,
                    Name: item.PositionName,
                    Data: [{
                        Uid: item.Uid,
                        RemarkName: item.RemarkName,
                        DepartID: item.DepartID,
                        PositionID: item.PositionID,
                        RoleID: item.RoleID,
                        Data: item.Data
                    }]
                });
            }
            if (roleMap.mapids.indexOf(item.RoleID) >= 0) {
                roleMap.List[roleMap.mapids.indexOf(item.RoleID)].Data.push({
                    Uid: item.Uid,
                    RemarkName: item.RemarkName,
                    DepartID: item.DepartID,
                    PositionID: item.PositionID,
                    RoleID: item.RoleID,
                    Data: item.Data
                });
            } else {
                roleMap.mapids.push(item.RoleID);
                roleMap.List.push({
                    ID: item.RoleID,
                    Name: item.RoleName,
                    Data: [{
                        Uid: item.Uid,
                        RemarkName: item.RemarkName,
                        DepartID: item.DepartID,
                        PositionID: item.PositionID,
                        RoleID: item.RoleID,
                        Data: item.Data
                    }]
                });
            }
        });
        user_datas.departUserList = departMap;
        user_datas.positionUserList = positionMap;
        user_datas.roleUserList = roleMap;
        //渲染
        $.each(departMap.List, function (id, obj) {
            var html1 = template("temp_UserList", obj);
            userlist_depart.append(html1);
        });
        $.each(positionMap.List, function (id, obj) {
            var html1 = template("temp_UserList", obj);
            userlist_position.append(html1);
        });
        $.each(roleMap.List, function (id, obj) {
            var html1 = template("temp_UserList", obj);
            userlist_role.append(html1);
        });
        if (!!user_datas.isSelectAll_bl) {
            user_datas.selectAll();
        }
    }

    user_datas.clickUser = function (data) {
        //维护选择列表
        i_select(data, true);
        //右侧渲染
        rightRender();
        //左侧列表处理
        leftRender();
    };

    user_datas.clickgroup = function (list) {
        //维护选择列表
        $.each(list, function (i, data) {
            i_select(data, false);
        });

        //右侧渲染
        rightRender();
        //左侧列表处理
        leftRender();
    };
    user_datas.selectAll = function () {
        user_datas.selectUserList = user_datas.userlistSelectAll.slice();//array不能直接赋值,会把两个array的指针指到一起，需要slice()克隆一个副本
        //右侧渲染
        rightRender();
        //左侧列表处理
        leftRender();
    };
    user_datas.select_empty = function () {
        user_datas.selectUserList = [];
        //右侧渲染
        rightRender();
        //左侧列表处理
        leftRender();
    };
    user_datas.unselectAll = function () {
        //维护选择列表
        // alert(JSON.stringify(user_datas.userlistSelectAll));
        $.each(user_datas.userlistSelectAll, function (i, data) {
            i_select(data, true);
        });

        //右侧渲染
        rightRender();
        //左侧列表处理
        leftRender();
    };
    //反选  true,补充 false
    function i_select(data, bl) {
        if (user_datas.selectUserList.findUid(data.Uid) > 0) {
            if (bl) {
                user_datas.selectUserList.removeUid(data.Uid);
            }
        } else {
            data.Data = {
                Uid: data.Uid,
                RemarkName: data.RemarkName,
                DepartID: data.DepartID,
                PositionID: data.PositionID,
                RoleID: data.RoleID
            };
            user_datas.selectUserList.push(data);
        }
    }

    //右侧渲染
    function rightRender() {
        $("#select_user").empty();
        $.each(user_datas.selectUserList, function (index, ele) {
            var html = template("select_list_item", ele);
            $("#select_user").append(html);
        });
        $("#select_Count").html(user_datas.selectUserList.length);
    }

    //左侧列表处理
    function leftRender() {
        $("#userlist_depart>li>ul>li").removeClass("active");
        $("#userlist_depart>li>ul>li").each(function () {
            if (user_datas.selectUserList.findUid($(this).data("id")) > 0) {
                $(this).addClass("active");
            }
        });
        $("#userlist_position>li>ul>li").removeClass("active");
        $("#userlist_position>li>ul>li").each(function () {
            if (user_datas.selectUserList.findUid($(this).data("id")) > 0) {
                $(this).addClass("active");
            }
        });
        $("#userlist_role>li>ul>li").removeClass("active");
        $("#userlist_role>li>ul>li").each(function () {
            if (user_datas.selectUserList.findUid($(this).data("id")) > 0) {
                $(this).addClass("active");
            }
        });
    }

    //全选
    $("#select_All").on("click", function () {
        user_datas.selectAll();
    });
    //清空
    $("#select_empty").on("click", function () {
        user_datas.select_empty();
    });
    //反选
    $("#select_UnAll").on("click", function () {
        user_datas.unselectAll()
    });
    //选中列表点击
    $("#select_user").delegate("li", "click", function (event) {
        event.stopPropagation();
        var data = $(this).data("mydata");
        user_datas.clickUser(data);
    });

    //用户列表点击事件
    $("#userlist_depart").delegate("li", "click", function (event) {
        event.stopPropagation();
        $("#userlist_depart>li.active").removeClass("active");
        $(this).addClass("active");
        var data = $(this).data("mydata");
        if (typeof (data.Uid) == 'number') {
            user_datas.clickUser(data);
        } else {
            user_datas.clickgroup(data);
        }
    });

    $("#userlist_position").delegate("li", "click", function (event) {
        event.stopPropagation();
        $("#userlist_position>li.active").removeClass("active");
        $(this).addClass("active");
        var data = $(this).data("mydata");
        if (typeof (data.Uid) == 'number') {
            user_datas.clickUser(data);
        } else {
            user_datas.clickgroup(data);
        }
    });

    $("#userlist_role").delegate("li", "click", function (event) {
        event.stopPropagation();
        $("#userlist_role>li.active").removeClass("active");
        $(this).addClass("active");
        var data = $(this).data("mydata");
        if (typeof (data.Uid) == 'number') {
            user_datas.clickUser(data);
        } else {
            user_datas.clickgroup(data);
        }
    });

    $("#userlist_search").delegate("li", "click", function (event) {
        event.stopPropagation();
        $("#userlist_role>li.active").removeClass("active");
        $(this).addClass("active");
        var data = $(this).data("mydata");
        if (typeof (data.Uid) == 'number') {
            user_datas.clickUser(data);
        } else {
            user_datas.clickgroup(data);
        }
    });

    $("#userTab_depart").on("click", function () {
        $("#select_box>ul>li").removeClass("active");
        $(this).addClass("active");
        toggleUserList(0);
    });
    $("#userTab_position").on("click", function () {
        $("#select_box>ul>li").removeClass("active");
        $(this).addClass("active");
        toggleUserList(1);
    });
    $("#userTab_role").on("click", function () {
        $("#select_box>ul>li").removeClass("active");
        $(this).addClass("active");
        toggleUserList(2);
    });
    function toggleUserList(type) {
        if (type == 0 && $("#userlist_depart").css("display") != "block") {//按部门
            $("#userlist_depart").css("display", "block");
            $("#userlist_position").css("display", "none");
            $("#userlist_role").css("display", "none");
            $("#userlist_search").css("display", "none");
        } else if (type == 1 && $("#userlist_position").css("display") != "block") {//按职位
            $("#userlist_depart").css("display", "none");
            $("#userlist_position").css("display", "block");
            $("#userlist_role").css("display", "none");
            $("#userlist_search").css("display", "none");
        }
        else if (type == 2 && $("#userlist_role").css("display") != "block") {//按角色
            $("#userlist_depart").css("display", "none");
            $("#userlist_position").css("display", "none");
            $("#userlist_role").css("display", "block");
            $("#userlist_search").css("display", "none");
        } else if (type == 3 && $("#userlist_search").css("display") != "block") {//搜索
            $("#userlist_depart").css("display", "none");
            $("#userlist_position").css("display", "none");
            $("#userlist_role").css("display", "none");
            $("#userlist_search").css("display", "block");
        }
    }

    //搜索框
    $("#select").on("keyup", function () {
        selectChange();
    });
    $("#select_clear").on("click", function () {
        $("#select").val("");
        selectChange();
    });
    //搜索事件处理方法
    function selectChange() {
        var val = $("#select").val();
        if (val && val != "") {
            if (!$("#select_clear").hasClass("active"))
                $("#select_clear").addClass("active");
            //模糊过滤，并重新列表排序显示
            var arr = searchFunc(val);
            $("#userlist_search").empty();
            var userlist_search = $("#userlist_search");
            toggleUserList(3);
            $.each(arr, function (index, element) {
                var html0 = template("temp_UserList_Sub", element);
                userlist_search.append(html0);
            });
        } else {
            if ($("#select_clear").hasClass("active"))
                $("#select_clear").removeClass("active");
            $("#userTab_depart").click();
        }
    }

    //检索方法
    function searchFunc(key) {
        var results = [];
        var nPos;
        $.each(user_datas.userlistSelectAll, function (index, element) {
            if (element.LoginName && typeof (element.LoginName) == 'string' && element.LoginName == key) {
                results.push(element);
            } else {
                var sTxt = element.RemarkName || '';
                nPos = fuzzySearch(key, sTxt);
                if (nPos >= 0) {
                    results.push(element);
                }
            }
        });
        return results;
    }

    //模糊匹配
    function fuzzySearch(sFind, sObj) {
        var nSize = sFind.length;
        var nLen = sObj.length;
        var sCompare;
        if (nSize <= nLen) {
            for (var i = 0; i <= nLen - nSize; i++) {
                sCompare = sObj.substring(i, i + nSize);
                if (sCompare == sFind) {
                    return i;
                }
            }
        }
        return -1;
    }

    /**
     * 对日期进行格式化，
     * @param date 要格式化的日期
     * @param format 进行格式化的模式字符串
     *     支持的模式字母有：
     *     y:年,
     *     M:年中的月份(1-12),
     *     d:月份中的天(1-31),
     *     h:小时(0-23),
     *     m:分(0-59),
     *     s:秒(0-59),
     *     S:毫秒(0-999),
     *     q:季度(1-4)
     * @return String
     * @author yanis.wang
     * @see    http://yaniswang.com/frontend/2013/02/16/dateformat-performance/
     */
    template.helper('dateFormat', function (date, format) {
        date = new Date(date);
        var localTime = date.getTime();
        var localOffset = date.getTimezoneOffset() * 60000; //获得当地时间偏移的毫秒数
        var utc = localTime + localOffset; //utc即GMT时间
        date = new Date(utc);
        var map = {
            "M": date.getMonth() + 1, //月份
            "d": date.getDate(), //日
            "h": date.getHours(), //小时
            "m": date.getMinutes(), //分
            "s": date.getSeconds(), //秒
            "q": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
            var v = map[t];
            if (v !== undefined) {
                if (all.length > 1) {
                    v = '0' + v;
                    v = v.substr(v.length - 2);
                }
                return v;
            }
            else if (t === 'y') {
                return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return format;
    });
    /**
     *JSON.stringify()
     */
    template.helper('JSONstr', function (obj) {
        return JSON.stringify(obj);
    });
});

