/**
 * Created by hama on 2017/4/1.
 */
//发送请求，请求留言的数据，显示在页面中 .

/*var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 && xhr.status == 200){
        var arr = JSON.parse(xhr.responseText);
        console.log(arr);
        var list = '';
        for(var i=arr.length-1;i>-1;i--){
            //最后一个最先看到,循环从数组的末尾开始循环
            var message = arr[i];
            list += '<section>';
            list += '<p>';
            list += message.content;
            list += '</p>';
            list += '<span>';
            list += formatDate(message.date);
            list += '</span>';
            list += '<span>';
            list += formatIp(message.ip);
            list += '</span>';
            list += '</section>';
        }
        document.querySelector('article').innerHTML = list;
    }
}
xhr.open('GET','/message');
xhr.send();*/
template.helper('formatDate',function(date,format){
    var time = new Date(date);
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var min = time.getMinutes();
    return time.getFullYear() + '-' + m + '-' + d + ' ' + h + ":" + min + ' ';
})
template.helper('formatIp',function(data,format){
    if(data.startsWith('::1')){
        return '127.0.0.1';
    }
})

$(function(){
    $.ajax({
        url:'/message',
        method:'get',
        datatype:'json'
    }).success(function(list){
        var result = JSON.parse(list);
        var data = {
            list:result
        }
        var html = template('test',data);
        document.querySelector('article').innerHTML = html;
        /*var list = '';
        result.forEach(function(value,index){
            //console.log(index);
            var message = value;
            //console.log(message);
            list += '<section>';
            list += '<p>';
            list += message.content;
            list += '</p>';
            list += '<span>';


            list += formatDate(message.date);
            list += '</span>';
            list += '<span>';
            list += formatIp(message.ip);
            list += '</span>';
            list += '</section>';
        })
        $('article').html(list);*/
    })
})