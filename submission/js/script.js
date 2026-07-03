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

let wishlistItems = [];

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

		const listItem = document.createElement("li");
		listItem.className = "wishlist-item";

		const itemText = document.createElement("span");
		itemText.textContent = newItem;

		const removeButton = document.createElement("button");
		removeButton.type = "button";
		removeButton.className = "remove-btn";
		removeButton.textContent = "Remove";

		removeButton.addEventListener("click", function() {
			wishlistItems = wishlistItems.filter(function(item) {
				return item.toLowerCase() !== newItem.toLowerCase();
			});
			listItem.remove();
			setWishlistFeedback("Item removed from wishlist.", false);
		});

		listItem.appendChild(itemText);
		listItem.appendChild(removeButton);
		wishlistList.appendChild(listItem);

		wishlistItems.push(newItem);
		wishlistInput.value = "";
		setWishlistFeedback("Item added to wishlist.", false);
	});
}
