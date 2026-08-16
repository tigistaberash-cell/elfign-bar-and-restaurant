const isOpen = true;

const modal = document.getElementById("orderModal");
const closeBtn = document.getElementById("closeModal");
const orderButtons = document.querySelectorAll(".orderBtn");

orderButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (isOpen) {
            modal.style.display = "flex";
        } else {
            alert("Sorry! Elfign Restaurant is currently closed.");
        }
    });
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
const orderBtn = document.getElementById("orderBtn");

orderBtn.addEventListener("click", function () {
    document.getElementById("menu").scrollIntoView({
        behavior: "smooth"
    });
});
emailjs.init("YOUR_PUBLIC_KEY");

const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        this
    )
    .then(function() {
        alert("Message sent successfully!");
        form.reset();
    })
    .catch(function(error) {
        alert("Failed to send message.");
        console.log(error);
    });
});