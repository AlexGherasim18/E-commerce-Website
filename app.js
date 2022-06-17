const quickBtn = document.getElementsByClassName('quick-buy-btn');
const popup = document.getElementsByClassName('pop-up');

for ( i=0; i < quickBtn.length; i++) {
  quickBtn[i].addEventListener('click', loadPopUp);
}

function loadPopUp(e) {
  e.preventDefault();
  const products = e.target.parentElement.parentElement.parentElement;

  const imgSrc = products.firstElementChild.firstElementChild.firstElementChild.src;
        name = products.children[1].textContent;
        review = products.children[2].innerHTML
        worth = parseFloat(products.children[3].textContent.replace('£', ''));
  popup[0].style.display = 'block';
  popup[0].innerHTML = `
  <div class="title-close">
    <h2 class="pop-up-title">Quick Buy<h2>
    <button class="pop-up-close"><i class="fa-solid fa-xmark"></i></button>
  </div>  
  <hr>
  <div class="pop-up-product">
    <div class="pop-up-product-block">
      <div class="pop-up-image-container">
        <img src=${imgSrc} width="300px" height="300px">
      </div>
      <div class="pop-up-product-info">
        <h3 class="pop-up-product-name">${name}</h3>
        <div class="pop-up-review-stars">
            ${review}
        </div>
        <input class="amount" type="number" value="1" min="1">
        <div class="pop-up-price">&pound; ${worth}</div>
        <button class="add-to-basket">Add To Basket</button>
      </div>  
    </div>
  </div>`;
  
  const closeDiv = document.getElementsByClassName('pop-up-close');
  closeDiv[0].addEventListener('click', closePopUp);

  function closePopUp(e) {
    e.preventDefault();

    if(e.target === closeDiv[0] || e.target.parentElement === closeDiv[0]) {
      popup[0].style.display = 'none';
    } else {
      popup[0].style.display = 'block';
    }
  }
  const addBasket = document.getElementsByClassName('add-to-basket');
  
  addBasket[0].addEventListener('click', loadBasket);
  
  function loadBasket() {
    const basketList = document.getElementsByClassName('basket-list')[0];
    let basketProducts = document.createElement('div');
    basketProducts.classList.add('basket-product');
    let input = document.getElementsByClassName('amount')[0].value;
    let price = parseFloat(worth * input).toFixed(2);
    basketProducts.innerHTML += `
    <div class="basket-product-img-container">
      <img src=${imgSrc} width="100px" height="100px">
      <button class="basket-product-del"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="basket-product-info">
      <h5 class="basket-product-name">${name}</h5>
      <p class="basket-product-price">£ ${price}</p>
      <p class="basket-product-quantity">Quantity ${input}</p>
    </div>
    `;
    basketList.insertBefore(basketProducts, basketList.children[0]);
    updateCartTotal();
    const productDelete = document.getElementsByClassName('basket-product-del')[0].children[0];
    productDelete.addEventListener('click', deleteFromList);

    function deleteFromList (e) {
      if (e.target === productDelete) {
        productDelete.parentElement.parentElement.parentElement.remove();
        updateCartTotal();
      } 
    }
  } 
  function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('basket-list')[0];
    let cartRows = cartItemContainer.getElementsByClassName('basket-product');
    let total = 0;
    for (var i = 0; i < cartRows.length; i++) {
      let cartRow = cartRows[i];
      let productPrice = parseFloat(cartRow.children[1].children[1].textContent.replace('£', ''));
      
      total = total + productPrice;
      let finalPrice = document.getElementsByClassName('basket-total-price')[0];
      finalPrice.innerHTML = `Total: &pound; ${total.toFixed(2)}`;
    }
  }
}



// Login Event
const loginBtn = document.getElementsByClassName('login')[0];
loginBtn.addEventListener('click', login);

function login () {
  const loginPopUp = document.createElement('div');
  loginPopUp.classList.add('login-pop-up');
  loginPopUp.innerHTML = `
  <div class="container-tit-del">
    <h3 class="login-title">Customer Login</h3>
    <button class="close-login"><i class="fa-solid fa-xmark"></i></button>
  </div>  
  <div class="container-info">
    <label for="uname">Username</label>
    <input class="login-input uname-input" type="text" placeholder="Enter Username" name="uname" required>
    <div class="error uname-error"><i class="fa-solid fa-triangle-exclamation"></i> Username is a required field </div>

    <label for="psw">Password</label>
    <input class="login-input psw-input" type="password" placeholder="Enter Password" name="psw" required>
    <div class="error psw-error"><i class="fa-solid fa-triangle-exclamation"></i> Password is a required field </div>

    <button type="submit" class="submit-login">Login</button>
  </div>
  `
  document.body.appendChild(loginPopUp);

  // Close Log in Pop-Up
  const close = document.getElementsByClassName('close-login')[0]
  close.addEventListener('click', closeLog);
  function closeLog (e) {
    if(e.target === close || e.target.parentElement === close) {
      loginPopUp.remove();
    } else {
      loginPopUp.style.display = 'block';
    }
  }

  // Submit Log In
  const submitLogin = document.getElementsByClassName('submit-login')[0];
  submitLogin.addEventListener('click', submitLog);

  function submitLog() {
    const username = document.getElementsByClassName('uname-input')[0];
    const password = document.getElementsByClassName('psw-input')[0];

    const unameErr = document.getElementsByClassName('uname-error')[0];
    const pswErr = document.getElementsByClassName('psw-error')[0];

    if (username.value === '' && password.value === '') {
      unameErr.style.display = 'block';
      pswErr.style.display = 'block';
    } else if (username.value === '' && password.value !== '') {
      unameErr.style.display = 'block';
      pswErr.style.display = 'none';
    } else if (username.value !== '' && password.value === '') {
      unameErr.style.display = 'none';
      pswErr.style.display = 'block';
    } else if (username.value !== '' && password.value !== '') {
      loginPopUp.style.display = 'none';

      const loginSuccess = document.createElement('div');
      loginSuccess.classList.add('login-success');
      loginSuccess.innerHTML = `<div class="success-text">Account successfully logged in</div>`;
      document.body.appendChild(loginSuccess);
      loginSuccess.style.display = 'block';
      setTimeout(() => {
        loginSuccess.remove();
      }, 1500);

      document.getElementsByClassName('dropdown-user-buttons')[0].innerHTML = `Hello, ${username.value}`;
    }
  }
}

// Register Event
const registerBtn = document.getElementsByClassName('register')[0];
registerBtn.addEventListener('click', register);

function register() {
  const registerPopUp = document.createElement('div');
  registerPopUp.classList.add('register-pop-up');
  registerPopUp.innerHTML = `
    <div class="container-tit-del">
      <h3 class="login-title register-title">Register New Account</h3>
      <button class="close-login close-register"><i class="fa-solid fa-xmark"></i></button>
    </div>  
    <div class="container-info">
      <label for="email">Email</label>
      <input class="login-input register-input email-input" type="text" placeholder="Enter Email" name="email" required>
      <div class="error email-error"><i class="fa-solid fa-triangle-exclamation"></i> Email is a required field </div>

      <label for="uname">Username</label>
      <input class="login-input register-input uname-input" type="text" placeholder="Enter Username" name="uname" required>
      <div class="error uname-error"><i class="fa-solid fa-triangle-exclamation"></i> Username is a required field </div>

      <label for="phone">Phone Number</label>
      <input class="login-input register-input phone-input" type="number" placeholder="Enter Phone Number" name="phone" required>
      <div class="error phone-error"><i class="fa-solid fa-triangle-exclamation"></i> Phone Number is a required field </div>
      
      <label for="psw">Password</label>
      <input class="login-input register-input psw-input" type="password" placeholder="Enter Password" name="psw" required>
      <div class="error psw-error"><i class="fa-solid fa-triangle-exclamation"></i> Password is a required field </div>

      <button type="submit" class="submit-login submit-register">Register</button>
    </div>
`;
  document.body.appendChild(registerPopUp);

  // Close Register Pop-Up
  const close = document.getElementsByClassName('close-register')[0]
  close.addEventListener('click', closeReg);
  function closeReg (e) {
    e.preventDefault();
    if(e.target === close || e.target.parentElement === close) {
      registerPopUp.remove();
    } else {
      registerPopUp.style.display = 'block';
    }
  }



  const submitRegister = document.getElementsByClassName('submit-register')[0];
  submitRegister.addEventListener('click', submitReg);

  function submitReg () {
    const username = document.getElementsByClassName('uname-input')[0];
    const password = document.getElementsByClassName('psw-input')[0];
    const phone = document.getElementsByClassName('phone-input')[0];
    const email = document.getElementsByClassName('email-input')[0];

    const unameErr = document.getElementsByClassName('uname-error')[0];
    const pswErr = document.getElementsByClassName('psw-error')[0];
    const phoneErr = document.getElementsByClassName('phone-error')[0];
    const emailErr = document.getElementsByClassName('email-error')[0];

    if (username.value === '') {
      unameErr.style.display = 'block';
    }
    if (password.value === '') {
      pswErr.style.display = 'block';
    }
    if (phone.value === '') {
      phoneErr.style.display = 'block';
    }
    if (email.value === '') {
      emailErr.style.display = 'block';
    } 
    if (username.value !=='' && password.value !=='' && email.value !=='' && phone.value !=='') {
      registerPopUp.style.display = 'none';

      const registerSuccess = document.createElement('div');
      registerSuccess.classList.add('register-success');
      registerSuccess.innerHTML = `<div class="success-text">Account successfully registered</div>`;
      document.body.appendChild(registerSuccess);
      registerSuccess.style.display = 'block';
      setTimeout(() => {
        registerSuccess.remove();
      }, 1500);
    }
  }  
}

const buyBasket = document.getElementsByClassName('buy-basket-products')[0];
buyBasket.addEventListener('click', buyItems) 
function buyItems () {
  const basketList = document.getElementsByClassName('basket-list')[0];
  const basketProduct = document.getElementsByClassName('basket-product')[0];
  if (!basketList.contains(basketProduct)) {
    alert('Please add a product to the basket');   
  } else {
    alert('Thanks for the purchase');
  }
}
