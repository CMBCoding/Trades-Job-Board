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
    const locationRegex = /^[A-Za-z]+(?: [A-Za-z]+)*, [A-Z]{2}$/;
    
    //Get the constituent form elements and assign them to variables
    let jobTitle = document.getElementById("jobTitle").value.trim();
    let companyName = document.getElementById("companyName").value.trim();
    let trade = document.getElementById("tradeArea").value;
    let jobLocation = document.getElementById("jobLocation").value.trim();
    let jobDateStart = document.getElementById("jobStartDate").value;
    let jobDateEnd = document.getElementById("jobEndDate").value;
    let jobLink = document.getElementById("jobUrl").value.trim();

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
    if(jobLocation === "" && (!locationRegex.test(jobLocation))) {
        isValid = false;
        document.getElementById("error-msg-location").style.display = "block";
    }

    //Validate the full Job/Internship radio button inputs.
    let positionTypeSelected = false; //No status is selected if neither button is checked.
    //Grab the Job/Internship radio button inputs.
    let typeButtons = document.getElementsByName("positionType");
    //Check the status of each status button, if one is checked, validate
    for (let i = 0; i < typeButtons.length; i++) {
        if (typeButtons[i].checked) {
            positionTypeSelected = true;
        }
    }

    //If niether job status button is checked, invalidate the validation
    if (!positionTypeSelected) {
        isValid = false; //Invalidate the input
        document.getElementById("error-msg-type").style.display = "block";
    }

    //Validate the full time/partime radio button inputs.
    let positionStatusSelected = false; //No status is selected if neither button is checked.
    //Grab the full time/partime radio button inputs.
    let statusButtons = document.getElementsByName("positionStatus");
    //Check the status of each status button, if one is checked, validate
    for (let i = 0; i < statusButtons.length; i++) {
        if (statusButtons[i].checked) {
            positionStatusSelected = true;
        }
    }

    //If niether job status button is checked, invalidate the validation
    if (!positionStatusSelected) {
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