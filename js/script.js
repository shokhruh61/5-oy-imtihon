const saveButton = document.querySelector('.form__btn');
const cardsContainer = document.querySelector('.cards');

// Yangi card yaratish funksiyasi
function createCard(logoUrl, companyName, isNew, isFeatured, position, timeType, jobType, location, skills) {
    const cardHTML = `
        <div class="card__form container">
            <div class="card__img">
                <img src="${logoUrl}" width="88" height="88" alt="${companyName} logotipi">
            </div>
            <div class="card__info">
                <div class="card__header">
                    <h4 class="company">${companyName}</h4>
                    ${isNew ? '<span class="new__span">NEW!</span>' : ''}
                    ${isFeatured ? '<span class="featured__span">FEATURED</span>' : ''}
                </div>
                <h4 class="card__title">${position}</h4>
                <div class="card__details">
                    <span>${timeType}</span> • <span>${location}</span>
                </div>
            </div>
            <div class="card__skills">
                ${skills.map(skill => `<span class="c--span">${skill}</span>`).join('')}
            </div>
            <!-- Delete tugmasi -->
            <button class="delete-btn">O'chirish</button>
        </div>
    `;
    cardsContainer.insertAdjacentHTML('beforeend', cardHTML);

    // Yangi card yaratilganda "O'chirish" tugmasiga event listener qo'shish
    const deleteBtn = cardsContainer.lastElementChild.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteCard(deleteBtn));
}

// localStorage'dan card'larni yuklash
function loadCardsFromLocalStorage() {
    const savedCards = JSON.parse(localStorage.getItem('cards')) || [];
    savedCards.forEach(card => {
        createCard(
            card.logoUrl,
            card.companyName,
            card.isNew,
            card.isFeatured,
            card.position,
            card.timeType,
            card.jobType,
            card.location,
            card.skills
        );
    });
}

// Card o'chirish funksiyasi
function deleteCard(deleteBtn) {
    if (confirm("Rostan ham o'chirmoqchimisiz?")) {
        const cardElement = deleteBtn.closest('.card__form');
        cardElement.remove();

        // localStorage'dan card'ni o'chirish
        const companyName = cardElement.querySelector('.company').textContent;
        let savedCards = JSON.parse(localStorage.getItem('cards')) || [];
        savedCards = savedCards.filter(card => card.companyName !== companyName);
        localStorage.setItem('cards', JSON.stringify(savedCards));
    }
}

// Formadagi ma'lumotlarni saqlash funksiyasi
saveButton.addEventListener('click', function () {
    const logoUrl = document.querySelector('.url__infor').value;
    const companyName = document.querySelector('.company input').value;
    const isNew = document.querySelector('.label__one input').checked;
    const isFeatured = document.querySelector('.label__two input').checked;
    const position = document.querySelector('.position__container input').value;
    const timeType = document.getElementById('vaqt').value;
    const jobType = document.getElementById('ish-turi').value;
    const location = document.getElementById('location').value;

    // "Skills" checkboxlaridan tanlanganlarini olish
    const skills = [];
    document.querySelectorAll('.skills-group input:checked').forEach(input => skills.push(input.value));
    document.querySelectorAll('.skills__group--one input:checked').forEach(input => skills.push(input.value));

    if (!logoUrl || !companyName || !position || !timeType || !jobType || !location) {
        alert("Iltimos, barcha maydonlarni to'ldiring!");
        return;
    }

    createCard(logoUrl, companyName, isNew, isFeatured, position, timeType, jobType, location, skills);

    const savedCards = JSON.parse(localStorage.getItem('cards')) || [];
    savedCards.push({ logoUrl, companyName, isNew, isFeatured, position, timeType, jobType, location, skills });
    localStorage.setItem('cards', JSON.stringify(savedCards));

    document.querySelector('.one__container form__container').reset();
});

// Sahifa yuklanganda localStorage'dan card'larni yuklash
window.addEventListener('load', loadCardsFromLocalStorage);
