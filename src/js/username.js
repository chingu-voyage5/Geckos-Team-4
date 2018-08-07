export function loadUsername() {
    if (localStorage.username != null) {
      let startingUsername = localStorage.getItem("username");
      document.getElementById("username").innerText = startingUsername;
    }
  }

export function changeUsername() {       
    document.getElementById("username").addEventListener("click", function() { document.getElementById("usernameInput").style.visibility = "visible"; });    
}