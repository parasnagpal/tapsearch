window.onload=function(){

    var documents=document.getElementById("docs")
    var tokenize=document.getElementById("tokenize")
    var count=document.getElementById("count")

    var reverse_map={}
    var input=document.getElementById("docs").value
    
    var before

    $("#docs").on('focus',function(){
        before=$(this).html()
    })
    $('#docs').on('blur',function(){
        if(before!=$(this).html())
            console.log('changed')    
    })
    
}