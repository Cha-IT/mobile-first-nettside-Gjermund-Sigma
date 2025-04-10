import meny from './meny.json' with { type: 'json' };

document.addEventListener("DOMContentLoaded", () => {
  const menuList = document.getElementById("menu-list");
  const orderList = document.getElementById("order-list");
  const orderButton = document.getElementById("submit-order");
  const confirmation = document.getElementById("confirmation-message");
  const nameInput = document.getElementById("customer-name");
  const phoneInput = document.getElementById("customer-phone");
  const mapsContainer = document.getElementById("maps-container"); 

  const order = {};

  // Bygg menyen med bilde, beskrivelse og knapp
  meny.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("meny-item");

    itemDiv.innerHTML = `
      <div class="meny-info">
        <h3>${item.navn} - kr ${item.pris}</h3>
        <p>${item.beskrivelse}</p>
        <button>Legg til</button>
      </div>`;

    const leggTilBtn = itemDiv.querySelector("button");
    leggTilBtn.addEventListener("click", () => {
      if (order[item.navn]) {
        order[item.navn].antall += 1;
      } else {
        order[item.navn] = { pris: item.pris, antall: 1 };
      }
      visBestilling();
    });

    menuList.appendChild(itemDiv);
  });

  // Vis bestillingsliste
  function visBestilling() {
    orderList.innerHTML = "";
    for (const navn in order) {
      const item = order[navn];
      const li = document.createElement("li");
      li.textContent = `${item.antall} x ${navn} - kr ${item.pris * item.antall}`;
      orderList.appendChild(li);
    }
  }

  // Send bestilling
  orderButton.addEventListener("click", () => {
    const navn = nameInput.value.trim();
    const telefon = phoneInput.value.trim();

    if (!navn || !telefon) {
      confirmation.textContent = "Vennligst fyll inn navn og telefonnummer.";
      confirmation.style.color = "red";
      confirmation.classList.remove("hidden");
      return;
    }

    if (Object.keys(order).length === 0) {
      confirmation.textContent = "Du har ikke valgt noe enda.";
      confirmation.style.color = "red";
      confirmation.classList.remove("hidden");
      return;
    }

    confirmation.textContent = `Takk for bestillingen, ${navn}! Vi kontakter deg på ${telefon}.`;
    confirmation.style.color = "green";
    confirmation.classList.remove("hidden");

    // Tilbakestill
nameInput.value = "";
phoneInput.value = "";
orderList.innerHTML = "";
for (let key in order) delete order[key];


  });
});
