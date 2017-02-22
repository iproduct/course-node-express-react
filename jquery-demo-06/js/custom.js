jQuery(document).ready(function($){
    // a workaround for a flaw in the demo system (http://dev.jqueryui.com/ticket/4375), ignore!
    $( "#dialog:ui-dialog" ).dialog( "destroy" );
		
    var text = $( "#text" ),
    type = $( "#type" ),
    allFields = $( [] ).add( text ).add( type ),
    tips = $( ".validateTips" );
    var questionType = ["Multiple Choice", "Multiple Response",
    "Fill in Blank", "Open Question"];
    var questions = [];
    var anId; //ID of edited element

    function updateTips( t ) {
        tips
        .text( t )
        .addClass( "ui-state-highlight" );
        setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }

    function checkLength( o, n, min, max ) {
        if ( o.val().length > max || o.val().length < min ) {
            o.addClass( "ui-state-error" );
            updateTips( "Length of " + n + " must be between " +
                min + " and " + max + "." );
            return false;
        } else {
            return true;
        }
    }

    /*    function checkRegexp( o, regexp, n ) {
        if ( !( regexp.test( o.val() ) ) ) {
            o.addClass( "ui-state-error" );
            updateTips( n );
            return false;
        } else {
            return true;
        }
    } */
    
    function addQuestion(question) {
        var tr = $("<tr>" +
            "<td>" + question.id + "</td>" + "<td>" + question.text + "</td>" + 
            "<td>" + questionType[question.type] + "</td>" +  "</tr>" )
        .click(function(e){
            $("tbody tr").removeClass("selected");
            $(this).toggleClass("selected");
        });
        $( "#users tbody" ).append(tr); 
    }

    function showQuestions(questions){
        $(questions).each(function(index,question){
            addQuestion(question);
        });
    }
    
    function addNewQuestion(aText,aType, anId){
        var max=0;
        $(questions).each(function(index,question){
            max = (question.id > max)? question.id : max;
        });
        console.log(max);
        var isEdit = anId && true;
        var question = {
            id:(isEdit)? anId : (++max), 
            text: aText, 
            type: parseInt(aType)
        }
        questions.push(question);
        if(!isEdit) addQuestion(question);
        //Ajax Post question REST (JSON)
        $.ajax({
            accept: "text/html",
            contentType: 'application/json',
            data: JSON.stringify(question),
            dataType: 'json',
            success: function(data, textStatus, xhr){
                $('#errors').hide();
                $("#messages").html("Question Added Successfully.").show();
                getAllQuestions();
            },
            error: function(xhr, textStatus, errorThrown){
                $('#messages').hide();
                $('#errors').html( 
                    "Error: Request was not successful!<br />" 
                    + xhr.status + " - " + textStatus + xhr.responseText).show();
            },
            processData: false,
            type: (isEdit)?'PUT':'POST',
            url: "http://localhost:8080/RESTTest/rest/question"
        });
    }
     
    function getAllQuestions(){
        $( "#users tbody" ).html("");
        $.ajax({
            accept: 'application/json',
            dataType: 'json',
            success: function(data, textStatus, xhr){
                console.log(data);
                showQuestions(data);
                questions = data;
            },
            error: function(xhr, textStatus, errorThrown){
                $('#messages').hide();
                $('#errors').html( 
                    "Error: Request was not successful!<br />" 
                    + xhr.status + " - " + textStatus + xhr.responseText).show();
            },
            type: 'GET',
            url: "http://localhost:8080/RESTTest/rest/question"
        });
    }
        
    getAllQuestions();
   
		
    $( "#dialog-form" ).dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true,
        buttons: {
            "Create a Question": function() {
                var bValid = true;
                allFields.removeClass( "ui-state-error" );

                bValid = bValid && checkLength( text, "Question Text", 5, 255 );
                
                if ( bValid ) {
                    addNewQuestion(text.val(), type.val(), anId)
                    $( this ).dialog( "close" );
                }
            },
            "Затвори": function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            allFields.val( "" ).removeClass( "ui-state-error" );
        }
    });

    $( "#create-question" )
    .button()
    .click(function() {
        $( "#dialog-form" ).dialog( "open" );
    });
    
    $( "#edit-question" )
    .button()
    .click(function() {
        var tr = $( "#users-contain tr.selected" );
        var id = parseInt(tr.find("td:first").html());
        $(questions).each(function(index,question){
            if(question.id == id) {
                text.val(question.text);
                type.val(question.type);  
                anId = question.id;
                $( "#dialog-form" ).dialog( "open" );
                return false;
            }
            return true;
        });
        
    });
    
    $( "#delete-question" )
    .button()
    .click(function() {
        var tr = $( "#users-contain tr.selected" );
        var id = tr.find("td:first").html();
        $.ajax({
            accept: 'text/html',
            success: function(data, textStatus, xhr){
                tr.hide(1000, function(){
                    tr.remove();
                });
                $('#errors').hide();
                $("#messages").html("Question "+ id + " is deleted successfully.").show();
            },
            error: function(xhr, textStatus, errorThrown){
                $('#messages').hide();
                $('#errors').html( 
                    "Error: Request was not successful!<br />" 
                    + xhr.status + " - " + textStatus + xhr.responseText).show();
            },
            type: 'DELETE',
            url: "http://localhost:8080/RESTTest/rest/question/" + id
        });
    });
    
    $( "#refresh-question" )
    .button()
    .click(function() {
        $('#messages').hide();
        getAllQuestions();
    });
});



