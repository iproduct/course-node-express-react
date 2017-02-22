function loadDynamic(baseUrl, scriptNames, callback) {
    var ready = 0, e, i;
    if(scriptNames && scriptNames.length && scriptNames.length > 0){
        for(i = 0; i < scriptNames.length; i++){
            e = document.createElement('script');
            e.type = 'text/javascript';
            e.src =  baseUrl + "/" + scriptNames[i];
            e.async = true;
            e.onload = function() {
                ready ++; 
                //alert(ready);
                if (ready === scriptNames.length)
                    callback();
            };
            document.getElementsByTagName("body")[0].appendChild(e);
        }
    }
}
