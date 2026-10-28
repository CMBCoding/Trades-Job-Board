//Get the form element
document.getElementById("job-post-form").onsubmit = () => {

    //Set a validation flag
    isValid = true;

    //Call to the clear function.
    clearErrors();

    //Set regex pattern for URL validation
    //regex tested with 4 different urls using https://regexr.com
    /* Pattern explaination:
        https?:\/\/(www\.)? - Matches htttp or https and or www.
        [-a-zA-Z0-9@:%._\+~#=] - Matches upper and lowercase letters, numbers, and special characters.
        {1,256} - States that the prior pattern has to be between 1 and 256 characters in length
        \.[a-zA-Z0-9()]{1,6}\b - Matches a domain (.com, .edu, etc.) between 1 and 6 characters
        ([-a-zA-Z0-9()@:%_\+.~#?&//=]*) - Matches what follows the domain extension (a-z, 0-9, special characters)
    */
    const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    
    //Get the constituent form elements and assign them to variables
    let jobTitle = document.getElementById("job-title").value.trim();
    let companyName = document.getElementById("company-name").value.trim();
    let trade = document.getElementById("trade-area").value;
    let jobLocation = document.getElementById("job-location").value;
    let jobDateStart = document.getElementById("job-start-date").value;
    let jobDateEnd = document.getElementById("job-end-date").value;
    let jobLink = document.getElementById("job-url").value.trim();

    //Validate the job-title field
    if (jobTitle === "") {
        isValid = false; //Invalidate the input
        document.getElementById("error-msg-title").style.display = "block";
    } 

    //Validate the company-name field
    if (companyName === "") {
        isValid = false; //Invalidate the input
        document.getElementById("error-msg-company").style.display = "block";
    }

    //Validate trade area field
    if(trade === "none") {
        isValid = false;
        document.getElementById("error-msg-trade").style.display = "block";
    }

    //Validate location field 
    if(jobLocation === "none") {
        isValid = false;
        document.getElementById("error-msg-location").style.display = "block";
    }

    //Validate the full time/partime radio button inputs.
    let jobStatusSelected = false; //No status is selected if niether button is checked.
    //Grab the full time/partime radio button inputs.
    let statusButtons = document.getElementsByName("job-type");
    //Check the status of each status button, if one is checked, validate
    for (let i = 0; i < statusButtons.length; i++) {
        if (statusButtons[i].checked) {
            jobStatusSelected = true;
        }
    }

    //If niether job status button is checked, invalidate the validation
    if (!jobStatusSelected) {
        isValid = false; //Invalidate the input
        document.getElementById("error-msg-status").style.display = "block";
    }

    //Validate the start and end dates of the job
    if (jobDateStart === "" || jobDateEnd === "") {
        isValid = false; //Invalidate the input
        document.getElementById("error-msg-date").style.display = "block";
    }

    //Validate the job link URL 
    if (jobLink === "" && (!urlRegex.test(jobLink))) {
        isValid = false; //Invalidate the input
        document.getElementById("error-msg-url").style.display = "block";
    }

    return isValid;
}

//Clear function called to reset error field elements.
function clearErrors() {
    //Grab all the error spans
    let errorSpans = document.getElementsByClassName("error-msg");

    for (let i = 0; i < errorSpans.length; i++) {
        errorSpans[i].style.display = "none";
    }
}