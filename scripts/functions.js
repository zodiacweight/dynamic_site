function send(method, form){
    const url = "http://rest-api:8888/index.php",
          mthd = method.toLowerCase();
    console.log("method: ", mthd, "form: ", form);
    // return false;
    $.ajax(url, {
            method: mthd
        })
        .done((response) => {
            console.log('response=>', response);
        })
        .fail(() => {
            console.log('Something went wrong');
        })
        .always(() => {
            console.log('url=>', url);
        });
}

