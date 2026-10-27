//Get the form element
document.getElementById("job-post-form").onsubmit = () => {

    //Set a validation flag
    isValid = true;
    
    //Get the constituent form elements and assign them to variables
    let jobTitle = document.getElementById("job-title").value.trim();
    let companyName = document.getElementById("company-name").value.trim();
    let trade = document.getElementById("trade-area").value;
    let jobLocation = document.getElementById("job-location").value;
    let jobLink = document.getElementsByClassName("job-url");
    let jobDateStart = document.getElementById("job-start-date").value;
    let jobDateEnd = document.getElementById("job-end-date").value;

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

    return isValid;
}