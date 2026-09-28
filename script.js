const progressBar = document.querySelector(".progress");

function updateProgressBar() {
    const scrollableHeight = document.documentElement.scrollHeight - innerHeight;
    const progress = scrollableHeight > 0 ? (scrollY / scrollableHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
}

function animateHero() {
    document.querySelectorAll(".hero h1 span").forEach((element, index) => {
        setTimeout(() => {
            element.style.transition = "transform 1s cubic-bezier(.16,1,.3,1), opacity .6s";
            element.style.transform = "none";
            element.style.opacity = 1;
        }, 100 + index * 100);
    });

    document.querySelectorAll(".hero .reveal").forEach((element, index) => {
        setTimeout(() => {
            element.style.transition = "all .7s ease";
            element.style.opacity = 1;
            element.style.transform = "none";
        }, 350 + index * 100);
    });
}

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.style.transition = "opacity .65s ease, transform .75s cubic-bezier(.2,.8,.2,1)";
            entry.target.style.opacity = 1;
            entry.target.style.transform = "none";
            revealObserver.unobserve(entry.target);
        });
    },
    { threshold: 0.08 }
);

function observeRevealElements() {
    document.querySelectorAll(".reveal:not(.hero .reveal)").forEach(element => {
        revealObserver.observe(element);
    });
}

function setupProjectFilters() {
    const filterButtons = document.querySelectorAll(".filter button");
    const projectCards = document.querySelectorAll(".card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(item => item.classList.remove("active"));
            button.classList.add("active");

            const selectedFilter = button.dataset.filter;

            projectCards.forEach(card => {
                const shouldHide = selectedFilter !== "all" && card.dataset.cat !== selectedFilter;
                card.classList.toggle("hidden", shouldHide);
            });
        });
    });
}

addEventListener("scroll", updateProgressBar);
addEventListener("load", animateHero);

observeRevealElements();
setupProjectFilters();
