'use strict';
let emailId=sessionStorage.getItem("emailId");
window.onload = function(){
    //初始化用户和退出按钮
    if(sessionStorage.getItem("emailId")){
        $("#logAcount").empty();
        let str=`<li><a href="/html/accountDetail.html"><span class="glyphicon glyphicon-user"></span> ${emailId}</a></li>`;
        str+=`<li><a href=""><span class="glyphicon glyphicon-log-out"></span> EXIT</a></li>`
        $("#logAcount").append(str);
    }
    $.get(`/users/${emailId}`,function (usr,status){
        console.log(JSON.stringify(usr));
        console.log(usr.id);
        console.log(usr.usrCompanyAddress);
        $('#detailEmail').attr('value', usr.usrEmail) ;
        // $('#detailCurrentPassword').attr('value', usr[0].usrPassword) ;
        $('#detailCompanyName').attr('value', usr.usrCompanyName) ;
        $('#detailCompanyAddress').attr('value', usr.usrCompanyAddress) ;
        $('#detailCompanyProfession').attr('value', usr.usrCompanyProfession) ;
    })
};
window.addEventListener('DOMContentLoaded',function(){
    document.getElementById("modify").addEventListener('click',function(){
        let password = document.getElementById("detailPassword").value;
        let confirmPw = document.getElementById("detailConfirmPassword").value;
        let currentPw = document.getElementById("detailCurrentPassword").value;
        if(password==confirmPw&&currentPw!=''){
            let oneUser = [{}];
            oneUser[0].usrPassword= document.getElementById("detailConfirmPassword").value;
            oneUser[0].usrCompanyName= document.getElementById("detailCompanyName").value;
            oneUser[0].usrCompanyAddress= document.getElementById("detailCompanyAddress").value;
            oneUser[0].usrCompanyProfession= document.getElementById("detailCompanyProfession").value;
            $.post(`/users/${emailId}`,oneUser[0],function(){
                // alert(JSON.stringify(oneUser));
                // console.log(status);
            });
            $('#test').append('修改成功');
        }else{
            let str = "<div class='alert alert-warning alert-dismissible' role='alert'>"+
                "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                "<span aria-hidden='true'>&times;</span>"+"</button>"+" 密码输入错误，请重试！</div>";
            $('#test').append(str);
        }
    },false);
});
