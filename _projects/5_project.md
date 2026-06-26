---
layout: page
title: History-Aware Tactile Decision-Making for Object-Centric Manipulation
description: Designed a tactile event extraction framework for object-centric manipulation, where long-horizon exploration is compressed into informative tactile tokens through a Top-K selector. The extracted object context enables policies to reason about localized physical properties and adapt manipulation actions accordingly.
img: assets/img/project_preview/topk.gif
importance: 3
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

This project investigates how active tactile exploration can be used to infer latent object properties for downstream object-centric manipulation. During exploration, the robot collects tactile, force, and proprioceptive observations through physical interaction with the object. Instead of using the full long-horizon history directly, the system extracts a compact set of informative tactile events as an object-level context, which is then used to condition subsequent policy decisions in partially observable settings.

---

### End-to-End Policy with Top-K Tactile Event Selection

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/proj5/topk-structure.png" title="Diffusion policy architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    End-to-end tactile event extraction with a Top-K selector over long-horizon vibrotactile observations
</div>

This section studies whether long-horizon tactile exploration can be compressed through sparse event selection while preserving the information needed for downstream decision making. Inspired by token-pruning mechanisms in DynamicViT, the Top-K selector assigns importance scores to vibrotactile embeddings and retains only a small set of informative key frames from the exploration history. In the sponge side-selection task, the Top-K selector achieved performance comparable to a Transformer-based history compressor, suggesting that tactile-conditioned policies do not always require dense sequence modeling when the relevant physical evidence is concentrated in a small number of interaction events.

---

# Localized Feature Inference for Object-Centric Decision Making
<div class="row justify-content-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        <video class="img-fluid rounded z-depth-1 autoplay-video" loop muted playsinline>
            <source src="{{ 'assets/img/proj5/spongeslide.mp4' | relative_url }}" type="video/mp4">
        </video>
    </div>
</div>
<div class="caption">
    Sliding-based tactile exploration for identifying localized surface properties of a sponge
</div>
We evaluate the tactile event extraction framework on a localized feature inference task. The robot slides along both sides of a sponge to collect tactile and proprioceptive observations, infers which side is rough or smooth from the exploration history, and then flips the sponge to use the smooth side for wiping. This task requires the policy to associate tactile observations with spatially localized object features and recall this information during a later manipulation decision, making it a compact testbed for POMDP-style tactile reasoning.

---

### Pretrained Object Representation Learning through Token Selection

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/proj5/exp2context.png" title="end2end architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Pretraining tactile object representations from long-horizon exploratory interactions
</div>

Beyond end-to-end policy learning, this project also explores a representation-learning formulation in which tactile exploration is used to pretrain task-agnostic object embeddings. The model observes long-horizon trajectories containing vibrotactile readings, robot motion, and end-effector force, and uses a Top-K token learner to select informative moments from the interaction history. The selected tokens are projected into a compact object representation that captures physical properties discovered through active exploration and can later be used as a conditioning signal for downstream policy learning.

---

### Exploration with Reusable Unit Skills
<div class="row justify-content-center">
    <div class="col-12 mt-3 mt-md-0">
        <video class="img-fluid w-100 rounded z-depth-1 autoplay-video" loop muted playsinline>
            <source src="{{ 'assets/img/proj5/unitskills/5skills.mp4' | relative_url }}" type="video/mp4">
        </video>
    </div>
</div>
<div class="caption">
    Reusable exploratory skills designed to expose complementary physical properties of objects.
</div>

To provide structured tactile evidence, the robot explores objects through a set of reusable unit skills, including squeezing, sliding, lifting, horizontal shifting, and tilting. Each skill is associated with different types of physical information: squeezing provides cues about rigidity, sliding reveals surface smoothness and material properties, and lifting or shifting can expose weight and internal-content-related features. Combining these interaction primitives allows the system to build richer object representations from diverse forms of physical contact.

---

### Interpreting the Learned Token Selection

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/proj5/deltahand-object-representation-fixed.png" title="Diffusion policy architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Visualization of selected tactile tokens across exploratory skills and object properties
</div>

The learned token selector is evaluated through attribute prediction accuracy and qualitative token-selection patterns. For seen objects, the model achieves near-saturated performance on stiffness, smoothness, and material classification, while granularity remains the most difficult attribute. On unseen objects, smoothness generalizes well across all tested modalities, whereas weight and granularity exhibit larger drops in accuracy, indicating that these properties are more sensitive to object variation and may require stronger multimodal evidence. The comparison across modalities shows that incorporating force and joint information improves several unseen-object attributes, most notably weight prediction, suggesting that proprioceptive and force signals provide complementary information to vibrotactile observations. 

The selected-token plots show that the Top-K learner concentrates tokens in specific exploratory phases rather than distributing them uniformly over time. In particular, tokens are frequently selected around squeezing and later shifting interactions, which are physically relevant for inferring rigidity, weight, and internal-content-related properties. These results suggest that the selector learns to identify informative tactile events associated with object-property inference.

### Context-Aware Object-Centric Policy Learning

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/proj5/archetec1.png" title="Diffusion policy architecture" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Object-centric policy learning conditioned on tactile object representations
</div>

The learned object representation is used as a time-invariant context for downstream policy learning. This context is combined with object position embeddings and time-varying observations such as proprioception, vision, and tactile feedback, and is then provided to an ACT-style policy for action prediction. By conditioning the policy on object features inferred from prior exploration, the framework enables manipulation behavior to adapt to latent physical properties that are not directly observable at decision time.

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
