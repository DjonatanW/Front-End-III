document.addEventListener("DOMContentLoaded", function () {
  const videoSection = document.querySelector(".video");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoSection.classList.add("visible");
        }
      });
    },
    { threshold: 1.5 }
  );

  observer.observe(videoSection);
});