// api documentation: http://forismatic.com/en/api

// cross origin error can be solved without jquery somehow: 
// https://stackoverflow.com/questions/6132796/how-to-make-a-jsonp-request-from-javascript-without-jquery
export function getQuote() {
    let url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
    $.getJSON(url, function(data){
        // console.log(data.quoteText);
        // console.log(data.quoteAuthor);

        if (data.quoteText.includes('"')){
            console.log("contains quotes");
            getQuote();            
        }

        // display quote
        document.getElementById('quote').innerHTML = data.quoteText;

        // display author
        if (data.quoteAuthor.length > 1) {
            // alert("no author");            
            document.getElementById('author').innerHTML = "- " + data.quoteAuthor;
        } else {
            document.getElementById('author').innerHTML = " ";
        }

    })        
}