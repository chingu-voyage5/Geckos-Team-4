export function getQuote() {
    let url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
    $.getJSON(url, function(data){
        console.log(data.quoteText);
        console.log(data.quoteAuthor);

        //if (data.quoteText.includes('"')){
            // alert("contains quotes");
          //  getQuote();
            // document.getElementById('author').innerHTML = "- " + data.quoteAuthor;
        //}
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