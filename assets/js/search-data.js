// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "news-presented-the-poster-at-the-icra-2025-workshop-handy-moves-dexterity-in-multi-fingered-hands",
          title: 'Presented the poster at the ICRA 2025 workshop “Handy Moves: Dexterity in Multi-Fingered...',
          description: "",
          section: "News",},{id: "news-our-paper-on-multi-modal-robotic-fingertip-was-accepted-to-iros-2026",
          title: 'Our paper on multi-modal robotic fingertip was accepted to IROS 2026 !',
          description: "",
          section: "News",},{id: "projects-whole-body-control-of-a-dexterous-hand-robot-system",
          title: 'Whole-Body Control of a Dexterous Hand–Robot System',
          description: "Designed a kinematic-twin teleoperation system for whole-body control of a dexterous hand–arm robot. Direct joint mapping enables intuitive operation, while a real-time MuJoCo digital twin supports visualization and validation of teleoperation commands.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project.html";
            },},{id: "projects-tactile-augmented-robot-learning-for-contact-rich-manipulation",
          title: 'Tactile-Augmented Robot Learning for Contact-Rich Manipulation',
          description: "Developed and evaluated tactile-augmented imitation learning policies for fragile and contact-rich manipulation. Across tofu pinching, chip pinching, and box opening, the results show that force feedback is most valuable when visual observations cannot precisely resolve contact state, improving chip pinching success from 1/10 to 6/10.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project.html";
            },},{id: "projects-model-based-trajectory-control-and-planning-for-a-whiteboard-robot",
          title: 'Model Based Trajectory Control and Planning for a Whiteboard Robot',
          description: "This project used an existing magnetic whiteboard-cleaning robot as a testbed for model-based motion control on vertical surfaces. I implemented and evaluated TVLQR and MPC trajectory tracking algorithms against a PID baseline, with MPC providing the most stable and robust erasing performance in hardware experiments.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project.html";
            },},{id: "projects-galvo-mirrir-robot-calibration-for-3d-workspace-extension",
          title: 'Galvo mirrir–Robot Calibration for 3D Workspace Extension',
          description: "Worked on a galvo mirror–robot co-working platform that combines fast planar galvo scanning with 6-DoF robotic motion to extend the effective workspace into 3D. Developed a kinematic calibration and error-compensation model to estimate system parameters from planar images and improve spatial positioning accuracy.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project.html";
            },},{id: "projects-history-aware-tactile-decision-making-for-object-centric-manipulation",
          title: 'History-Aware Tactile Decision-Making for Object-Centric Manipulation',
          description: "Designed a tactile event extraction framework for object-centric manipulation, where long-horizon exploration is compressed into informative tactile tokens through a Top-K selector. The extracted object context enables policies to reason about localized physical properties and adapt manipulation actions accordingly.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project.html";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project.html";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project.html";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project.html";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project.html";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%7A%68%75%6F%77%65%69%78@%61%6E%64%72%65%77.%63%6D%75.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/zhuoweixu02", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/zhuowei-xu-230568393", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0009-0002-1661-1351", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
