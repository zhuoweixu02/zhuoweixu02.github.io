---
layout: page
title: Model Based Trajectory Control and Planning for a Magnetic Whiteboard Cleaning Robot
description: This project used an existing magnetic whiteboard-cleaning robot as a testbed for model-based motion control on vertical surfaces. I implemented and evaluated TVLQR and MPC trajectory tracking algorithms against a PID baseline, with MPC providing the most stable and robust erasing performance in hardware experiments.
img: assets/img/project_preview/OCRL.png
pdf: /assets/pdf/OCRL_WIPER_Report.pdf
importance: 3
category: research
selected: false
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

This project studies how tactile sensing can augment imitation learning policies in fragile-object and contact-rich manipulation tasks. We evaluate tactile-augmented policies on three tasks: **tofu pinching**, **chip pinching**, and **box opening**. The first two tasks use a diffusion-policy-based architecture, where visual, tactile, and proprioceptive features are concatenated and used as the policy condition. The box-opening task uses an ACT-based architecture, where each sensory stream is converted into modality-specific tokens and processed by an Action Chunking Transformer.

The objective of this study is not only to compare final success rates, but also to understand **when tactile sensing provides complementary state information beyond vision**. In particular, we analyze whether tactile feedback improves fragile-object handling, reduces unstable recovery behaviors, or provides a more direct estimate of the contact state.

---

### Diffusion Policy Architecture

For the tofu and chip pinching tasks, we use a diffusion policy conditioned on multi-modal observations. The in-hand image is encoded by a visual encoder, while force, vibrotactile/audio, and joint-position observations are encoded by lightweight modality-specific encoders. The resulting perception features are concatenated and passed to the diffusion policy as the observation condition.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/proj2/diffusion_policy_architecture.png" title="Diffusion policy architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Diffusion-policy architecture for the tofu and chip pinching tasks. Multi-modal perception features are concatenated and used as the policy condition.
</div>

---

### Tofu Pinching

The tofu pinching task evaluates whether tactile feedback improves manipulation of a deformable fragile object during a **regrasping** behavior. In this task, the policy first pinches and lifts the tofu using one opposing finger pair, then transfers the grasp to another opposing finger pair while keeping the tofu suspended. This requires the policy to maintain a stable but gentle grasp during the transition, since insufficient force may cause the tofu to slip, while excessive force could damage the object. Each policy was evaluated for 10 trials. A trial was considered successful if the policy completed the finger-pair transfer and maintained the grasp within 3 minutes while keeping the tofu intact.

The policies were trained using 40 demonstrations.

| Observation setting | Success rate | 
| --- | ---: | 
| In-hand image + joint position | 10 / 10 | 
| Force + joint position | 8 / 10 | 
| Audio + joint position | 5 / 10 | 
| Force + In-hand image + joint position | 8 / 10 | 
| Audio + force + in-hand image + joint position | 8 / 10 |

<div class="row justify-content-center">
    <div class="col-sm-4 mt-3 mt-md-0">
        <video class="img-fluid rounded z-depth-1 autoplay-video" loop muted playsinline>
            <source src="{{ 'assets/img/proj2/tofu.mp4' | relative_url }}" type="video/mp4">
        </video>
    </div>
</div>
<div class="caption">
    Evaluation of the tofu pinching task using force and joint-position observations.
</div>

The results suggest that tactile sensing does not provide a clear improvement in this task when **object deformation is already visually observable**. The in-hand image and joint-position baseline achieves 10 / 10 success, while the tactile-augmented variants achieve comparable but not better performance. This suggests that, for tofu pinching, the visual stream already contains strong cues about the grasp state through the visible deformation of the object. Since ResNet-style image encoders are effective at extracting such deformation features, explicit force sensing does not appear to provide additional task-relevant information beyond the image-and-joint baseline under the current setup.

The force-and-joint policy still achieves a relatively high success rate of 8 / 10 without image observations. This result is important because it suggests that **tactile feedback**, together with **proprioception**, can support a **compact and informative estimate** of the grasp state. In other words, tactile sensing may not improve over vision when the relevant contact information is already visually available, but it can still provide a useful **low-dimensional representation** for contact-aware manipulation.

Audio is less effective in this task. The audio-and-joint policy achieves only 5 / 10 success, suggesting that the audio signal is either too sparse, too noisy, or weakly correlated with the slow deformation process involved in tofu pinching. The full multi-modal policy with audio, force, in-hand image, and joint position achieves 8 / 10 success, which again does not improve over the image-and-joint baseline. This suggests that simply adding more sensory modalities does not necessarily improve imitation learning performance, especially when some modalities provide weak or noisy task-relevant information under a limited demonstration budget.

It is also worth noting that **no evaluation trial failed by crushing the tofu**. All failures were timeout failures where the policy did not complete the pinch within the 3-minute limit. Therefore, the main challenge in this task is not excessive force regulation, but whether the policy can reliably infer when and how to complete the pinch. For tofu, this inference appears to be sufficiently captured by visual deformation and joint-state observations.

---

### Chip Pinching

The chip pinching task is more sensitive to contact force. The object is thin and brittle, and successful execution requires the policy to apply enough normal force to grasp the chip while avoiding excessive force that would break it. During teleoperation demonstrations, the normal force was controlled within approximately 0.5 N to avoid damaging the chip.

The policies were trained using 50 demonstrations.

| Observation setting | Success rate | 
| --- | ---: | 
| In-hand image + joint position | 1 / 10 | 
| In-hand image + force + joint position | 6 / 10 |

<div class="mt-3"></div>

Compared with tofu pinching, the chip pinching task shows a clearer benefit from force feedback. The image-and-joint baseline succeeds in only 1 / 10 trials. In many failure cases, the policy repeatedly attempts to pinch the chip but does not reliably transition to lifting. This suggests that visual observations alone are insufficient to determine whether the chip has been securely grasped.

Adding **force feedback improves the success rate** to 6 / 10. In successful force-augmented trials, once the fingers establish contact with the chip, the policy exhibits less horizontal-plane jittering and proceeds to lift the object more stably. This behavior suggests that **force feedback** provides a more **precise estimate** of the grasp state than vision alone.

This task highlights a setting where tactile sensing is particularly valuable: **fragile-object manipulation with a narrow feasible force range**. For brittle objects such as chips, vision may indicate whether contact has occurred, but it is less reliable for estimating whether the applied force is sufficient for lifting while still remaining below the breaking threshold. Force sensing directly reduces this ambiguity.

<div class="row justify-content-center">
    <div class="col-sm-4 mt-3 mt-md-0">
        <video class="img-fluid rounded z-depth-1 autoplay-video" loop muted playsinline>
            <source src="{{ 'assets/img/proj2/chippinch/Media1.mp4' | relative_url }}" type="video/mp4">
        </video>
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        <video class="img-fluid rounded z-depth-1 autoplay-video" loop muted playsinline>
            <source src="{{ 'assets/img/proj2/chippinch/Media2.mp4' | relative_url }}" type="video/mp4">
        </video>
    </div>
</div>
<div class="caption">
    Evaluation of the chip pinching task using the image-and-joint baseline (right) and the force-augmented policy (left).
</div>

---

### ACT Policy Architecture

For the box-opening task, we use an ACT policy. The in-hand image is encoded by a pre-trained DINO-v2 encoder and converted into image patch tokens. Fingertip force observations are encoded by a CNN encoder, vibrotactile/audio signals are encoded by a PANN-based encoder, and DeltaHand joint positions are mapped into proprioceptive tokens using a linear projection. These tokens are passed into the Action Chunking Transformer, which predicts a sequence of future DeltaHand actions.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/proj2/act.png" title="ACT policy architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    ACT policy architecture for the tactile-augmented box-opening policy.
</div>

---

### Box Opening

The box-opening task evaluates tactile sensing in a contact-rich manipulation scenario. We collected 25 demonstrations. During data collection, the hand was kept parallel to the table, while the vertical height of the hand was randomized within a total range of approximately 1.5 cm. This height randomization was intentionally introduced to make monocular depth estimation more challenging. The initial pose of the box was also randomized: the box position was sampled within an approximately 10 cm radius under the hand's frontal projection, and the box orientation was randomized within ±45°.

This setup was designed to test whether tactile sensing can help the policy estimate contact more directly, instead of relying on repeated visual recovery or stochastic retry behaviors.

| Observation setting | Success rate | 
| --- | ---: | 
| In-hand image + joint position | 10 / 10 | 
| In-hand image + force + joint position | 10 / 10 | 
| In-hand image + audio + joint position | 10 / 10 |

<div class="mt-3"></div>

**All three policies achieve 10 / 10 success**. Therefore, final success rate alone does not reveal a measurable advantage from adding tactile sensing. To further analyze the behavior, we also examine whether tactile sensing reduces temporary failures, recovery motions, or repeated contact attempts.

The image-and-joint baseline and the force-augmented policy show similar execution behavior. Both policies complete the task reliably and achieve first-attempt success in the evaluation trials. This suggests that, under the current data distribution, visual and proprioceptive observations are already sufficient for solving the box-opening task, and force feedback does not provide a clear additional benefit.

In contrast, the audio-augmented policy also achieves 10 / 10 final success but increases the average execution time by approximately 50%. One possible explanation is that the vibrotactile/audio signal is noisy and highly dependent on local contact conditions. With only 25 demonstrations, the policy may not learn an audio representation that sufficiently covers the possible contact events during box opening. A more systematic data-scaling ablation would be needed to determine whether audio becomes beneficial with more demonstrations.

<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        <video class="img-fluid rounded z-depth-1 autoplay-video" loop muted playsinline>
            <source src="{{ 'assets/img/proj2/boxopening/visionbluesuccess.mp4' | relative_url }}" type="video/mp4">
        </video>
    </div>
</div>
<div class="caption">
    Evaluation of the box-opening task using the image-and-joint baseline.
</div>
<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        <video class="img-fluid rounded z-depth-1 autoplay-video" loop muted playsinline>
            <source src="{{ 'assets/img/proj2/boxopening/visionforcebluesuccess.mp4' | relative_url }}" type="video/mp4">
        </video>
    </div>
</div>

<div class="caption">
    Evaluation of the box-opening task using the force-augmented policy.
</div>

---

### Discussion

Across the three tasks, the usefulness of tactile sensing depends strongly on the physical structure of the manipulation problem.

For tofu pinching, **visual deformation** already provides a strong **implicit cue** about the **contact state**. The image-and-joint baseline maintains the highest success rate, while adding tactile modalities does not provide a clear improvement. This suggests that tactile sensing is not universally beneficial: when the relevant contact state is already observable through vision, additional tactile modalities may not add useful complementary information under the current data scale and policy architecture. Nevertheless, the force-and-joint policy still achieves 8 / 10 success, showing that force feedback can serve as a compact low-dimensional representation of grasp state even when it does not improve over vision.

For chip pinching, force feedback provides a clear benefit. The task requires **regulating contact force within a narrow feasible range**: too little force fails to lift the chip, while too much force risks breaking it. In this setting, force sensing provides a more direct and precise estimate of the grasp state than visual observations alone.

For box opening, force sensing does not improve success rate or execution behavior under the current setup, because the image-and-joint baseline already solves the task reliably. Audio feedback maintains the same final success rate but increases execution time, suggesting that audio representations may require more demonstrations or more structured representation learning to become useful in this task.

Overall, these results suggest that tactile sensing is most beneficial when the task requires **contact-state estimation that is difficult to infer from vision alone**, especially in fragile-object manipulation where the policy must regulate force within a narrow range.

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
