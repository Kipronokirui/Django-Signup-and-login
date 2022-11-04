const usernameField = document.querySelector('#usernameField')
const feedbackArea = document.querySelector(".invalid-feedback")
const emailField = document.querySelector('#emailField')
const emailFeedbackArea = document.querySelector(".emailFeedbackArea")
const usernameSuccessOutput = document.querySelector('.usernameSuccessOutput')
const passwordField = document.querySelector('#passwordField')
const showPasswordToggle = document.querySelector('.showPasswordToggle')
const submitBtn = document.querySelector('.submit-btn')

const handleToggleInput = (e)=>{
    if(showPasswordToggle.textContent=='SHOW'){
        showPasswordToggle.textContent = 'HIDE'

        passwordField.setAttribute('type','text')
    }else{
        showPasswordToggle.textContent = 'SHOW'
        passwordField.setAttribute('type','password')
    }
}

showPasswordToggle.addEventListener('click', handleToggleInput)

emailField.addEventListener('keyup', (e)=>{
    console.log('7777')

    const emailVal = e.target.value

    emailField.classList.remove('is-invalid');
    emailFeedbackArea.style.display="none";

    if (emailVal.length > 0){
        fetch("/authentication/validate-email", {
            body: JSON.stringify({email:emailVal}), 
            method:"POST",
        }).then(res=>res.json()).then(data=>{
            console.log("data",data) 
            if(data.email_error){
                submitBtn.disabled = true
                emailField.classList.add('is-invalid');
                emailFeedbackArea.style.display="block"
                emailFeedbackArea.innerHTML=`<p>${data.email_error}</p>`
            }else{
                // submitBtn.removeAttribute('disbaled')
                submitBtn.disabled = false
            }
        });
    }
   
})


usernameField.addEventListener('keyup', (e)=>{
    console.log('7777')

    const usernameVal = e.target.value
    usernameSuccessOutput.style.display = 'block'

    usernameSuccessOutput.textContent = `Checking ${usernameVal}`

    usernameField.classList.remove('is-invalid');
    feedbackArea.style.display="none";
    // feedbackArea.innerHTML=`<p>${data.username_error}</p>`

    if (usernameVal.length > 0){
        fetch("/authentication/validate-username", {
            body: JSON.stringify({username:usernameVal}), 
            method:"POST",
        }).then(res=>res.json()).then(data=>{
            console.log("data",data) 
            // Hide it when everything is working fine 
            usernameSuccessOutput.style.display = 'none'
            if(data.username_error){
                submitBtn.disabled = true
                usernameField.classList.add('is-invalid');
                feedbackArea.style.display="block"
                feedbackArea.innerHTML=`<p>${data.username_error}</p>`
            }else{
                // submitBtn.removeAttribute('disbaled')
                submitBtn.disabled = false
            }
        });
    }
   
});