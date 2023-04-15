// $('.navTrigger').click(function () {
//     $(this).toggleClass('active');
//     console.log("Clicked menu");
//     $("#mainListDiv").toggleClass("show_list");
//     $("#mainListDiv").fadeIn();

// });

const docStyle = document.documentElement.style;
const threshold = [...Array(100).keys()].map(i => i / 100);

const itemsObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.documentElement.style.setProperty(
                    "--translate-value",
                    Math.round(-(1 - entry.intersectionRatio) * 40)
                );
                document.documentElement.style.setProperty(
                    "--translate-value-header",
                    Math.round(-(entry.intersectionRatio * 90))
                );
            }
        });
    },
    { threshold: threshold }
);

const itemsObserverSecondary = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0) {
                entry.target.classList.remove("toggle-class");
                itemsObserverSecondary.unobserve(entry.target);
            }
        });
    },
    { threshold: threshold }
);

itemsObserver.observe(document.querySelector(".main"));
const toggles = [...document.querySelectorAll(".toggle-class")];
toggles.forEach(toggle => {
    itemsObserverSecondary.observe(toggle);
})

