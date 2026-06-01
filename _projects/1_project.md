---
layout: page
title: Whole-Body Control of a Dexterous Hand–Robot System
description: Designed a kinematic-twin teleoperation system for whole-body control of a dexterous hand–arm robot. Direct joint mapping enables intuitive operation, while a real-time MuJoCo digital twin supports visualization and validation of teleoperation commands.
img: assets/img/project_preview/whole_body_tele_demo.gif
importance: 2
category: research
selected: true
related_publications: true
---

<!-- Every project has a beautiful feature showcase page.
It's easy to include images in a flexible 3-column grid format.
Make your photos 1/3, 2/3, or full width.

To give your project a background in the portfolio page, just add the img tag to the front matter like so:

    ---
    layout: page
    title: project
    description: a project with a background image
    img: /assets/img/12.jpg
    --- -->

To **extend the reachable workspace** and **enable intuitive whole-body teleoperation** of the DeltaHand–Franka system, I developed a kinematic-twin-based teleoperation framework. The robotic platform consists of a sensorized DeltaHand mounted on the end effector of a Franka robotic arm. The DeltaHand is a multi-fingered, non-anthropomorphic robotic hand equipped with tactile sensing.

The teleoperation interface is built around a **TeleHand–GELLO** system that serves as a kinematic twin of the DeltaHand–Franka robot. During teleoperation, the operator can manipulate the TeleHand to simultaneously control both the arm and hand motions of the robot. Motion of the TeleHand determines the end-effector pose of the Franka arm, while the TeleHand finger joints directly command the corresponding joints of the DeltaHand. By leveraging a kinematic-twin design, the system enables direct **joint-to-joint mapping**, resulting in intuitive and low-latency control.

To facilitate visualization and verification of the teleoperation signals, I also created **virtual counterparts** of both the TeleHand–GELLO interface and the DeltaHand–Franka system in **MuJoCo**. These simulated models receive the teleoperator joint outputs as commands, providing real-time visualization of the commanded robot configuration and serving as a digital twin of the physical teleoperation system.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <video class="img-fluid rounded z-depth-1 autoplay-video" loop muted playsinline>
            <source src="{{ 'assets/img/proj1/presentation/twins/kinematic_twin.mp4' | relative_url }}" type="video/mp4">
        </video>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <video class="img-fluid rounded z-depth-1 autoplay-video" loop muted playsinline>
            <source src="{{ 'assets/img/proj1/presentation/twins/real_robot.mp4' | relative_url }}" type="video/mp4">
        </video>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <video class="img-fluid rounded z-depth-1 autoplay-video" loop muted playsinline>
            <source src="{{ 'assets/img/proj1/presentation/twins/virtual_twin.mp4' | relative_url }}" type="video/mp4">
        </video>
    </div>
</div>
<div class="caption">
    Teleoperator, real robot, and kinematic twin visualization of the system
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <video class="img-fluid rounded z-depth-1 autoplay-video" loop muted playsinline>
            <source src="{{ 'assets/img/proj1/presentation/tong.mp4' | relative_url }}" type="video/mp4">
        </video>
    </div>
</div>
<div class="caption">
    teleoperate the system to use the tong.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <video class="img-fluid rounded z-depth-1 autoplay-video" loop muted playsinline>
            <source src="{{ 'assets/img/proj1/presentation/cap.mp4' | relative_url }}" type="video/mp4">
        </video>
    </div>
</div>
<div class="caption">
    teleoperate the system to open the cap of the tissue box.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <video class="img-fluid rounded z-depth-1 autoplay-video" loop muted playsinline>
            <source src="{{ 'assets/img/proj1/presentation/cup.mp4' | relative_url }}" type="video/mp4">
        </video>
    </div>
</div>
<div class="caption">
    teleoperate the system to unstack the cup.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <video class="img-fluid rounded z-depth-1 autoplay-video" loop muted playsinline>
            <source src="{{ 'assets/img/proj1/presentation/glass-frame.mp4' | relative_url }}" type="video/mp4">
        </video>
    </div>
</div>
<div class="caption">
    teleoperate the system to use the glass frame.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <video class="img-fluid rounded z-depth-1 autoplay-video" loop muted playsinline>
            <source src="{{ 'assets/img/proj1/presentation/screw-driver.mp4' | relative_url }}" type="video/mp4">
        </video>
    </div>
</div>
<div class="caption">
    teleoperate the system to use the screw-driver.
</div>

<script>
(function() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.play();
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('video.autoplay-video').forEach(function(video) {
    observer.observe(video);
  });
})();
</script>
