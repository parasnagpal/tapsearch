window.onload=function(){

    var reverse_map={}
    var map={}
    var doc_count=0
    var word_to_doc_map={} 

    
    //variable to compare initial and final states of input div element 
    var before
    
    //set initial state to current state
    $("#docs").on('focus',function(){
        before=$(this).html()
    })
    //compare final state with initial state
    $('#docs').on('blur',function(){

        if(before!=$(this).html())
            {
                //doc splitting
                var count=$(this).html().split('<div><br></div>')

                //map each document to its doc no
                count.map((str)=>{
                    reverse_map[str]=doc_count++
                    map[doc_count-1]=str
                    
                    //for each doc split its word and map to doc
                    var words=str.split(" ")
                    words.map((word)=>{

                        if(word.slice(5)=="<div>")
                            word=word.substring(5,word.length-5)

                        if(word.slice(-6)=="</div>")
                            word=word.substring(0,word.length-6)

                        //crop at ends
                        while(word.slice(-1)=='.' || word.slice(-1)==',' || word.slice(-1)==')' ||word.slice(-1)=='!')
                            word=word.substring(0,word.length-1)
                        
                        //crop in front
                        while(word.slice(0)=='.' || word.slice(0)==',' || word.slice(0)=='(' ||word.slice(0)=='!')
                            word=word.substring(1,word.length-1)

                          //initialize array if not there
                        if(!word_to_doc_map[word])
                            word_to_doc_map[word]=[]

                        word_to_doc_map[word].push(doc_count-1)    
                        
                        console.log(word_to_doc_map)
                    })

                })
            }

    })

    //search logic
    $('#search').click(()=>{
        
        $("#search_result").html("")
        var search_word=$('#search_word').val()
        var count_docs=0
        var printed_docs={}

        if(word_to_doc_map[search_word])

            word_to_doc_map[search_word].map(x=>{
                if(!printed_docs[x] && count_docs<10)
                    {
                        $('#search_result').append(map[x])
                        $('#search_result').append("<br>")
                        count_docs++
                    }
                printed_docs[x]=1
            })
    })

    
}