// Inject the following elements in page after document loads
window.onload = (event) => {
    // Create array to hold comment data
    let commentData = [];
    // Create Header Element, and set text of header
    let header = document.createElement('h1');
    header.innerHTML = "Kitten Pic";

    // Create Div container for image
    let imgContainer = document.createElement('div');

    // Append Header to body of document
    document.body.appendChild(header);

    // Append imgContainer to body
    document.body.appendChild(imgContainer);

    // Center the H1
    header.style.textAlign = 'center';

    // Create image element for random cat image
    let catImg = document.createElement('img');

    // Create button element for upvote on image
    let downVote = document.createElement('button');

    // Create button element for downvote on image
    let upVote = document.createElement('button')

    // Set upVote and downVote button text
    downVote.innerHTML = "Down Vote";
    upVote.innerHTML = "Up Vote";

    // Set variables for Up and Down votes
    let timesClickedUp = 0;
    let timesClickedDown = 0;

    // Add classes to style upVote and downVote buttons
    downVote.classList.add('down-vote');
    upVote.classList.add('up-vote');

    // Fetch random cat pic from API
    fetch('https://api.thecatapi.com/v1/images/search')
        .then(res => res.json())
        .then(data => {

            // Check to see if localStorage has existing cat picture data to display
            // If not, use random image from cat API
            let cat = data[0].url;

            if (localStorage.getItem("catPic")) {
                cat = localStorage.getItem("catPic");
            } else {
                localStorage.setItem("catPic", cat);
            }

            // Create Image Element
            catImg = document.createElement('img');

            // Set Img src to cat url
            catImg.src = cat;

            // Append Img to imgContainer
            imgContainer.appendChild(catImg);

            // Center Img
            catImg.classList.add('center');
        })



    // PART TWO

    // Create button element and append to document body
    let addButton = document.createElement('button');
    addButton.innerHTML = 'Change Kitten Pic';

    // Add class to addButton
    addButton.classList.add('center-button');

    // Create Div container for button
    let buttonContainer = document.createElement('div');

    // Append buttonContainer to body
    document.body.appendChild(buttonContainer);

    // Append addButton to buttonContainer
    buttonContainer.appendChild(addButton);

    // Append upVote and downVote buttons to body
    document.body.appendChild(upVote);
    document.body.appendChild(downVote);

    // Create label for textbox input
    let textBoxLabel = document.createElement('label');

    // Set label text
    textBoxLabel.innerHTML = 'Post A Comment';

    // Create textbox element to type comments into
    let textBox = document.createElement('textarea');

    // Create button element to post comments
    let postComment = document.createElement('button');

    // Set postComment button text
    postComment.innerHTML = 'Post A Comment';

    // Add class to postComment button to center
    postComment.classList.add('center-button');

    // Set textBoxLabel attributes
    textBoxLabel.setAttribute("for", "textBox");
    textBoxLabel.setAttribute("id", "textBoxLabel");

    // Set textbox element attributes
    textBox.setAttribute("id", "textBox");
    textBox.setAttribute("name", "textBox");
    textBox.setAttribute("rows", 5);
    textBox.setAttribute("cols", 40);

    // Create divs for textbox and textBoxLabel
    let textBoxContainer = document.createElement('div');

    // Create div to hold comments
    let commentContainer = document.createElement('div');

    // Add ID to commentContainer to more easily grab element if needed
    commentContainer.setAttribute("id", "commentContainer");



    // Append textBoxContainer to body
    document.body.appendChild(textBoxContainer);
    document.body.appendChild(commentContainer);


    // Append textBoxLabel and textbox to textBoxContainer
    textBoxContainer.appendChild(textBoxLabel);
    textBoxContainer.appendChild(textBox);

    // Append postComment button to body
    document.body.appendChild(postComment);

    // Check localStorage if previous value exists for up votes
    if (localStorage.getItem("upVote")) {
        timesClickedUp = localStorage.getItem("upVote");
        upVote.innerHTML = `Up Voted ${timesClickedUp} time(s)`
    }

     // Check localStorage if previous value exists for down votes
    if (localStorage.getItem("downVote")) {
        timesClickedDown = localStorage.getItem("downVote");
        downVote.innerHTML = `Down Voted ${timesClickedDown} time(s)`
    }

    // Check to see if localStorage has existing value for comments
    if (localStorage.getItem("comments")) {
        let comments = localStorage.getItem("comments");
        comments = comments.split(',');


        for (let i = 0; i < comments.length; i++) {
            // Create paragraph element to hold textEntered
            let storedCommentPara = document.createElement('p');

            // Add class to storedCommentPara to center
            storedCommentPara.classList.add('comment-container');

            // Set text of storedCommentPara to value of comment on local storage
            storedCommentPara.innerHTML = comments[i];

            // Append textPara to commentContainer element
            commentContainer.appendChild(storedCommentPara);
        }
    }

    // Add Event Listener to addButton when clicked to get new img
    addButton.addEventListener("click", (e) => {
        // Reset previously loaded comments from local storage
        localStorage.removeItem("comments");

        // Remove children from commentContainer to delete previous posted comments
        while (commentContainer.firstChild) {
            commentContainer.removeChild(commentContainer.firstChild);
        }

        // Remove down votes and up votes from local storage
        localStorage.removeItem("downVote");
        localStorage.removeItem("upVote");

        // Reset upVote and downVote counter innerHTML text
        timesClickedUp = 0;
        timesClickedDown = 0;

        // Reset text of each button
        upVote.innerHTML = 'Up Vote';
        downVote.innerHTML = 'Down Vote';

        // Fetch random cat pic from API
        fetch('https://api.thecatapi.com/v1/images/search')
            .then(res => res.json())
            .then(data => {
                let cat = data[0].url;

                // Set Img src to cat url
                catImg.src = cat;

                // Append Img to imgContainer
                imgContainer.appendChild(catImg);

                // Center Img
                catImg.classList.add('center');
            })
        })


        // Add Event listener to upVote button
        upVote.addEventListener('click', (e) => {
            timesClickedUp = timesClickedUp + 1;
            // Set value of up votes to local storage
            localStorage.setItem("upVote", timesClickedUp);
            upVote.innerHTML = `Up Voted ${timesClickedUp} time(s)`;
        })

        // Add Event listener to downVote button
        downVote.addEventListener('click', (e) => {
            timesClickedDown = timesClickedDown + 1;
            // Set value of down votes to local storage
            localStorage.setItem("downVote", timesClickedDown);
            downVote.innerHTML = `Down Voted ${timesClickedDown} time(s)`;
        })


        // Add Event listener for postComment button
        postComment.addEventListener('click', (e) => {


            // Get value from textarea field
            let textEntered = document.getElementById('textBox').value;

            // Add text of comment to commentData array
            commentData.push(textEntered);

            // Create paragraph element to hold textEntered
            let textPara = document.createElement('p');

            // Add class to textPara to center
            textPara.classList.add('comment-container');

            // Set text of textPara to value of textEntered
            textPara.innerHTML = textEntered;

            // Append textPara to commentContainer element
            commentContainer.appendChild(textPara);


            // Reset value in textbox field after posting
            document.getElementById('textBox').value = "";

            // Set value of commentContainer to localStorage
            localStorage.setItem("comments", commentData);
        })
}
