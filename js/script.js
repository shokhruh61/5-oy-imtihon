// Saqlash tugmasini tanlab olayapmiz
const saveButton = document.querySelector('.form__btn');

// Saqlash tugmasi bosilganda card qo'shish funksiyasi
saveButton.addEventListener('click', function () {
    // Formadagi ma'lumotlarni olish
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
    document.querySelectorAll('.skills-group input:checked').forEach((input) => {
        skills.push(input.value);
    });
    document.querySelectorAll('.skills__group--one input:checked').forEach((input) => {
        skills.push(input.value);
    });

    // Agar kerakli maydonlar to'ldirilmagan bo'lsa, alert chiqaramiz
    if (!logoUrl || !companyName || !position || !timeType || !jobType || !location) {
        alert("Iltimos, barcha maydonlarni to'ldiring!");
        return;
    }

    // Yangi card yaratilishi uchun card containerini topamiz
    const cardsContainer = document.querySelector('.cards');

    // Yangi card yaratamiz
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
        </div>
    `;

    // Cardni containerga qo'shamiz
    cardsContainer.insertAdjacentHTML('beforeend', cardHTML);

    // Forma tozalanadi
    document.querySelector('.one__container form__container').reset();
});
