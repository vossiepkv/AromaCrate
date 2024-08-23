let passwordFieldVisible = false;

function showPasswordField() {
  const emailInput = document.getElementById('inputEmail3');
  const passwordInput = document.getElementById('inputPassword3');
  const emailErrorMessage = document.getElementById('error-message');
  const passwordErrorMessage = document.getElementById('password-error-message');
  const signUpButton = document.getElementById('sign-up-button');

  // Initial validation for the email field
  if (emailInput.value.trim() === '') {
    emailErrorMessage.style.display = 'block';
    return; // Stop the function if email is invalid
  } else {
    emailErrorMessage.style.display = 'none';
  }

  // If password field is not yet visible, show it
  if (!passwordFieldVisible) {
    document.getElementById('password-container').style.display = 'block';
    signUpButton.innerText = 'Submit';
    passwordFieldVisible = true;
  } else {
    // Password validation
    if (passwordInput.value.trim().length < 6) {
      passwordErrorMessage.style.display = 'block';
    } else {
      passwordErrorMessage.style.display = 'none';
      // Set button type to submit only if password is valid
      signUpButton.setAttribute('type', 'submit');
    }
  }
}
