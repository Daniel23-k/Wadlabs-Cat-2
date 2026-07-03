const services = [
	{
		name: "Starter Trading Classes",
		description: "Weekly small-group lessons covering chart reading, risk management, and trade planning basics."
	},
	{
		name: "Bot Setup Guidance",
		description: "Step-by-step support on selecting, configuring, and monitoring automation tools responsibly."
	},
	{
		name: "Performance Reviews",
		description: "Monthly account and strategy reviews to improve consistency and reduce emotional trading mistakes."
	}
];

const serviceContainer = document.getElementById("services-list");

if (serviceContainer) {
	services.forEach(function(service) {
		const card = document.createElement("article");
		card.className = "card";

		const title = document.createElement("h3");
		title.textContent = service.name;

		const details = document.createElement("p");
		details.textContent = service.description;

		card.appendChild(title);
		card.appendChild(details);
		serviceContainer.appendChild(card);
	});
}

const wishlistInput = document.getElementById("wishlist-input");
const addWishlistButton = document.getElementById("add-wishlist-btn");
const wishlistList = document.getElementById("wishlist-list");
const wishlistFeedback = document.getElementById("wishlist-feedback");
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("contact-name");
const emailInput = document.getElementById("contact-email");
const messageInput = document.getElementById("contact-message");
const formFeedback = document.getElementById("form-feedback");
const bannerImage = document.querySelector("#banner-image");
const bannerCaption = document.querySelector("#banner-caption");

let wishlistItems = [];

const savedWishlist = localStorage.getItem("wishlistItems");
if (savedWishlist) {
	try {
		const parsedWishlist = JSON.parse(savedWishlist);
		if (Array.isArray(parsedWishlist)) {
			wishlistItems = parsedWishlist;
		}
	} catch (error) {
		wishlistItems = [];
	}
}

if (nameInput) {
	const savedName = localStorage.getItem("savedContactName");
	if (savedName) {
		nameInput.value = savedName;
	}
}

function setWishlistFeedback(message, isError) {
	if (!wishlistFeedback) {
		return;
	}

	wishlistFeedback.textContent = message;
	wishlistFeedback.classList.remove("error");
	if (isError) {
		wishlistFeedback.classList.add("error");
	}
}

function saveWishlist() {
	localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
}

function renderWishlist() {
	if (!wishlistList) {
		return;
	}

	wishlistList.innerHTML = "";

	wishlistItems.forEach(function(item) {
		const listItem = document.createElement("li");
		listItem.className = "wishlist-item";

		const itemText = document.createElement("span");
		itemText.textContent = item;

		const removeButton = document.createElement("button");
		removeButton.type = "button";
		removeButton.className = "remove-btn";
		removeButton.textContent = "Remove";

		removeButton.addEventListener("click", function() {
			wishlistItems = wishlistItems.filter(function(currentItem) {
				return currentItem.toLowerCase() !== item.toLowerCase();
			});
			listItem.remove();
			saveWishlist();
			renderWishlist();
			setWishlistFeedback("Item removed from wishlist.", false);
		});

		listItem.appendChild(itemText);
		listItem.appendChild(removeButton);
		wishlistList.appendChild(listItem);
	});
}

if (addWishlistButton && wishlistInput && wishlistList) {
	addWishlistButton.addEventListener("click", function() {
		const newItem = wishlistInput.value.trim();

		if (newItem.length === 0) {
			setWishlistFeedback("Please enter an item before adding.", true);
			return;
		}

		const duplicateItem = wishlistItems.some(function(item) {
			return item.toLowerCase() === newItem.toLowerCase();
		});

		if (duplicateItem) {
			setWishlistFeedback("That item is already in your wishlist.", true);
			return;
		}

		wishlistItems.push(newItem);
		saveWishlist();
		renderWishlist();
		wishlistInput.value = "";
		setWishlistFeedback("Item added to wishlist.", false);
	});
}

renderWishlist();

function getContactValidationError(nameValue, emailValue, messageValue) {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (nameValue.length < 2) {
		return "Please provide a name with at least 2 characters.";
	}

	if (!emailPattern.test(emailValue)) {
		return "Please provide a valid email address.";
	}

	if (messageValue.length < 10) {
		return "Please provide a message with at least 10 characters.";
	}

	return "";
}

if (contactForm && nameInput && emailInput && messageInput && formFeedback) {
	contactForm.addEventListener("submit", function(event) {
		event.preventDefault();

		const nameValue = nameInput.value.trim();
		const emailValue = emailInput.value.trim();
		const messageValue = messageInput.value.trim();
		const validationError = getContactValidationError(nameValue, emailValue, messageValue);

		if (validationError) {
			formFeedback.textContent = validationError;
			formFeedback.classList.remove("success");
			formFeedback.classList.add("error");
			return;
		}

		localStorage.setItem("savedContactName", nameValue);
		formFeedback.innerHTML = "Request sent successfully. We will contact you soon.";
		formFeedback.classList.remove("error");
		formFeedback.classList.add("success");
		contactForm.reset();
	});
}

if (bannerImage && bannerCaption) {
	bannerImage.addEventListener("click", function() {
		bannerImage.classList.toggle("revealed");
		bannerCaption.classList.toggle("revealed");
	});
}
