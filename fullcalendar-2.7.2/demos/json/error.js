/**
 * Created by Administrator on 2016-06-03.
 */
//                events: {
//                    url:  '../json/events.json',
//                    error: function () {
//                        alert("data error");
//                    }
//                },
var a={
    eventSources: function (start, end, timezone, callback) {
        $.ajax({
            type: "GET",
            url: '../json/data.json',
            dataType: 'json',
            data: {start: "" + start, end: "" + end, filter: $("#hid").val()},
            success: function (doc) {
                var events = [];
                for (var i = 0; i < doc.length; i++) {
                    events.push({
                        id: i,
                        title: doc[i].title,
                        content: "content",
                        start: new Date(Date.parse(doc[i].start)) || "",
                        end: new Date(Date.parse(doc[i].end)) || "",
                        url: doc[i].url
//                                    overlap: i%5==0,
//                                    rendering: 'background',
//                                    color: '#ff9f89'
                    });
                    console.log(doc[i].start);
                }
                callback(events);
            },
            error: function () {
                alert("data error");
            }
        });
    }

}