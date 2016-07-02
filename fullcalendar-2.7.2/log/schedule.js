$(function () {
    obj_datas.selectSource = {
        ID: uid,
        RemarkName: uname,
        Authority: 2
    };
    obj_datas.fullCalendar_DefaultSetting = {
        defaultDate: new Date(),
        aspectRatio: 1.5,
        eventLimit: true, // allow "more" link when too many events
        weekNumbers: true,
        firstDay: 0,
        header_right: 'prevYear,nextYear prev,next today month,basicWeek,basicDay,agendaWeek,agendaDay'
    };
    obj_datas.fullCalendar_Setting = {
        defaultDate: new Date(),
        aspectRatio: 1.5,
        eventLimit: true, // allow "more" link when too many events
        weekNumbers: true,
        firstDay: 0,
        header_right: 'prevYear,nextYear prev,next today month,basicWeek,basicDay,agendaWeek,agendaDay'
    };
});

/**********
 * 公用方法 begin
 * ************/
function clearForm(form) {
    // iterate over all of the inputs for the form
    // element that was passed in
    $(':input', form).each(function () {
        var type = this.type;
        var tag = this.tagName.toLowerCase(); // normalize case
        // it's ok to reset the value attr of text inputs,
        // password inputs, and textareas
        if (type == 'text' || type == 'password' || tag == 'textarea')
            this.value = "";
        // checkboxes and radios need to have their checked state cleared
        // but should *not* have their 'value' changed
        else if (type == 'checkbox' || type == 'radio')
            this.checked = false;
        // select elements need to have their 'selectedIndex' property set to -1
        // (this works for both single and multiple select elements)
        else if (tag == 'select')
            this.selectedIndex = 0;
    });
};

//**
//timestr:yyyy-MM-dd HH:mm
//**/
function DiffTimeStr(time1str, time2str) {

    if (time1str || time2str) {
        var time1 = (new Date(time1str)).Format('yyyy-MM-dd HH:mm');
        var time2 = (new Date(time2str)).Format('yyyy-MM-dd HH:mm');
        var spl = time1.split("-");
        var spl2 = spl[2].split(" ");
        var spl3 = spl2[1].split(":");
        var ll = new Date(spl[0], spl[1], spl2[0], spl3[0], spl3[1], "0", "0");

        var rep = time2.split("-");
        var rep2 = rep[2].split(" ");
        var rep3 = rep2[1].split(":");
        var mm = new Date(rep[0], rep[1], rep2[0], rep3[0], rep3[1], "0", "0");

        var time11 = ll;
        var time22 = mm;
        if (time11 > time22) {
            return 1;
        }
        else if (time11 == time22) {
            return 0;
        }
        else {
            return -1;
        }

    } else {
        return 'undefined';
    }
}

//将form中的值转换为键值对。
function getFormJson(frm) {
    var o = {};
    var a = $(frm).serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
    var localTime = this.getTime();
    var localOffset = this.getTimezoneOffset() * 60000; //获得当地时间偏移的毫秒数
    var utc = localTime + localOffset; //utc即GMT时间
    var date = new Date(utc);
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};
Date.prototype.UTC = function () {
    var date = this;
    var localTime = date.getTime();
    var localOffset = date.getTimezoneOffset() * 60000; //获得当地时间偏移的毫秒数
    var utc = localTime + localOffset; //utc即GMT时间
    return date = new Date(utc);
};
Array.prototype.find = function (key) {//查找
    var bl = false;
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i].id == key) {
            return this[i];
        }
    }
    return bl;
};
Array.prototype.remove = function (key) {//删除
    var bl = false;
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i].id == key) {
            this.splice(i, 1);
            bl = true;
        }
    }
    return bl;
};
/*******日期格式转化（兼容）*******/
function DateParse(dateStr) {
    if (!dateStr) {
        return new Date();
    }
    var str = dateStr.replace(/-/g, " ").replace(/:/g, " ").replace(/\//g, " ").replace(".", " ").split(" ");
    // console.log(str);
    date = new Date(str[0], str[1], str[2], str[3], str[4], str[5], str[6]);
    return date;
};

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
template.helper('jsonStr', function (obj) {
    return JSON.stringify(obj);
});
/**********
 * 公用方法 end
 * ************/

/********
 *fix event
 * *******/
$(function () {
   
    $("#fix_toggle").toggle(function () {
        $("#fix_newSchedule").fadeIn("slow");
        $("#fix_set").slideUp("slow");
        $("#top").slideUp("slow");
        $("#body").slideUp("slow", function () {
            $("#calendar_right").animate({width:'0%'},'slow');
            $("#calendar").animate({width:'100%'},'slow');
        });
    }, function () {
        $("#fix_newSchedule").fadeOut("slow");
        $("#fix_set").slideDown("slow");
        $("#calendar_right").animate({width:'20%'},'slow');
        $("#calendar").animate({width:'80%'},'slow',function(){
            $("#top").slideDown("slow");
            $("#body").slideDown("slow");
        });
    }).on("hover", function () {
        layer.tips("点击切换显示", this, {tips: 4});
    });
    $("#fix_newSchedule").fadeOut("fast").on("hover", function () {
        layer.tips("点击新建日程", this, { tips: 4 });
    });

    $("#fix_newSchedule").on('click', function () {
        $("#newSchedule").click();
    });
});


/********
*fullcalendar set
*********/
$(function () {
    $("#fix_set").on("click", function () {
        var content = template("temp_calendar_settting", obj_datas.fullCalendar_Setting);
        var layer_set = layer.open({
            type: 1,
            area: ['700px','500px'],
            shadeClose: true, //点击遮罩关闭
            title: '日历显示配置',
            content: content,
           // maxmin: true,
            btn: ["确认","恢复默认"],
            yes: function (layero, index) {
                var frm = $("#calendar_setting");
                obj_datas.fullCalendar_Setting.aspectRatio = $(frm).find("input[name='aspectRatio']").val();
                obj_datas.fullCalendar_Setting.weekNumbers = !!$(frm).find("a[data-name='weekNumbers']").data("value");
                obj_datas.fullCalendar_Setting.eventLimit = !!$(frm).find("a[data-name='eventLimit']").data("value");
                obj_datas.fullCalendar_Setting.firstDay = parseInt($(frm).find("a[data-name='firstDay'][data-value='true']").data("values"));
                var str = ' prev,next today ';
                var btnstr = '';
                if (!!$(frm).find("a[data-name='btn']:eq(0)").data("value")) {
                    btnstr += "prevYear";
                }
                if (!!$(frm).find("a[data-name='btn']:eq(1)").data("value")) {
                    if (btnstr == "prevYear") {
                        btnstr += ",";
                    }
                    btnstr += "nextYear";
                }
                str = btnstr + str;
                var viewstr = '';
                if (!!$(frm).find("a[data-name='view']:eq(0)").data("value")) {
                    viewstr += "month";
                }
                if (!!$(frm).find("a[data-name='view']:eq(1)").data("value")) {
                    if (viewstr.length>0) {
                        viewstr += ",";
                    }
                    viewstr += "basicWeek";
                }
                if (!!$(frm).find("a[data-name='view']:eq(2)").data("value")) {
                    if (viewstr.length > 0) {
                        viewstr += ",";
                    }
                    viewstr += "basicDay";
                }
                if (!!$(frm).find("a[data-name='view']:eq(3)").data("value")) {
                    if (viewstr.length > 0) {
                        viewstr += ",";
                    }
                    viewstr += "agendaWeek";
                }
                if (!!$(frm).find("a[data-name='view']:eq(4)").data("value")) {
                    if (viewstr.length > 0) {
                        viewstr += ",";
                    }
                    viewstr += "agendaDay";
                }
                str +=viewstr;
                obj_datas.fullCalendar_Setting.header_right = str;
                $("#calendar").fullCalendar("destroy");
                init();//重新渲染日历控件
                layer.close(layer_set);
            },
            btn2: function () {
                obj_datas.fullCalendar_Setting = obj_datas.fullCalendar_DefaultSetting;
                $("#calendar").fullCalendar("destroy");
                init();//重新渲染日历控件
                layer.close(layer_set);
            },
            success: function () {
                //为复选框加改变事件
                $.each($("a[data-name='firstDay']"), function (index, obj) {
                    if ($(obj).data("name") == 'firstDay') {//周首日设置
                        $(obj).on('click', function (e) {
                            e.stopPropagation();
                            $("a[data-name='firstDay']").each(function (index, ele) {
                                if ($(ele).hasClass('divCheckBoxSel')) {
                                $(ele).removeClass('divCheckBoxSel').addClass('divCheckBoxNoSel').attr('data-value', 'false');
                            }
                            });
                            if ($(this).hasClass('divCheckBoxNoSel')) {
                                $(this).removeClass('divCheckBoxNoSel').addClass('divCheckBoxSel').attr('data-value', 'true');
                        }
                        });
                    }
                });
                //按钮初始
                if (obj_datas.fullCalendar_Setting.header_right.indexOf("prevYear") >= 0) {
                    var checkitem = $("a[data-name='btn']:eq(0)");
                    if ($(checkitem).hasClass('divCheckBoxNoSel')) {
                        $(checkitem).removeClass('divCheckBoxNoSel').addClass('divCheckBoxSel').attr('data-value', 'true');
                    }
                }
                if (obj_datas.fullCalendar_Setting.header_right.indexOf("nextYear") >= 0) {
                    var checkitem = $("a[data-name='btn']:eq(1)");
                    if ($(checkitem).hasClass('divCheckBoxNoSel')) {
                        $(checkitem).removeClass('divCheckBoxNoSel').addClass('divCheckBoxSel').attr('data-value', 'true');
                    }
                }
                //视图初始
                if (obj_datas.fullCalendar_Setting.header_right.indexOf("month") > 0) {
                    var checkitem = $("a[data-name='view']:eq(0)");
                    if ($(checkitem).hasClass('divCheckBoxNoSel')) {
                        $(checkitem).removeClass('divCheckBoxNoSel').addClass('divCheckBoxSel').attr('data-value', 'true');
                    }
                }
                if (obj_datas.fullCalendar_Setting.header_right.indexOf("basicWeek") > 0) {
                    var checkitem = $("a[data-name='view']:eq(1)");
                    if ($(checkitem).hasClass('divCheckBoxNoSel')) {
                        $(checkitem).removeClass('divCheckBoxNoSel').addClass('divCheckBoxSel').attr('data-value', 'true');
                    }
                }
                if (obj_datas.fullCalendar_Setting.header_right.indexOf("basicDay") > 0) {
                    var checkitem = $("a[data-name='view']:eq(2)");
                    if ($(checkitem).hasClass('divCheckBoxNoSel')) {
                        $(checkitem).removeClass('divCheckBoxNoSel').addClass('divCheckBoxSel').attr('data-value', 'true');
                    }
                }
                if (obj_datas.fullCalendar_Setting.header_right.indexOf("agendaWeek") > 0) {
                    var checkitem = $("a[data-name='view']:eq(3)");
                    if ($(checkitem).hasClass('divCheckBoxNoSel')) {
                        $(checkitem).removeClass('divCheckBoxNoSel').addClass('divCheckBoxSel').attr('data-value', 'true');
                    }
                }
                if (obj_datas.fullCalendar_Setting.header_right.indexOf("agendaDay") > 0) {
                    var checkitem = $("a[data-name='view']:eq(4)");
                    if ($(checkitem).hasClass('divCheckBoxNoSel')) {
                        $(checkitem).removeClass('divCheckBoxNoSel').addClass('divCheckBoxSel').attr('data-value', 'true');
                    }
                }
            }
        });
    }).on("hover", function () {
        layer.tips("点击配置日历显示", this, { tips: 4 });
    });
    init();//渲染日历控件
});

/**
 * userlist
 * */
$(function () {
        //ajax取其他未开权限用户列表
        function ajax_unAuthorityList() {
            $.ajax({
                type: 'post',
                url: obj_datas.unAuthorityUser_url,
                dataType: 'script',
                success: function (data) {
                    if (data != 'False') {
                        var results = JSON.parse(data);
                        obj_datas.ls_userlist = [];
                        $.each(results, function (index, result) {
                            var obj = {
                                ID: result.ID,
                                RemarkName: result.RemarkName,
                                Data: JSON.stringify({
                                    ID: result.ID,
                                    RemarkName: result.RemarkName
                                })
                            };
                            obj_datas.ls_userlist.push(obj);
                        });
                        //alert( JSON.stringify(obj_datas.ls_userlist));
                        //layer.msg("获取用户信息成功！");
                    } else {
                        layer.msg("获取用户信息失败！");
                    }
                },
                error: function (result) {
                    layer.msg(JSON.stringify(result));
                }
            });
        }

        ajax_unAuthorityList();
        //ajax取所有操作用户列表
        function ajax_AuthorityUser() {
            $.ajax({
                type: 'post',
                url: obj_datas.AuthorityUser_url,
                dataType: 'text',
                success: function (data) {
                    if (data != 'False') {
                        var results = JSON.parse(data);
                        var userlist_check = $("#userlist_check");
                        var userlist_settting = $("#userlist_settting");
                        obj_datas.userlistAll = [];
                        obj_datas.userlist_edit = [];
                        obj_datas.userlist_settting = [];
                        userlist_check.empty();
                        userlist_settting.empty();
                        if (results.userlist_settting.length > 0) {
                            $.each(results.userlist_settting, function (index, element) {//共享权限用户列表
                                element.Data = JSON.stringify({//mydata存储数据
                                    ID: element.ID,
                                    RemarkName: element.RemarkName,
                                    Authority: element.Authority,
                                    Type: 1
                                });
                                element.LoginName = element.RemarkName.substring(element.RemarkName.length - 1, element.RemarkName.length);
                                obj_datas.userlist_settting.push(element);
                                obj_datas.userlistAll.push(element);//所有用户推入基础数据中

                                var html0 = template("temp_UserList_Sub", element);//共享设置列表
                                userlist_settting.append(html0);
                            });
                        } else {
                            userlist_settting.append("数据加载失败或无数据！请刷新重试！");
                        }
                        if (results.userlist_edit.length > 0) {
                            $.each(results.userlist_edit, function (index, element) {//编辑查看用户列表
                                element.Data = JSON.stringify({//mydata存储数据
                                    ID: element.ID,
                                    RemarkName: element.RemarkName,
                                    Authority: element.Authority,
                                    Type: 0
                                });
                                element.LoginName = element.RemarkName.substring(element.RemarkName.length - 1, element.RemarkName.length);
                                obj_datas.userlist_edit.push(element);
                                obj_datas.userlistAll.push(element);//所有用户推入基础数据中
                                var html1 = template("temp_UserList_Sub", element);//查看人列表
                                userlist_check.append(html1);
                            });
                        } else {
                            userlist_settting.append("数据加载失败或无数据！请刷新重试！");
                        }
                        // alert(JSON.stringify(obj_datas));
                       // layer.msg("获取权限信息成功！");
                    } else {
                        layer.msg("获取权限信息失败！");
                    }
                },
                error: function (result) {
                    layer.msg(JSON.stringify(result));
                }
            });
        }

        ajax_AuthorityUser();

        //共享设置添加成员
        $("#setting_adduser").on("click", function () {
            if (!!!obj_datas.ls_userlist || obj_datas.ls_userlist.length == 0) { layer.msg("数据获取失败或没有未开权限的人员！"); return; }
            var alert_content = template("temp_selectuser", {userlist: obj_datas.ls_userlist});
            var layer_user = layer.open({
                type: 1,
                area: ['700px','500px'],
                shadeClose: true, //点击遮罩关闭
                title: '选择人员',
                content: alert_content,
                scrollbar: true,
               // maxmin: true,
                btn: ["确认"],
                yes: function (layero, index) {
                    //复选框取值
                    var frm = $("#selectuser_from");
                    var selectlist = [];//选中人员列表
                    $.each(frm.find("a[data-type='checkbox']"), function (index, obj) {
                        if ($(obj).attr('data-value') == 'true') {
                            var user = JSON.parse($(obj).attr('data-mydata'));
                            selectlist.push({
                                ID: user.ID,
                                RemarkName: user.RemarkName
                            })
                        }
                    });
                    if (selectlist.length > 0) {//上传数据库
                        var ajax_options = {
                            url: frm.action,
                            type: frm.method,
                            beforeSubmit: function () {
                                layer.msg('成功提交服务器处理！请耐心等待！');
                                return true;
                            },
                            data: {obj: JSON.stringify(selectlist)},
                            success: function (result) {
                                // layer.msg(JSON.stringify(result));
                                ajax_unAuthorityList();//刷新未开权限用户列表
                                ajax_AuthorityUser();//刷新权限用户列表
                                layer.close(layer_user);
                            },
                            error: function (result) {
                                layer.msg(JSON.stringify(result));
                                layer.close(layer_user);
                            }
                        };
                        frm.ajaxSubmit(ajax_options);

                    } else {
                        layer.msg('没有选择人员！');
                    }
                }
            });
        });

        //用户列表点击处理,切换过滤数据
        function filter_user() {
            obj_datas.selectSource = eval($(this).data("mydata"));
            layer.msg("正在获取数据，请稍等...");
            $("#calendar").fullCalendar("refetchEvents");//刷新数据源
        }

        //权限设置弹窗
        function setting_view() {
            var selectUser = eval($(this).data("mydata"));
            var content = template("temp_authority", selectUser);
            var layer_authority = layer.open({
                type: 1,
                area: ['600px','500'],
                shadeClose: true, //点击遮罩关闭
                scrollbar: false,
                btn: ["确认", "删除"],
                title: '设置权限',
                content: content,
                yes: function (layero, index) {
                    var frm = $("#editAuthority_from");
                    var param = {};
                    param.authority = $("#editAuthority_from div input:radio[name='auth'][checked='checked']").val();
                    param.uid = $("#editAuthority_from div input:hidden[name='uid']").val();
                    if (param.authority && param.uid && param.uid > 0) {
                        var ajax_options = {
                            url: frm.action,
                            type: frm.method,
                            beforeSubmit: function () {
                                layer.msg('成功提交服务器处理！请耐心等待！');
                                return true;
                            },
                            data: param,
                            success: function (result) {
                                //layer.msg(JSON.stringify(result));
                                if (result != "False") {
                                    ajax_unAuthorityList();//刷新未开权限用户列表
                                    ajax_AuthorityUser();//刷新权限用户列表
                                    layer.close(layer_authority);
                                }
                                layer.msg("修改权限失败！请查对后重试！");
                            },
                            error: function (result) {
                                layer.msg(JSON.stringify(result));
                                layer.close(layer_authority);
                            }
                        };
                        frm.ajaxSubmit(ajax_options);
                    }
                    // layer.msg(JSON.stringify((param)));
                },
                btn2: function () {
                    layer.confirm("确认删除此用户权限？", {icon: 3, title: '删除'}, function (index) {
                        var param = {};
                        param.uid = selectUser.ID;
                        if (param.uid && param.uid > 0) {
                            var ajax_options = {
                                url: obj_datas.authoritydel_url,
                                type: 'post',
                                data: param,
                                success: function (result) {
                                    layer.msg(JSON.stringify(result));
                                    if (result != "False") {
                                        ajax_unAuthorityList();//刷新未开权限用户列表
                                        ajax_AuthorityUser();//刷新权限用户列表
                                        layer.msg('删除成功！');
                                    } else {
                                        layer.msg("删除权限失败！请查对后重试！");
                                    }
                                },
                                error: function (result) {
                                    layer.msg(JSON.stringify(result));
                                }
                            };
                            $.ajax(ajax_options);
                        }
                    });
                },
                success: function () {
                    $(".layui-layer-btn1").addClass("remove");
                    $("#editAuthority_from div input:radio:eq(" + selectUser.Authority + ")").attr("checked", "checked");
                    $("#editAuthority_from div input:radio").on("click", function () {
                        $("#editAuthority_from div input:radio").removeAttrs("checked");
                        $(this).attr("checked", "checked");
                    });
                }

            });
        }

        //用户列表点击事件
        $("#userlist_check").delegate("li", "click", function (event) {
            event.stopPropagation();
            $("#userlist_check>li.active").removeClass("active");
            $(this).addClass("active");
            filter_user.call(this);//刷新数据，更新当前显示用户
        });

        $("#userlist_settting").delegate("li", "click", function (event) {
            event.stopPropagation();
            $("#userlist_settting>li.active").removeClass("active");
            $(this).addClass("active");
            setting_view.call(this);//设置权限
        });

        $("#userlist_search").delegate("li", "click", function (event) {
            event.stopPropagation();
            $("#userlist_search>li.active").removeClass("active");
            $(this).addClass("active");
            var type = (eval($(this).data("mydata"))).Type;
            if (type == 1) {
                setting_view.call(this);//设置权限
            } else {
                filter_user.call(this);//搜索结果处理，检测权限操作，弹窗或刷新数据或用户自选择（编辑日程，查看日程，设置权限）
            }
        });

        $("#userTab_depart").on("click", function () {
            $("#select_box>ul>li").removeClass("active");
            $(this).addClass("active");
            toggleUserList(0);
        });
        $("#userTab_often").on("click", function () {
            $("#select_box>ul>li").removeClass("active");
            $(this).addClass("active");
            toggleUserList(1);
        });
        function toggleUserList(type) {
            if (type == 0 && $("#userlist_check").css("display") != "block") {//组织架构
                $("#userlist_settting").css("display", "none");
                $("#userlist_check").css("display", "block");
                $("#userlist_search").css("display", "none");
            } else if (type == 1 && $("#userlist_settting").css("display") != "block") {//最常联系
                $("#userlist_check").css("display", "none");
                $("#userlist_settting").css("display", "block");
                $("#userlist_search").css("display", "none");
            }
            else if (type == 2 && $("#userlist_search").css("display") != "block") {//搜索结果
                $("#userlist_check").css("display", "none");
                $("#userlist_settting").css("display", "none");
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
            // layer.msg(val);
            if (val && val != "") {
                if (!$("#select_clear").hasClass("active"))
                    $("#select_clear").addClass("active");
                //模糊过滤，并重新列表排序显示
                var arr = searchFunc(val);
                $("#userlist_search").empty();
                var userlist_search = $("#userlist_search");
                toggleUserList(2);
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
            $.each(obj_datas.userlistAll, function (index, element) {
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

        //共享设置hover处理
        $("#userTab_often").hover(function () {
            if (!$("#setting_adduser").hasClass("active"))
                $("#setting_adduser").addClass("active");
        }, function () {
            if ($("#setting_adduser").hasClass("active"))
                $("#setting_adduser").removeClass("active");
        });

        //拖动事件收展
        $("#wrap").slideUp(2000);
        $("#newSchedule").hover(function () {
            $("#wrap").stop().slideDown(800);
        }, function () {
            $("#wrap").stop().slideUp(800);
        });
        $("#wrap").hover(function () {
            $("#wrap").stop().slideDown(800);
        }, function () {
            $("#wrap").stop().delay(2000).slideUp(800);
        });
    }
);

/**
 * Tab切换，数据过滤
 * */
var tab = {
    arrTabs: [],
    selectTab: null,
    createTab: function (id, name, viewname, type, color, bgcolor) {
        var tabObj = {};
        tabObj.id = id;
        tabObj.name = name;
        tabObj.viewname = viewname;
        tabObj.type = type;
        tabObj.color = color;
        tabObj.bgcolor = bgcolor;
        this.arrTabs.push(tabObj);
    },
    changeTab: function (obj, id) {
        $("#mybtnlist li button").removeClass("active");
        try {
            if (this.arrTabs.find(id)) {
                this.selectTab = this.arrTabs.find(id);
                obj_datas.eventType = id;
                $("#calendar").fullCalendar("refetchEvents");//刷新数据源
                $(obj).addClass("active");
            }
        } catch (e) {
            console.log(e);
            this.selectTab = this.arrTabs[0];
            obj_datas.eventType = 0;
            $("#mybtnlist li button:eq(0)").addClass("active");
        }
    },
    init: function () {
        this.createTab(0, 'all', "所有", 0, 'white', 'blue');
        this.createTab(1, 'task', "任务", 1, 'white', 'green');
        // this.createTab(2, 'plan', "计划", 2, 'blue', 'yellow');
        this.createTab(3, 'meeting', "会议", 3, 'white', 'purple');
        this.createTab(4, 'schedule', "日程", 4, 'white', 'black');
        this.createTab(5, 'attendance', "考勤", 5, 'white', "red");
        this.selectTab = this.arrTabs[0];
        this.render();
    },
    render: function () {
        if (this.arrTabs.length > 0) {
            $("#mybtnlist").empty();

            $.each(this.arrTabs, function (i, ele) {
                var content = template("temp_btnlist", ele);
                $("#mybtnlist").append(content);
            });
        }
    },
    find: function (id) {
        return this.arrTabs.find(id);
    }
};
tab.init();


/**
 * fullcalendar配置
 * */
function init() {
    /**日程详情***/
    var view_details = {
        task: function (data) {
            var content = template("temp_task_details", data);
            this.render(content);
        },
        schedule: function (data, event) {
            obj_datas.item = eval(data);
            obj_datas.editevent = event;
            obj_datas.item.Notice = obj_datas.item.NeedNotice ? 1 : 0;
            var content = template("temp_schedule_edit", obj_datas.item);
            var open = layer.open({
                type: 1,
                area: ['700px','500px'],
                shadeClose: true, //点击遮罩关闭
                title: '编辑日程',
                content: content,
                btn: ["保存", "删除"],
                yes: function (index, layero) {//保存
                    var frm = $("#edit_Form");
                    preSubmit2(frm);
                    var param = {
                        obj: JSON.stringify(obj_datas.item)
                    };
                    var ajax_options = {
                        url: frm.action,
                        type: frm.method,
                        beforeSubmit: function () {
                            var check = preSubmit2(frm);
                            if (check && param && param.obj && param.obj.trim() != '') {
                                layer.msg("表单验证失败请查对后提交！");
                                return false;
                            }
                        },
                        data: param,
                        success: function (result) {
                            if (result != "False") {
                                // var event = eval(result);
                                if (!obj_datas.editevent) {
                                    $("#calendar").fullCalendar("refetchEvents");
                                }
                                if (!$("#calendar").fullCalendar("updateEvent", event)) {
                                    $("#calendar").fullCalendar("refetchEvents");
                                }
                                layer.close(open);
                            } else {
                                layer.msg("保存失败！请检查数据权限等是否正确！");
                            }
                        },
                        error: function (result) {
                            layer.msg(JSON.stringify(result));
                        }
                    };
                    frm.ajaxSubmit(ajax_options);
                    //layer.close(open);
                },
                btn2: function () {
                    layer.confirm("确认删除该日程？", {icon: 3, title: '删除'}, function () {
                        var param = {};
                        param.eventid = obj_datas.item.ID;
                        if (param.eventid && param.eventid > 0) {
                            var ajax_options = {
                                url: obj_datas.eventdel_url,
                                type: 'post',
                                data: param,
                                success: function (result) {
                                    if (result != "False") {
                                        if (!obj_datas.editevent) {
                                            $("#calendar").fullCalendar("refetchEvents");
                                        }
                                        if (!$("#calendar").fullCalendar("removeEvent", event)) {
                                            $("#calendar").fullCalendar("refetchEvents");
                                        }
                                        layer.msg('删除成功！');
                                    } else {
                                        layer.msg("删除失败！");
                                    }
                                },
                                error: function (result) {
                                    layer.msg(JSON.stringify(result));
                                }
                            };
                            $.ajax(ajax_options);
                            layer.close(open);
                        }
                    });
                },
                success: function () {
                    $(".layui-layer-btn1").addClass("remove");

                    var a = $("#datetime1").datetimepicker({
                        language: 'zh-CN',
                        minuteStep: 15
                    }).on("click", function (ev) {
                        $("#datetime1").datetimepicker("setEndDate", $("#datetime2").val());
                    });
                    var b = $("#datetime2").datetimepicker({
                        language: 'zh-CN',
                        minuteStep: 15
                    }).on("click", function (ev) {
                        $("#datetime2").datetimepicker("setStartDate", $("#datetime1").val());
                    });
                    var c = $("#datetime3").datetimepicker({
                        language: 'zh-CN',
                        minuteStep: 5

                    }).on("click", function (ev) {
                        $("#datetime3").datetimepicker("setStartDate", $("#datetime1").val()).datetimepicker("setEndDate", $("#datetime2").val());
                    });

                    //日期改变处理
                    $("#datetime1").on("change", function () {
                        $(".datetimepicker-dropdown-bottom-right").css("display", "none");

                        var time1 = $("#datetime1").val();
                        var time2 = $("#datetime2").val();
                        var time3 = $("#datetime3").val();
                        if (DiffTimeStr(time1, time2) && DiffTimeStr(time1, time2) > 0) {
                            $("#datetime2").val(time1);
                        }
                        if (DiffTimeStr(time1, time3) && DiffTimeStr(time1, time3) > 0) {
                            $("#datetime3").val(time1);
                        }
                    });
                    $("#datetime2").on("change", function () {
                        $(".datetimepicker-dropdown-bottom-right").css("display", "none");
                        var time1 = $("#datetime1").val();
                        var time2 = $("#datetime2").val();
                        var time3 = $("#datetime3").val();
                        if (DiffTimeStr(time1, time2) && DiffTimeStr(time1, time2) > 0) {
                            $("#datetime1").val(time2);
                        }
                        if (DiffTimeStr(time3, time2) && DiffTimeStr(time3, time2) > 0) {
                            $("#datetime3").val(time2);
                        }

                    });
                    $("#datetime3").on("change", function () {
                        $(".datetimepicker-dropdown-bottom-right").css("display", "none");
                        var time1 = $("#datetime1").val();
                        var time2 = $("#datetime2").val();
                        var time3 = $("#datetime3").val();
                        if (DiffTimeStr(time1, time3) && DiffTimeStr(time1, time3) > 0) {
                            $("#datetime1").val(time3);
                        }
                        if (DiffTimeStr(time3, time2) && DiffTimeStr(time3, time2) > 0) {
                            $("#datetime2").val(time3);
                        }

                    });
                    //提醒方式改变处理
                    $("#notice").on("change", function () {
                        // layer.msg(this.value);
                        if (this.value < 1) {
                            if ($("#datetime3").css('display') == 'block') {
                                $("#datetime3").css('display', 'none')
                            }
                        } else {
                            if ($("#datetime3").css('display') == 'none') {
                                $("#datetime3").css('display', 'block')
                            }
                        }
                    });


                    //初始加载表单数据——特殊处理的部分
                    //1.时间格式化：yyyy-MM-dd hh:mm
                    $("#datetime1").val((new Date(obj_datas.item.StartTime)).Format('yyyy-MM-dd HH:mm'));
                    $("#datetime2").val((new Date(obj_datas.item.EndTime)).Format('yyyy-MM-dd HH:mm'));
                    $("#datetime3").val((new Date(obj_datas.item.NoticeTime)).Format('yyyy-MM-dd HH:mm'));
                    //2.Notice到期提醒 select
                    var opts = $("#notice option:eq(" + obj_datas.item.Notice + ")").attr("selected", "selected");
                    if (obj_datas.item.Notice > 0) {
                        //提醒时间显示
                        if ($("#datetime3").css('display') == 'none') {
                            $("#datetime3").css('display', 'block')
                        }
                    }

                    //为复选框加改变事件
                    $.each($("a[data-type='checkbox']"), function (index, obj) {
                        if ($(obj).data("name") == 'IsAllDays') {//全天
                            $(obj).on('click', function () {
                                if ($(this).attr('data-value') == 'false') {
                                    dateForart2();
                                } else {
                                }
                            });
                            //4.全天选中时，起止日期去掉时间
                            if ($(obj).attr("data-value") == 'true') {
                                dateForart2();
                            }
                        }
                    });
                    ////textarea hover
                    //$("#edit_Form").find("textarea[name='Title']").on("focus", function () {
                    //    var str = $(this).val();
                    //    if (str.trim() == '日程内容') {
                    //        $(this).val('');
                    //        $(this).css('color', 'black');
                    //    }
                    //    $(this).removeClass('error');
                    //}).on('blur', function () {
                    //    var str = $(this).val();
                    //    if (str.trim() == '') {
                    //        $(this).addClass('error');
                    //    } else {
                    //        $(this).css('color', 'black');
                    //    }
                    //});
                    //var content = $("#edit_Form").find("textarea[name='Title']").val();
                    //if (content.trim() == '') {
                    //    $("#edit_Form").find("textarea[name='Title']").val('日程内容');
                    //    $("#edit_Form").find("textarea[name='Title']").css('color', 'grey');
                    //}
                    //else if (content.trim() == '日程内容') {
                    //    $("#edit_Form").find("textarea[name='Title']").css('color', 'grey');
                    //}
                    //表单验证
                    $("#edit_Form").validate({
                        rules: {
                            Title: {
                                required: true,
                                maxlength: 50,
                                minlength: 1
                            }
                        }
                    });
                },
                closeBtn: 2,
               // maxmin: true,
                scrollbar: false,
                shift: 0
            });
        },
        plan: function (data) {
            var content = template("temp_task_details", data);
            this.render(content);
        },
        meetting: function (data) {
            var content = template("temp_task_details", data);
            this.render(content);
        },
        render: function (content) {
            layer.open({
                type: 1,
                area: ['700px', "500"],
                shadeClose: true, //点击遮罩关闭
                content: content,
                scrollbar: false,
                btn: ["确认"],
                yes: function () {
                    //提交表单

                },
                shift: 0
            });
        }
    };

    var addEvent;//公用变量，添加事件对象
    
        $('#calendar').fullCalendar({
            events: {
                url: obj_datas.events_url,
                type: 'post',
                data: {
                    Event_type: function () {
                        return obj_datas.eventType;
                    }, Uid: function () {
                        return obj_datas.selectSource.ID;
                    }
                },
                success: function (data) {
                    //layer.msg("数据获取成功！");
                },
                error: function (result) {
                    layer.msg("数据获取失败，请刷新重试...");
                },
                catch: true
            },
            header: {
                left: '',
                center: 'title',
                right: obj_datas.fullCalendar_Setting.header_right
            },
            ignoreTimezone: false,
            defaultDate: obj_datas.fullCalendar_Setting.defaultDate,
            aspectRatio: obj_datas.fullCalendar_Setting.aspectRatio,
            editable: false,
            eventLimit: obj_datas.fullCalendar_Setting.eventLimit, // allow "more" link when too many events
            weekNumbers: obj_datas.fullCalendar_Setting.weekNumbers,
            loading: function (bool) {
                $('#loading').toggle(bool);
            },
            eventRender: function (calEvent, element, view) {
                $(element).css("cursor", "pointer");
            },
            eventClick: function (calEvent, jsEvent, view) {
                //日程编辑，查看事件类型，查看权限，过滤时间
                if (calEvent.EventType == 4 && obj_datas.selectSource.Authority == 2 && (calEvent.start > new Date())) {
                    view_details.schedule(calEvent.Data);
                }
            },

            eventDbClick: function (calEvent, jsEvent, view) {
            },
            dayClick: function (dayDate, allDay, jsEvent, view) {
                //二次点击
                if ((new Date(dayDate)).getUTCDate() === (new Date(obj_datas.selectTimeSpan.start)).getUTCDate()) {
                    //切换显示日期
                    $('#calendar').fullCalendar('gotoDate', obj_datas.selectTimeSpan.start);
                    //切换视图
                    $('#calendar').fullCalendar('changeView', "basicDay");
                    //$('#calendar').fullCalendar('changeView', "basicWeek");
                }
            },
            eventMouseover: function (calEvent, jsEvent, view) {
                var that = this;
                calEvent.EventViewName = tab.find(calEvent.EventType).viewname;
                var content = template("temp_tip_event", calEvent);
                addEvent = layer.tips(content, that, {
                    tips: [2, '#eee']
                });
            },
            eventMouseout: function (calEvent, jsEvent, view) {
            },
            selectable: true,
            unselectAuto: false,
            select: function (startDate, endDate, allDay, jsEvent, view) {
                obj_datas.selectTimeSpan.start = startDate;
                obj_datas.selectTimeSpan.end = endDate;
            },
            firstDay: obj_datas.fullCalendar_Setting.firstDay,
            handleWindowResize: true
        });
   
    $("#calendar").find("td.fc-week-number>span").css("cursor", "pointer");
    $("#calendar").find("td.fc-week-number").css("cursor", "pointer").live("click", function () {
        if ($(this).html() == "") {//fc-bg
            //var tt = this;
            //console.log($(this).next().html());
            // console.log($(this).parent("div.fc-bg").parent("div.fc-row.fc-week").find("div.fc-content-skeleton>table>thead>tr>td.fc-week-number>span"));
            // layer.msg($(this).parent("div.fc-bg").parent("div.fc-row.fc-week").find("div.fc-content-skeleton>table>thead>tr>td.fc-week-number>span").html());
        } else {//fc-content-skeleton
            changeWeekView(Number($(this).find("span").html()));
        }
    });
    /********通过周数改变周视图*********/
    function changeWeekView(weekNumber) {
        //切换显示日期
        var year = (new Date($("#calendar").fullCalendar("getDate"))).getFullYear();
        if (year == (new Date).getFullYear()) {
            $('#calendar').fullCalendar('gotoDate', dateFromWeek(year, weekNumber + 1, 0));
        } else {
            $('#calendar').fullCalendar('gotoDate', dateFromWeek(year, weekNumber, 0));
        }
        //切换视图
        $('#calendar').fullCalendar('changeView', "basicWeek");
    }

    /******根据周数转化为日期******/
    function dateFromWeek(year, week, day) {
        //   year       年
        //   week       周
        //   day         星期   (0-6,   0代表周日)
        var date1 = new Date(year, 0, 1);
        var dayMS = 24 * 60 * 60 * 1000;
        var firstDay = (7 - date1.getDay()) * dayMS;
        var weekMS = (week - 2) * 7 * dayMS;
        var result = date1.getTime() + firstDay + weekMS + day * dayMS;
        date1.setTime(result);
        return date1;
    }

    $("#external-events .fc-event").each(function () {//依赖jquery UI
        var _this = this;
        // store data so the calendar knows to render an event upon drop
        $(_this).data('event', {
            title: $.trim($(this).text()), // use the element's text as the event title
            stick: true // maintain when user navigates (see docs on the renderEvent method)
        });

        // make the event draggable using jQuery UI
        $(_this).draggable({
            zIndex: 999,
            revert: true,      // will cause the event to go back to its
            revertDuration: 0  //  original position after the drag
        });
    });

}

function layer_Schedule() {
    var content = template("temp_schedule", obj_datas.item);
    var open = layer.open({
        type: 1,
        area: ['700px','500px'],
        shadeClose: true, //点击遮罩关闭
        title: '新建日程',
        content: content,
        btn: ["保存"],
        yes: function (index, layero) {//确认
            var frm = $("#create_Form");
            preSubmit(frm);
            var param = {
                obj: JSON.stringify(obj_datas.item)
            };
            var ajax_options = {
                url: frm.action,
                type: frm.method,
                clearForm: true,
                beforeSubmit: function () {
                    var check = preSubmit(frm);
                    if (check && param && param.obj && param.obj.trim() != '') {
                        layer.msg("表单验证失败请查对后提交！");
                        return false;
                    }
                },
                data: param,
                success: function (result) {
                    if (result != "False") {
                        $("#calendar").fullCalendar("refetchEvents");
                        layer.close(open);
                    } else {
                        layer.msg("保存失败！请检查数据权限等是否正确！");
                        layer.close(open);
                    }
                },
                error: function (result) {
                    layer.msg(JSON.stringify(result));
                }
            };
            frm.ajaxSubmit(ajax_options);
        },
        success: function () {
            var a = $("#datetime1").datetimepicker({
                language: 'zh-CN',
                minuteStep: 15
            }).on("click", function (ev) {
                $("#datetime1").datetimepicker("setEndDate", $("#datetime2").val());
            });
            var b = $("#datetime2").datetimepicker({
                language: 'zh-CN',
                minuteStep: 15
            }).on("click", function (ev) {
                $("#datetime2").datetimepicker("setStartDate", $("#datetime1").val());
            });
            var c = $("#datetime3").datetimepicker({
                language: 'zh-CN',
                minuteStep: 5
            }).on("click", function (ev) {
                $("#datetime3").datetimepicker("setStartDate", $("#datetime1").val()).datetimepicker("setEndDate", $("#datetime2").val());
            });

            //日期改变处理
            $("#datetime1").on("change", function () {
                $(".datetimepicker-dropdown-bottom-right").css("display", "none");

                var time1 = $("#datetime1").val();
                var time2 = $("#datetime2").val();
                var time3 = $("#datetime3").val();
                if (DiffTimeStr(time1, time2) && DiffTimeStr(time1, time2) > 0) {
                    $("#datetime2").val(time1);
                }
                if (DiffTimeStr(time1, time3) && DiffTimeStr(time1, time3) > 0) {
                    $("#datetime3").val(time1);
                }
            });
            $("#datetime2").on("change", function () {
                $(".datetimepicker-dropdown-bottom-right").css("display", "none");
                var time1 = $("#datetime1").val();
                var time2 = $("#datetime2").val();
                var time3 = $("#datetime3").val();
                if (DiffTimeStr(time1, time2) && DiffTimeStr(time1, time2) > 0) {
                    $("#datetime1").val(time2);
                }
                if (DiffTimeStr(time3, time2) && DiffTimeStr(time3, time2) > 0) {
                    $("#datetime3").val(time2);
                }

            });
            $("#datetime3").on("change", function () {
                $(".datetimepicker-dropdown-bottom-right").css("display", "none");
                var time1 = $("#datetime1").val();
                var time2 = $("#datetime2").val();
                var time3 = $("#datetime3").val();
                if (DiffTimeStr(time1, time3) && DiffTimeStr(time1, time3) > 0) {
                    $("#datetime1").val(time3);
                }
                if (DiffTimeStr(time3, time2) && DiffTimeStr(time3, time2) > 0) {
                    $("#datetime2").val(time3);
                }

            });
            //提醒方式改变处理
            $("#notice").on("change", function () {
                //  layer.msg(this.value);
                if (this.value < 1) {
                    if ($("#datetime3").css('display') == 'block') {
                        $("#datetime3").css('display', 'none')
                    }
                } else {
                    if ($("#datetime3").css('display') == 'none') {
                        $("#datetime3").css('display', 'block')
                    }
                }
            });


            //初始加载表单数据——特殊处理的部分
            //0.检查选择的日期是否早于今天
            var timenow = new Date();
            if (timenow > obj_datas.selectTimeSpan.start) {
                //var timenow=new Date(dateStr1);
                //var timenow2=new Date(dateStr2);
                //obj_datas.selectTimeSpan.start=new Date(timenow.getTime()-timenow.getTimezoneOffset()* 60000);
                //obj_datas.selectTimeSpan.end=new Date(timenow2.getTime()-timenow2.getTimezoneOffset()* 60000);
                obj_datas.selectTimeSpan.start = dateStr1;
                obj_datas.selectTimeSpan.end = dateStr2;
            }
            //1.时间格式化：yyyy-MM-dd hh:mm
            $("#datetime1").val((new Date(obj_datas.selectTimeSpan.start)).Format('yyyy-MM-dd HH:mm'));
            $("#datetime2").val((new Date(obj_datas.selectTimeSpan.end)).Format('yyyy-MM-dd HH:mm'));
            $("#datetime3").val((new Date(obj_datas.selectTimeSpan.end)).Format('yyyy-MM-dd HH:mm'));
            //2.Notice到期提醒 select
            var opts = $("#notice option:eq(" + obj_datas.item.Notice + ")").attr("selected", "selected");
            if (obj_datas.item.Notice == 1) {
                //提醒时间显示
                if ($("#datetime3").css('display') == 'none') {
                    $("#datetime3").css('display', 'block')
                }
            }
            //为复选框加改变事件
            $.each($("a[data-type='checkbox']"), function (index, obj) {
                if ($(obj).data("name") == 'JustYou') {//仅自己可见
                    $(obj).on('click', function () {
                        if ($(this).attr('data-value') == 'false') {
                            $("#userlist").css("display", "none");
                        } else {
                            $("#userlist").css("display", "block");
                        }
                    });
                    //3.仅自己可见选中时，选择人员列表不显示
                    if ($(obj).attr("data-value") == 'true') {
                        $("#userlist").css("display", "none");
                    }
                }
                if ($(obj).data("name") == 'IsAllDays') {//全天
                    $(obj).on('click', function () {
                        if ($(this).attr('data-value') == 'false') {
                            dateForart2();
                        } else {

                        }
                    });
                    //4.全天选中时，起止日期去掉时间
                    if ($(obj).attr("data-value") == 'true') {
                        dateForart2();
                    }
                }
            });
            ////textarea hover
            //$("#create_Form").find("textarea[name='Title']").on("focus", function () {
            //    var str = $(this).val();
            //    if (str.trim() == '日程内容') {
            //        $(this).val('');
            //        $(this).css('color', 'black');
            //    }
            //    $(this).removeClass('error');
            //}).on('blur', function () {
            //    var str = $(this).val();
            //    if (str.trim() == '') {
            //        $(this).addClass('error');
            //    } else {
            //        $(this).css('color', 'black');
            //    }
            //
            //});
            //var content = $("#create_Form").find("textarea[name='Title']").val();
            //if (content.trim() == '') {
            //    $("#create_Form").find("textarea[name='Title']").val('日程内容');
            //    $("#create_Form").find("textarea[name='Title']").css('color', 'grey');
            //}
            //else if (content.trim() == '日程内容') {
            //    $("#create_Form").find("textarea[name='Title']").css('color', 'grey');
            //}
            //多选列表
            //$("#userlist").popSelect({
            //    showTitle: false,
            //    placeholderText: '点击选择人员',
            //    position:'top'
            //});
            //$("#userlist").multiselect({
            //    noneSelectedText: "==请选择==",
            //    checkAllText: "全选",
            //    uncheckAllText: '全不选',
            //});

            //表单验证
            $("#create_Form").validate({
                rules: {
                    Title: {
                        required: true,
                        maxlength: 50,
                        minlength:1
                    }
                }
            });

        },
        closeBtn: 2,
        //maxmin: true,
        scrollbar: false,
        shift: 0
    });
}

function preSubmit(frm) {

    //检查表单数据
    if (!frm.validate()) {
        return true;
    }
    //赋值
    var jsonfrm = getFormJson(frm);
    try {
        if (jsonfrm.Title.trim() == '' || jsonfrm.StartTime.trim() == '' || jsonfrm.EndTime.trim() == '' || jsonfrm.NoticeTime.trim() == '' || isNaN(Number(jsonfrm.Notice))) {
            return true;
        }
        obj_datas.item.Title = jsonfrm.Title;
        obj_datas.item.StartTime = jsonfrm.StartTime;
        obj_datas.item.EndTime = jsonfrm.EndTime;
        obj_datas.item.Notice = parseInt(jsonfrm.Notice);
        obj_datas.item.NoticeTime = jsonfrm.NoticeTime;

        //复选框取值
        $.each($(frm).find("a[data-type='checkbox']"), function (index, obj) {
            if ($(obj).data("name") == 'IsAllDays') {//全天
                if ($(obj).attr('data-value') == 'false') {
                    obj_datas.item.IsAllDays = false;
                } else {
                    obj_datas.item.IsAllDays = true;
                }
            }
            if ($(obj).data("name") == 'JustYou') {//仅自己可见
                if ($(obj).attr('data-value') == 'false') {
                    obj_datas.item.JustYou = false;
                } else {
                    obj_datas.item.JustYou = true;
                }
            }
        });
        //用户列表取值

        if (!obj_datas.item.JustYou) {
            var obj = $("#userlist").val();
            if (obj == null) {
                layer.msg('请选择至少一个所属人！');
                return true;
            }
            if (obj_datas.item.UserList.length > 0) {
                var userlist = [];
                for (var i = 0; i < obj.length; i++) {
                    for (var j = 0; j < obj_datas.item.UserList.length; j++) {
                        if (obj[i] == obj_datas.item.UserList[j].ID) {
                            userlist.push(obj_datas.item.UserList[j]);
                            continue;
                        }
                    }
                }
                obj_datas.item.UserList = userlist;
            } else {
                layer.msg('当前可操作用户列表为空');
                return true;
            }
        }
    } catch (e) {
        layer.msg(e.toString());
        return true;
    }
}

function preSubmit2(frm) {
    //检查表单数据
    if (!frm.validate()) {
        return true;
    }
    //赋值
    var jsonfrm = getFormJson(frm);
    try {
        if (jsonfrm.Title.trim() == '' || jsonfrm.StartTime.trim() == '' || jsonfrm.EndTime.trim() == '' || jsonfrm.NoticeTime.trim() == '' || isNaN(Number(jsonfrm.Notice))) {
            return true;
        }
        obj_datas.item.Title = jsonfrm.Title;
        obj_datas.item.StartTime = jsonfrm.StartTime;
        obj_datas.item.EndTime = jsonfrm.EndTime;
        obj_datas.item.Notice = parseInt(jsonfrm.Notice);
        obj_datas.item.NoticeTime = jsonfrm.NoticeTime;

        //复选框取值
        $.each($(frm).find("a[data-type='checkbox']"), function (index, obj) {
            if ($(obj).data("name") == 'IsAllDays') {//全天
                if ($(obj).attr('data-value') == 'false') {
                    obj_datas.item.IsAllDays = false;
                } else {
                    obj_datas.item.IsAllDays = true;
                }
            }
        });
    } catch (e) {
        layer.msg(e.toString());
        return true;
    }

}

//时间格式化2
function dateForart2() {
    $("#datetime1").val((new Date($("#datetime1").val())).Format('yyyy-MM-dd'));
    $("#datetime2").val((new Date($("#datetime2").val())).Format('yyyy-MM-dd'));
}

//复选框
$("form").find("label").live('click', function (event) {
    event.stopPropagation();
    $(this).find("a[data-type='checkbox']").click();
});
$("a[data-type='checkbox']").live('click', function (event) {
    event.stopPropagation();
    if ($(this).hasClass('divCheckBoxSel')) {
        $(this).removeClass('divCheckBoxSel');
        $(this).addClass('divCheckBoxNoSel');
        $(this).attr('data-value', 'false');
    } else {
        $(this).removeClass('divCheckBoxNoSel');
        $(this).addClass('divCheckBoxSel');
        $(this).attr('data-value', 'true');
    }
});


/** 日程**/
$(function () {
    //重置用户列表高属性
    $("#body").css("height", Math.round($("#calendar").css("height").replace("px", "") * 90 / 100) + "px");

    //添加日程
    $("#newSchedule").on("click", function () {
        obj_datas.item = {
            ID: 8,
            Title: '',
            TitlePlaceHoder: '日程内容',
            StartTime: obj_datas.selectTimeSpan.start,
            EndTime: obj_datas.selectTimeSpan.end,
            Notice: 0,
            NoticeTime: obj_datas.selectTimeSpan.end,
            UserList: obj_datas.userlist_edit,
            SelectUser: obj_datas.selectSource,
            JustYou: true,
            IsAllDays: false
        };
        layer_Schedule();
    });
});
