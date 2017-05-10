/**
 * Created by hama on 2017/4/1.
 */
//当用户点击提交按钮的时候，发一个ajax请求
/*document.forms[0].onsubmit = function(e){
    //阻止默认行为 submit
    e.preventDefault();
    var data = new FormData(this);
    //发请求
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            var result = JSON.parse(xhr.responseText);
            new Alert(result.message,function(){
                location.href='/';
            }).show();
        }
    }
    xhr.open('POST','/add');
    xhr.send(data);
}*/
$(function(){
    //当点击submit按钮的时候，发送请求
    $('form').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/add',//发送的地址
            method:'post',//发送的方式
            data:$(this).serialize() //发送的数据
        }).success(function(data){
            new Alert(data.message,function(){
                location.href='/';
            }).show();
        }).error(function(err){
            console.log(err);
        })
    })
})
