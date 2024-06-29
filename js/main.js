document.addEventListener("DOMContentLoaded", async () => {
  // Toggle Drawer Menu
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");
  const menuIcon = document.querySelector(".menu-icon");
  const closeIcon = document.querySelector(".drawer .drawer-close");
  const logo = document.querySelector(".navbar .logo");
  const loaderWrapper = document.getElementById("loader-wrapper");
  const loaderLogo = document.querySelector(".loader-logo");
  const header = document.querySelector(".header-absolute");
  const container = document.querySelector(".container");
  const loadingIndicator = document.querySelector(".loading-indicator");

  function toggleMenu() {
    const isOpen = drawer.classList.contains("open");
    if (isOpen) {
      gsap.to(drawer, { right: "-100%", duration: 0.3, display: "none" });
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        right: "100%",
        display: "none",
      });
    } else {
      gsap.to(drawer, { right: "0%", duration: 0.3, display: "flex" });
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3,
        right: "0%",
        display: "block",
      });
    }
    drawer.classList.toggle("open");
  }

  menuIcon.addEventListener("click", toggleMenu);
  closeIcon.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  // Loading Animation
  gsap.to(loaderWrapper, {
    y: "-100%",
    delay: 1,
    duration: 1.5,
    ease: "power4.inOut",
    onComplete: () => {
      loaderWrapper.style.display = "none";
    },
  });

  gsap.to(loadingIndicator, {
    delay: 0.5,
    duration: 1,
    opacity: 0,
    ease: "power4.inOut",
  });

  gsap.to(loaderLogo, {
    delay: 0.5,
    duration: 1,
    transform: "none",
    height: 50,
    top: 12,
    ease: "power4.inOut",
    left: (header.offsetWidth - container.offsetWidth) / 2 + 20,
    onComplete: () => {
      window.setTimeout(() => {
        document.body.style.overflow = "auto";
        loaderLogo.style.display = "none";
        logo.style.opacity = 1;
        animateHeroSection();
        animateAboutSection();
      }, 500);
    },
  });

  // Animate Hero Section after Loading
  function animateHeroSection() {
    gsap.to(".hero-content", {
      y: 0,
      opacity: 1,
      delay: 0.2,
      duration: 1,
      ease: "power4.out",
    });
  }
  function animateAboutSection() {
    const aboutTimeline = gsap.timeline();

    aboutTimeline
      .to(".about h2", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.2,
        ease: "power4.out",
      })
      .fromTo(
        ".about-image-wrapper",
        {
          x: -50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "sine.in",
        }
      )
      .fromTo(
        document.querySelectorAll(".about-text-wrapper p")[0],
        {
          x: 50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "sine.out",
          stagger: 0.2,
        },
        "-=0.4"
      )
      .fromTo(
        document.querySelectorAll(".about-text-wrapper p")[1],
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "power4.out",
          stagger: 0.2,
        },
        "-=0.2"
      );
  }

  gsap.registerPlugin(ScrollTrigger);

  function animateProjectSection() {
    gsap.fromTo(
      ".project h2",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".project h2",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      ".project-image-wrapper",
      {
        x: -50,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "cubic.in",
        scrollTrigger: {
          trigger: ".project-image-wrapper",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      ".project-text-wrapper p",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".project-text-wrapper p",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );
  }

  animateProjectSection();
  gsap.registerPlugin(ScrollTrigger);

  const features = document.querySelectorAll(".feature-item");

  features.forEach((feature, index) => {
    const animationType = index % 2 === 0 ? "slideFromLeft" : "slideFromRight";

    const fromProps =
      animationType === "slideFromLeft"
        ? { x: -50, opacity: 0 }
        : { x: 50, opacity: 0 };
    const toProps = { x: 0, opacity: 1, duration: 0.8, ease: "power4.out" };

    gsap.fromTo(feature, fromProps, {
      ...toProps,
      scrollTrigger: {
        trigger: feature,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });
  });

  const trustedItems = document.querySelectorAll(".trusted-item");

  trustedItems.forEach((item, index) => {
    gsap.fromTo(
      item,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  const serviceItems = document.querySelectorAll(".service-item");

  serviceItems.forEach((item, index) => {
    gsap.fromTo(
      item,
      {
        x: -50,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".service-item",
          start: "top 80%",
          end: "bottom 0%",

          delay: `0.${index}`,
          toggleActions: "play none none none",
        },
      }
    );
  });
  const serviceImage = document.querySelector(".service-img-wrapper");
  gsap.fromTo(
    serviceImage,
    {
      x: -50,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power4.out",
      scrollTrigger: {
        trigger: serviceImage,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    }
  );
  gsap.fromTo(
    ".insurance",
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".insurance",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    }
  );
  function initMap() {
    const map = L.map("map").setView(
      [24.872181887875936, 46.65931781404533],
      12
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const locations = [
      {
        position: [24.872181887875936, 46.65931781404533],
        title: "النرجس 16",
        // icon: "imgs/locations/location1.png",
      },
      {
        position: [24.922355639269078, 46.78231079748344],
        title: "بوابة مطار الملك خالد 08د",
        // icon: "imgs/locations/location2.jpg",
      },
      {
        position: [24.850038695120304, 46.80102894751417],
        title: "واجهة روشن 15 د",
        // icon: "imgs/locations/location3.jpg",
      },
      {
        position: [24.880078060788218, 46.71140433097221],
        title: "أكسبو 2030 10 د",
        // icon: "imgs/locations/location4.jpg",
      },
      {
        position: [24.869409644898308, 46.64311992404743],
        title: "مستشفى الحبيب (النرجس) 03 د",
        // icon: "imgs/locations/location5.jpg",
      },
    ];

    locations.forEach((location) => {
      const markerHtml = `
        <div class="custom-marker">
          <!-- <img src="${location.icon}" alt="${location.title}"> -->
          <div class="title">${location.title}</div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: "custom-icon",
        iconSize: [100, 100],
        popupAnchor: [0, -15],
      });

      const marker = L.marker(location.position, { icon: customIcon }).addTo(
        map
      );

      marker.on("click", () => {
        map.setView(location.position, 15);
        document
          .querySelectorAll(".custom-marker")
          .forEach((el) => el.classList.remove("active"));
        marker.getElement().classList.add("active");
      });
    });

    document.querySelectorAll(".tabs button").forEach((button) => {
      button.addEventListener("click", () => {
        const lat = button.getAttribute("data-lat");
        const lng = button.getAttribute("data-lng");
        map.setView([lat, lng], 15);
        document
          .querySelectorAll(".custom-marker")
          .forEach((el) => el.classList.remove("active"));
      });
    });
  }
  function initMap2() {
    const defaultLocation = [24.872181887875936, 46.65931781404533];
    const map = L.map("map").setView(defaultLocation, 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
    const locations = [
      { position: defaultLocation, title: "النرجس 16", duration: "0 د" },
      {
        position: [24.922355639269078, 46.78231079748344],
        title: "بوابة مطار الملك خالد",
        duration: "08 د",
      },
      {
        position: [24.850038695120304, 46.80102894751417],
        title: "واجهة روشن",
        duration: "15 د",
      },
      {
        position: [24.880078060788218, 46.71140433097221],
        title: "أكسبو 2030",
        duration: "10 د",
      },
      {
        position: [24.869409644898308, 46.64311992404743],
        title: "مستشفى الحبيب (النرجس)",
        duration: "03 د",
      },
    ];
    let polyline;
    let durationLabel; // Reference to the last duration label marker

    locations.forEach((location, index) => {
      const markerOptions = {
        color: location.position === defaultLocation ? "red" : "blue",
      };

      const customTooltip = `
        <div style="text-align: center;" class="custom-tooltip">
          <strong>${location.title}</strong><br>
        </div>
      `;

      const marker = L.circleMarker(location.position, markerOptions).addTo(
        map
      );

      if (index !== 0) {
        marker.bindTooltip(customTooltip, {
          permanent: true,
          direction: "top",
        });
      }

      marker.on("click", () => {
        if (location.position === defaultLocation) {
          // Reset the map view to the default location without adding or removing any markers or layers
          map.setView(defaultLocation, 12);
        } else {
          // Existing functionality for non-default locations
          const bounds = L.latLngBounds([defaultLocation, location.position]);
          map.fitBounds(bounds, { padding: [50, 50] });

          if (polyline) {
            map.removeLayer(polyline);
          }
          polyline = L.polyline([defaultLocation, location.position], {
            color: "blue",
            weight: 4,
          }).addTo(map);

          if (durationLabel) {
            map.removeLayer(durationLabel);
          }

          const midPoint = [
            (defaultLocation[0] + location.position[0]) / 2,
            (defaultLocation[1] + location.position[1]) / 2,
          ];

          durationLabel = L.marker(midPoint, {
            icon: L.divIcon({
              className: "duration-label",
              html: `<div style="background: #033551; padding: 8px;color:white; border: 1px solid black; width:fit-content;border-radius:50%;">${location.duration}</div>`,
              iconSize: [100, 40],
              iconAnchor: [50, 20],
            }),
          }).addTo(map);
        }
      });

      document.querySelectorAll(".dropdown-content a").forEach((link) => {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          const lat = link.getAttribute("data-lat");
          const lng = link.getAttribute("data-lng");
          const selectedLocation = [parseFloat(lat), parseFloat(lng)];

          // Define bounds to include both the default location and the selected location from the dropdown
          const bounds = L.latLngBounds([defaultLocation, selectedLocation]);
          map.fitBounds(bounds, { padding: [50, 50] }); // Adjust view with padding for better visibility

          if (polyline) {
            map.removeLayer(polyline);
          }
          polyline = L.polyline([defaultLocation, selectedLocation], {
            color: "black",
            weight: 4,
          }).addTo(map);

          if (durationLabel) {
            map.removeLayer(durationLabel);
          }

          const midPoint = [
            (defaultLocation[0] + parseFloat(lat)) / 2,
            (defaultLocation[1] + parseFloat(lng)) / 2,
          ];

          durationLabel = L.marker(midPoint, {
            icon: L.divIcon({
              className: "duration-label",
              html: `<div style="background: #152731; padding: 5px; color:white; border: 1px solid black;">${link.getAttribute(
                "data-duration"
              )}</div>`,
              iconSize: [100, 40],
              iconAnchor: [50, 20],
            }),
          }).addTo(map);
        });
      });
    });
  }
  initMap2();

  // initMap();
  const tableData = [
    [
      "01",
      "251.98م",
      "1,310,296 ريال",
      "الأرضي",
      "غرفة نوم ماستر + 2 غرفة نوم + 3 دورات مياه + مجلس + 2 صالة مطبخ مفتوح على الصالة + غرفة شغاله مع دورة مياه + غرفه غسيل مدخل خاص + موقف داخلي خاص  +حوش خاص",
    ],
    [
      "02",
      "202.76م",
      "1,196,284 ريال",
      "الأرضي",
      "غرفة نوم ماستر + 2 غرفه نوم + 3 دورات مياه + مجلس مفتـــــوح على صالة  - مطبخ مفتوح على الصالة +غرفة شغاله مع دورة مياه + حوش خاص",
    ],
    [
      "03",
      "236.51م",
      "1,229,852 ريال",
      "الأرضي",
      "غرفة نوم ماستر  - 2 غرفة نوم - 3 دورات مياه - مجلس - صالة - مطبخ مفتوح على الصالة - غرفة خادمة مع دوره مياه - مدخل خاص - موقف داخلي خاص - حوش خاص",
    ],
    [
      "04",
      "159.54م",
      "1,100,826 ريال",
      "الأول",
      "غرفة نوم ماستر - 2 غرفة نوم - مجلس مفتــــوح على الصاله - 3 دورات ميــاه  - مطبخ مفتوح على الصاله - غرفه خادمة مع دورة مياه - غرفة غسيل",
    ],
    [
      "05",
      "141.46م",
      "990,220 ريال",
      "الأول",
      "غرفة نوم ماستر - 2 غرفة نوم - مجلس مفتوح على الصاله - 3 دورات مياه مطبخ مفتوح على الصاله - غرفه شغاله",
    ],
    [
      "06",
      "153.36م",
      "1,073,520 ريال",
      "الأول",
      "غرفة نوم ماستر - 2 غرفة نوم - مجلس مفتوح على الصاله - 3 دورات مياه - مطبخ مفتوح على الصاله - اطلاله بانوراميه داخليه - غرفه شغاله مع دورة مياه - غرفة غسيل",
    ],
    [
      "07",
      "141.46م",
      "990,220 ريال",
      "الأول",
      "غرفة نوم ماستر - 2 غرفة نوم - مجلس مفتوح على الصاله - 3 دورات مياه مطبخ مفتوح على الصاله - غرفه خادمة",
    ],
    [
      "08",
      "159.45م",
      "1,100,826 ريال",
      "الأول",
      "غرفة نوم ماستر - 2 غرفة نوم - مجلس مفتــــوح على الصاله - 3 دورات مياه  - مطبخ مفتوح على الصاله - غرفه خادمة",
    ],
    [
      "09",
      "210.09م",
      "1,159,950 ريال",
      "الثاني",
      "غرفة نوم ماستر - 2 غرفة نوم - مجلس مفتــــوح على الصاله - 3 دورات مياه - مطبخ مفتوح على الصاله - غرفه خادمه مع دورة مياه - غرفة غسيل",
    ],
    [
      "10",
      "141.46م",
      "990,220 ريال",
      "الثاني",
      "غرفة نوم ماستر - 2 غرفة نوم - مجلس مفتــــــــــوح على الصاله  - 3 دورات مياه - مطبخ مفتوح على الصاله - غرفه خادمه مع دورة مياه - غرفة غسيل - اطلاله بانوراميه خلفيه - سطح خاص",
    ],
    [
      "11",
      "153.36م",
      "1,073,520 ريال",
      "الثاني",
      "غرفة نوم ماستر - 2 غرفة نوم - مجلس مفتـــــوح على الصاله - 3  دورات مياه - مطبخ مفتوح على الصاله - غرفه خادمه",
    ],
    [
      "12",
      "141.46م",
      "1,325,069 ريال",
      "الثاني",
      "غرفة نوم ماستر - 2 غرفة نوم - مجلس مفتوح على الصاله - 3 دورات مياه - مطبخ مفتوح على الصاله - اطلاله بانوراميه داخليه - غرفه خادمه مع دورة مياه - غرفة غسيل",
    ],
    [
      "13",
      "210.09م",
      "1,159,950 ريال",
      "الثاني",
      "غرفة نوم ماستر - 2 غرفة نوم - مجلس مفتــــــوح على الصاله - 3 دورات مياه - مطبخ مفتوح على الصاله - غرفه خادمه",
    ],
    [
      "14",
      "262.39م",
      "1,325,069 ريال",
      "الملحق",
      "غرفة نوم ماستر -2غرفة نوم -مجلس-صاله -3 دورات مياه - مطبخ مفتوح على الصاله -غرفه خادمه مع دورة مياه - اطلاله بانوراميه خلفيه واماميه واسطح خاصه اماميه وخلفيه",
    ],
    [
      "15",
      "269.64م",
      "1,348,200 ريال",
      "الملحق",
      "غرفة نوم ماستر - 2 غرفة نوم - مجلس - صاله - 3 دورات مياه - مطبخ مفتوح على الصاله - غرفه خادمه مع دورة مياه - اطلاله بانوراميه خلفيه واماميه واسطح خاصه اماميه وخلفيه",
    ],
  ];

  let currentPage = 1;
  const rowsPerPage = 10;
  const tableBody = document.getElementById("apartment-tbody");
  const pageInfo = document.getElementById("page-info");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  function displayTable(data, tableBody, rowsPerPage, page) {
    tableBody.innerHTML = "";
    page--;

    const start = rowsPerPage * page;
    const end = start + rowsPerPage;
    const paginatedItems = data.slice(start, end);

    for (let i = 0; i < paginatedItems.length; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < paginatedItems[i].length; j++) {
        const cell = document.createElement("td");
        cell.textContent = paginatedItems[i][j];
        row.appendChild(cell);
      }
      tableBody.appendChild(row);
    }
  }

  function updatePagination() {
    pageInfo.textContent = `صفحة ${currentPage} من ${Math.ceil(
      tableData.length / rowsPerPage
    )}`;

    if (currentPage === 1) {
      prevBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
    }

    if (currentPage === Math.ceil(tableData.length / rowsPerPage)) {
      nextBtn.disabled = true;
    } else {
      nextBtn.disabled = false;
    }
  }

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayTable(tableData, tableBody, rowsPerPage, currentPage);
      updatePagination();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < Math.ceil(tableData.length / rowsPerPage)) {
      currentPage++;
      displayTable(tableData, tableBody, rowsPerPage, currentPage);
      updatePagination();
    }
  });

  displayTable(tableData, tableBody, rowsPerPage, currentPage);
  updatePagination();
});
