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
