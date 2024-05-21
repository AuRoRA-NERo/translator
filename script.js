function transformText(event) {
    
    event.preventDefault();
    document.getElementById("result").style.display = "block"; // Show the result div

    // Reset the content of the code div
    const codeDiv = document.getElementById("code");
    codeDiv.innerHTML = "";

    const text = document.getElementById('inputText').value;

   // Transform custom tags to HTML
   let html = text.replace(/\/h1 (.*?) \/h1/g, '<h1>$1</h1>');
   html = html.replace(/\/h2 (.*?) \/h2/g, '<h2>$1</h2>');
   html = html.replace(/\/h3 (.*?) \/h3/g, '<h3>$1</h3>');
   html = html.replace(/\/bold (.*?) \/bold/g, '<span class="bold">$1</span>');
   html = html.replace(/\/bold(.*?) \/bold/g, '<span class="bold">$1</span>');
   html = html.replace(/\/img (.*?) \/img/g, '<img src="$1" class="image">');
   html = html.replace(/\/imgL (.*?) \/imgL/g, '<img src="$1" class="large-image">');
   html = html.replace(/\/attention([\s\S]*?)\/attention/g, '<div class="attention"><h3>Atenção!</h3><p>$1</p></div>');
   html = html.replace(/\/center([\s\S]*?)\/center/g, '<div class="center"><p>$1</p></div>');
   html = html.replace(/\/list([\s\S]*?)\/list/g, '<div class="list"><p>$1</p></div>');
   
   html = html.replace(/\/code (.*?)\/code/g, '<div class="code"> <button class="copy-btn" type="button" onclick="copy_data(code5)"><i class="fa fa-copy"></i></button> <div> $1 </div> </div>');

   // Split text into paragraphs
   const lines = html.split('\n');

   // Wrap each line in a <p> tag
   const result = lines.map(line => `<p>${line.trim()}</p>`).join('\n');

    const newParagraph = document.createElement("p");
    newParagraph.textContent = result;

    // Append the new paragraph to the code div
    codeDiv.appendChild(newParagraph);
}

//Copia resultado para área de transferência
function copy() {
    const codeDiv = document.getElementById("code");
    const range = document.createRange();
    range.selectNodeContents(codeDiv);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    try {
        const successful = document.execCommand('copy');
    } catch (err) {
        console.log('Failed to copy content.');
    }

    // Remove selection
    selection.removeAllRanges();
}