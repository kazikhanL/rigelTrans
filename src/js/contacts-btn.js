function contactsBtn() {
    const SELECTOR = ".contacts-btn";
    let contactsBtnElement = document.querySelector(SELECTOR);

    if (contactsBtnElement === null) {
        console.error(`Не найден селектор '${SELECTOR}'`);
        return;
    }

    contactsBtnElement.addEventListener("click", () => {
        const ACTIVE_CLASS = "contacts-btn--active";
        contactsBtnElement.classList.toggle(ACTIVE_CLASS);
    });
}

contactsBtn();