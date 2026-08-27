// ==================================================
// ELFIGN BAR & RESTAURANT
// MAIN JAVASCRIPT
// ==================================================



// ==================================================
// MOBILE NAVIGATION
// ==================================================

const menuToggle =
    document.getElementById("menu-toggle");

const navLinks =
    document.getElementById("nav-links");


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });


    const navItems =
        navLinks.querySelectorAll("a");


    navItems.forEach((item) => {

        item.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });

}



// ==================================================
// EXPLORE MENU
// ==================================================

const exploreMenuBtn =
    document.getElementById("exploreMenuBtn");


if (exploreMenuBtn) {

    exploreMenuBtn.addEventListener("click", () => {

        const menuSection =
            document.getElementById("menu");


        if (menuSection) {

            menuSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}



// ==================================================
// SHOPPING CART
// ==================================================

let cart = [];



const cartButton =
    document.getElementById("cartButton");


const cartModal =
    document.getElementById("cartModal");


const closeCart =
    document.getElementById("closeCart");


const cartItems =
    document.getElementById("cartItems");


const cartTotal =
    document.getElementById("cartTotal");


const cartCount =
    document.getElementById("cartCount");


const clearCart =
    document.getElementById("clearCart");


const cartSuccess =
    document.getElementById("cartSuccess");



// ==================================================
// ADD TO CART
// ==================================================

const addToCartButtons =
    document.querySelectorAll(".add-to-cart");


addToCartButtons.forEach((button) => {

    button.addEventListener("click", () => {


        const foodCard =
            button.closest(".food-card");


        if (!foodCard) return;



        // Get food name

        const foodNameElement =
            foodCard.querySelector("h3");


        if (!foodNameElement) return;


        const foodName =
            foodNameElement.textContent.trim();



        // Get price

        const priceElement =
            foodCard.querySelector("p");


        if (!priceElement) return;


        const priceText =
            priceElement.textContent;



        /*
         * This handles:
         *
         * 200 Birr
         * 1,000 Birr
         * 10,000 Birr
         */

        const priceMatch =
            priceText.match(/[\d,]+/);


        if (!priceMatch) {

            alert(
                "Could not read the food price."
            );

            return;

        }


        const price =
            Number(
                priceMatch[0].replace(/,/g, "")
            );



        // Check if item already exists

        const existingItem =
            cart.find(
                item => item.name === foodName
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



        // Update cart

        updateCart();



        // Show success

        showCartSuccess();


        // Change button temporarily

        const originalText =
            button.textContent;


        button.textContent =
            "✓ Added Successfully";


        button.style.backgroundColor =
            "#16803c";


        button.style.color =
            "white";


        setTimeout(() => {

            button.textContent =
                originalText;


            button.style.backgroundColor =
                "";


            button.style.color =
                "";

        }, 1200);

    });

});



// ==================================================
// SUCCESS MESSAGE
// ==================================================

function showCartSuccess() {

    if (!cartSuccess) return;


    cartSuccess.classList.add("show");


    setTimeout(() => {

        cartSuccess.classList.remove("show");

    }, 2000);

}



// ==================================================
// UPDATE CART
// ==================================================

function updateCart() {


    if (!cartItems ||
        !cartTotal ||
        !cartCount) {

        return;

    }



    cartItems.innerHTML = "";


    let total = 0;

    let totalQuantity = 0;



    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">

                Your cart is empty.

            </p>

        `;

    }



    // Create cart items

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

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ${formatPrice(item.price)}
                    Birr × ${item.quantity}
                </p>

                <strong>
                    ${formatPrice(itemTotal)}
                    Birr
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



    // Total

    cartTotal.textContent =
        formatPrice(total) + " Birr";



    // Cart number

    cartCount.textContent =
        totalQuantity;



    // Add button events

    addCartEvents();

}



// ==================================================
// FORMAT PRICE
// ==================================================

function formatPrice(number) {

    return Number(number).toLocaleString();

}



// ==================================================
// CART ITEM BUTTONS
// ==================================================

function addCartEvents() {


    // Increase

    const increaseButtons =
        document.querySelectorAll(
            ".increase-btn"
        );


    increaseButtons.forEach((button) => {

        button.addEventListener("click", () => {


            const index =
                Number(button.dataset.index);


            if (cart[index]) {

                cart[index].quantity++;

            }


            updateCart();

        });

    });



    // Decrease

    const decreaseButtons =
        document.querySelectorAll(
            ".decrease-btn"
        );


    decreaseButtons.forEach((button) => {

        button.addEventListener("click", () => {


            const index =
                Number(button.dataset.index);


            if (!cart[index]) return;


            cart[index].quantity--;


            if (
                cart[index].quantity <= 0
            ) {

                cart.splice(index, 1);

            }


            updateCart();

        });

    });



    // Remove

    const removeButtons =
        document.querySelectorAll(
            ".remove-btn"
        );


    removeButtons.forEach((button) => {

        button.addEventListener("click", () => {


            const index =
                Number(button.dataset.index);


            cart.splice(index, 1);


            updateCart();

        });

    });

}



// ==================================================
// OPEN CART
// ==================================================

if (cartButton && cartModal) {

    cartButton.addEventListener("click", () => {

        cartModal.style.display = "flex";

    });

}



// ==================================================
// CLOSE CART
// ==================================================

if (closeCart && cartModal) {

    closeCart.addEventListener("click", () => {

        cartModal.style.display = "none";

    });

}



// ==================================================
// CLOSE CART BY CLICKING OUTSIDE
// ==================================================

if (cartModal) {

    cartModal.addEventListener("click", (event) => {

        if (
            event.target === cartModal
        ) {

            cartModal.style.display =
                "none";

        }

    });

}



// ==================================================
// CLEAR CART
// ==================================================

if (clearCart) {

    clearCart.addEventListener("click", () => {


        if (cart.length === 0) {

            return;

        }


        cart = [];


        updateCart();

    });

}



// ==================================================
// CREATE ORDER MESSAGE
// ==================================================

function createOrderMessage() {


    // Make sure cart isn't empty

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add food first."
        );

        return null;

    }



    // Customer details

    const customerName =
        document
            .getElementById("customerName")
            .value
            .trim();


    const customerPhone =
        document
            .getElementById("customerPhone")
            .value
            .trim();


    const customerAddress =
        document
            .getElementById("customerAddress")
            .value
            .trim();



    // Require name

    if (!customerName) {

        alert(
            "Please enter your name."
        );

        document
            .getElementById("customerName")
            .focus();

        return null;

    }



    // Require phone

    if (!customerPhone) {

        alert(
            "Please enter your phone number."
        );

        document
            .getElementById("customerPhone")
            .focus();

        return null;

    }



    // Start message

    let message =
        "🍽️ NEW ORDER - ELFIGN BAR & RESTAURANT\n\n";


    message +=
        "👤 Customer: " +
        customerName +
        "\n";


    message +=
        "📞 Phone: " +
        customerPhone +
        "\n";



    if (customerAddress) {

        message +=
            "📍 Address: " +
            customerAddress +
            "\n";

    }



    message +=
        "\n🛒 ORDER:\n";



    let total = 0;



    cart.forEach((item) => {


        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        message +=
            "• " +
            item.name +
            " × " +
            item.quantity +
            " = " +
            formatPrice(itemTotal) +
            " Birr\n";

    });



    message +=
        "\n💰 TOTAL: " +
        formatPrice(total) +
        " Birr";



    return message;

}



// ==================================================
// WHATSAPP ORDER
// ==================================================

const whatsappOrder =
    document.getElementById(
        "whatsappOrder"
    );


if (whatsappOrder) {

    whatsappOrder.addEventListener(
        "click",
        () => {


            const message =
                createOrderMessage();


            if (!message) return;



            const whatsappNumber =
                "251911591754";



            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(message);



            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}



// ==================================================
// TELEGRAM ORDER
// ==================================================

const telegramOrder =
    document.getElementById(
        "telegramOrder"
    );


if (telegramOrder) {

    telegramOrder.addEventListener(
        "click",
        async () => {


            const message =
                createOrderMessage();


            if (!message) return;



            try {


                await navigator.clipboard
                    .writeText(message);


                alert(
                    "Your order has been copied. Telegram will open. Paste the order into the chat and send it."
                );


            } catch (error) {

                alert(
                    "Telegram will open. Please copy your order and send it."
                );

            }



            window.open(
                "https://t.me/teno54",
                "_blank"
            );

        }
    );

}



// ==================================================
// INSTAGRAM ORDER
// ==================================================

const instagramOrder =
    document.getElementById(
        "instagramOrder"
    );


if (instagramOrder) {

    instagramOrder.addEventListener(
        "click",
        async () => {


            const message =
                createOrderMessage();


            if (!message) return;



            try {


                await navigator.clipboard
                    .writeText(message);


                alert(
                    "Your order has been copied. Instagram will open. Paste the order into a message and send it."
                );


            } catch (error) {

                alert(
                    "Instagram will open. Please copy your order and send it."
                );

            }



            window.open(
                "https://instagram.com/kebedetenagne",
                "_blank"
            );

        }
    );

}



// ==================================================
// CONTACT FORM
// ==================================================

const form =
    document.getElementById(
        "contactForm"
    );


if (form) {

    form.addEventListener(
        "submit",
        function (event) {


            event.preventDefault();



            // Check EmailJS

            if (
                typeof emailjs ===
                "undefined"
            ) {

                alert(
                    "Email service is not connected yet."
                );

                return;

            }



            /*
             * Replace these two values
             * with your real EmailJS
             * Service ID and Template ID.
             */

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


                console.log(error);


                alert(
                    "Message failed to send. Please try again."
                );

            });

        }
    );

}



// ==================================================
// INITIAL CART
// ==================================================

updateCart();