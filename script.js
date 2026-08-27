// ==========================================
// ELFIGN BAR & RESTAURANT JAVASCRIPT
// ==========================================


// ==========================================
// MOBILE MENU
// ==========================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Close menu when a navigation link is clicked
    const navItems = navLinks.querySelectorAll("a");

    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}


// ==========================================
// EXPLORE MENU BUTTON
// ==========================================

const exploreMenuBtn = document.getElementById("orderBtn");

if (exploreMenuBtn) {

    exploreMenuBtn.addEventListener("click", () => {

        const menuSection = document.getElementById("menu");

        if (menuSection) {
            menuSection.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

}


// ==========================================
// SHOPPING CART
// ==========================================

let cart = [];


const cartButton = document.getElementById("cartButton");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const clearCart = document.getElementById("clearCart");


// ==========================================
// ADD FOOD TO CART
// ==========================================

const orderButtons = document.querySelectorAll(".orderBtn");

orderButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const foodCard = button.closest(".food-card");

        if (!foodCard) return;


        // Get food name
        const foodNameElement =
            foodCard.querySelector("h3") ||
            foodCard.querySelector("h4");


        if (!foodNameElement) return;


        const foodName =
            foodNameElement.textContent.trim();


        // Get price
        const priceElement =
            foodCard.querySelector("p");


        if (!priceElement) return;


        const priceText =
            priceElement.textContent;


        // Extract number from price text
        const priceMatch =
            priceText.match(/\d+/);


        let price = 0;


        if (priceMatch) {
            price = Number(priceMatch[0]);
        }


        // Check if food is already in cart
        const existingItem = cart.find(
            (item) => item.name === foodName
        );


        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                name: foodName,
                price: price,
                quantity: 1
            });

        }


        updateCart();


        // Open cart automatically
        if (cartModal) {
            cartModal.style.display = "flex";
        }

    });

});


// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {

    if (
        !cartItems ||
        !cartTotal ||
        !cartCount
    ) {
        return;
    }


    cartItems.innerHTML = "";


    let total = 0;
    let totalQuantity = 0;


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p class='empty-cart'>Your cart is empty.</p>";

    }


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;

        totalQuantity += item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

            <div class="cart-food-info">

                <h4>${item.name}</h4>

                <p>
                    ${item.price} Birr × ${item.quantity}
                </p>

                <strong>
                    ${itemTotal} Birr
                </strong>

            </div>


            <div class="cart-controls">

                <button
                    class="decrease-btn"
                    data-index="${index}">

                    −

                </button>


                <span class="quantity">
                    ${item.quantity}
                </span>


                <button
                    class="increase-btn"
                    data-index="${index}">

                    +

                </button>


                <button
                    class="remove-btn"
                    data-index="${index}">

                    Remove

                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    // Update total price
    cartTotal.textContent =
        total + " Birr";


    // Update cart number
    cartCount.textContent =
        totalQuantity;


    addCartEvents();

}


// ==========================================
// CART BUTTONS
// ==========================================

function addCartEvents() {


    // INCREASE
    const increaseButtons =
        document.querySelectorAll(".increase-btn");


    increaseButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const index =
                Number(button.dataset.index);


            cart[index].quantity++;


            updateCart();

        });

    });


    // DECREASE
    const decreaseButtons =
        document.querySelectorAll(".decrease-btn");


    decreaseButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const index =
                Number(button.dataset.index);


            cart[index].quantity--;


            // Remove when quantity reaches zero
            if (cart[index].quantity <= 0) {

                cart.splice(index, 1);

            }


            updateCart();

        });

    });


    // REMOVE COMPLETELY
    const removeButtons =
        document.querySelectorAll(".remove-btn");


    removeButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const index =
                Number(button.dataset.index);


            cart.splice(index, 1);


            updateCart();

        });

    });

}


// ==========================================
// OPEN CART
// ==========================================

if (cartButton && cartModal) {

    cartButton.addEventListener("click", () => {

        cartModal.style.display = "flex";

    });

}


// ==========================================
// CLOSE CART
// ==========================================

if (closeCart && cartModal) {

    closeCart.addEventListener("click", () => {

        cartModal.style.display = "none";

    });

}


// ==========================================
// CLEAR CART
// ==========================================

if (clearCart) {

    clearCart.addEventListener("click", () => {

        cart = [];


        updateCart();

    });

}


// ==========================================
// CLOSE CART WHEN CLICKING OUTSIDE
// ==========================================

window.addEventListener("click", (event) => {

    if (event.target === cartModal) {

        cartModal.style.display = "none";

    }

});


// ==========================================
// LEARN MORE BUTTON
// ==========================================

const learnMoreBtn =
    document.getElementById("learnMoreBtn");


const learnMoreModal =
    document.getElementById("learnMoreModal");


const closeLearnMore =
    document.getElementById("closeLearnMore");


if (learnMoreBtn && learnMoreModal) {

    learnMoreBtn.addEventListener("click", () => {

        learnMoreModal.style.display = "flex";

    });

}


if (closeLearnMore && learnMoreModal) {

    closeLearnMore.addEventListener("click", () => {

        learnMoreModal.style.display = "none";

    });

}


window.addEventListener("click", (event) => {

    if (event.target === learnMoreModal) {

        learnMoreModal.style.display = "none";

    }

});


// ==========================================
// EMAILJS CONTACT FORM
// ==========================================

const form =
    document.getElementById("contactForm");


if (form) {

    form.addEventListener("submit", function (event) {

        event.preventDefault();


        // Check EmailJS exists
        if (typeof emailjs === "undefined") {

            alert(
                "Email service is not connected yet."
            );

            return;

        }


        emailjs.sendForm(
            "YOUR_SERVICE_ID",
            "YOUR_TEMPLATE_ID",
            this
        )
        .then(() => {

            alert(
                "Message sent successfully!"
            );


            form.reset();

        })
        .catch((error) => {

            alert(
                "Message failed to send. Please try again."
            );


            console.log(error);

        });

    });

}