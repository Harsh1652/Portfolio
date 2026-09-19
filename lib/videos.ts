// YouTube videos shown on /youtube. Add a new object here to publish a new section —
// the page, structured data, sitemap and llms.txt all read from this list.

export type Chapter = {
  /** Start time in seconds */
  start: number;
  title: string;
  /** Transcript paragraphs spoken during this chapter */
  paragraphs: string[];
};

export type Video = {
  id: string; // YouTube video id
  slug: string; // anchor on /youtube
  title: string;
  description: string;
  summary: string;
  uploadDate: string; // ISO 8601
  duration: string; // ISO 8601 duration
  durationLabel: string;
  topics: string[];
  takeaways: string[];
  chapters: Chapter[];
  faqs: { q: string; a: string }[];
};

export const CHANNEL = {
  name: "Invisigent",
  handle: "@invisigent",
  url: "https://www.youtube.com/@invisigent",
  subscribeUrl: "https://www.youtube.com/@invisigent?sub_confirmation=1",
  tagline: "Architecture and infrastructure behind modern AI systems.",
};

export const videos: Video[] = [
  {
    id: "4EJ4-WXrf74",
    slug: "openai-astra-looped-transformers",
    title: "OpenAI's Astra: The Strange Idea of Reusing AI Layers",
    description:
      "What if an AI model didn't need more layers to become more capable — what if it could reuse the same layers and compute more? A breakdown of looped transformers, the parameters-versus-compute trade-off, and what reports about OpenAI's Astra suggest about a different way to scale AI.",
    summary:
      "Most AI scaling means adding layers and parameters. A looped transformer instead runs the same blocks several times, reusing their parameters while the representation keeps changing. That saves memory but not compute: four blocks run three times is still twelve block applications. Harsh Gupta explains the trade-off, why it matters for inference cost, and why reports that OpenAI's Astra may use looped computation are interesting — while noting the architecture has not been officially disclosed.",
    uploadDate: "2026-09-15T06:30:23-07:00",
    duration: "PT5M48S",
    durationLabel: "5:48",
    topics: ["Looped transformers", "AI scaling", "OpenAI Astra", "Test-time compute", "Model architecture", "Inference cost"],
    takeaways: [
      "A standard transformer scales by adding blocks, and every new block brings its own learned parameters.",
      "A looped transformer reuses the same blocks multiple times: same parameters, but a different input state on every pass.",
      "Looping saves memory, not compute — four blocks run three times is still twelve block applications.",
      "The trade-off is where you spend resources: more unique parameters, or more computation through existing ones. Neither is automatically better.",
      "OpenAI has not disclosed Astra's internal architecture; looped or recurrent computation is suggested by reports and technical analysis only.",
      "Looped computation is not the same thing as a hidden chain of thought — it describes how compute is structured, not what the model reasons about.",
    ],
    chapters: [
      {
        start: 0,
        title: "A different way to scale AI",
        paragraphs: [
          "OpenAI's new Astra model may be using an interesting way of scaling AI: using the same computation multiple times and spending more on one problem. Both approaches come with their trade-offs.",
          "Wait — why would you use the same layers? If you have to give the model more, why don't you just add more layers? To understand this, we have to understand the idea of a looped transformer. And if the Astra reports are accurate, then this AI model is scaled up in a completely different way.",
          "Hi, I am Harsh, and in this video we are going to break down exactly how this works.",
        ],
      },
      {
        start: 29,
        title: "How we normally make models bigger",
        paragraphs: [
          "Normally, when we talk about making AI models bigger, what do we imagine? More layers, more parameters, a bigger model. But here is a different question: what if the model doesn't need more layers? What if it just needs to use the layers it has more times?",
          "Sounds simple, right? But it's a very important architectural trade-off.",
        ],
      },
      {
        start: 46,
        title: "A standard transformer, block by block",
        paragraphs: [
          "First, let's take a normal transformer. Imagine a simplified one: the input goes through the first block, then the second, then the third, and then the fourth. Every block transforms the representation of the input, so as information moves through the model, it changes after every block.",
          "Now let's say we want the model to do more computation. What's the normal approach? Add more blocks. Let's say we now have eight blocks.",
        ],
      },
      {
        start: 71,
        title: "Looped computation: reusing the same blocks",
        paragraphs: [
          "The important part is that these new blocks come with their own learned parameters. So the model not only has more computation, but also more unique transformations.",
          "But now imagine a second possibility. Instead of stopping after four blocks, we use those four blocks again — maybe one more time. This is the basic intuition behind looped computation.",
          "Here is an important distinction. When we say \"same layers\", it does not mean the model is repeating exactly the same calculations. What is being reused are the parameters, but the representation changes after every pass. So: same parameters, but a different input state. And this is the reason repeated computation is useful.",
        ],
      },
      {
        start: 114,
        title: "Why not just add more layers?",
        paragraphs: [
          "Now an obvious question: if we need more computation, why not add more layers? Because adding more layers is not free. In a deeper model, every new block generally has its own parameters. In a looped model, you can use existing parameters in multiple computational steps.",
          "So you can increase the amount of computation without increasing the number of unique parameters, which saves memory.",
        ],
      },
      {
        start: 138,
        title: "The catch: looping is not free",
        paragraphs: [
          "But now an important catch: this is not computation-free. If we run four blocks three times, we have performed twelve block applications. So you are saving on creating additional unique parameters, but you are still paying for the computation required to run those blocks.",
          "Basically, you are changing where you spend your resources. The first approach is more unique parameters; the second approach is more computation using existing parameters — and neither one is automatically better. The real question is whether these additional computational passes make the model much better at solving problems.",
        ],
      },
      {
        start: 175,
        title: "Scaling computation, not just parameters",
        paragraphs: [
          "This connects to a much bigger idea in modern AI. The obvious way of improving models was to make them bigger. But now there's another dimension we can play with: how much computation does the model actually perform?",
          "So it's not enough to just ask how many parameters there are. You also have to ask how much computation it is actually doing.",
        ],
      },
      {
        start: 210,
        title: "What we actually know about Astra",
        paragraphs: [
          "Now let's go to Astra. The public information tells us what the system can do, but OpenAI has not disclosed its exact internal architecture. Some reports and technical analysis suggest Astra may use some form of looped or recurrent computation.",
          "If those reports are right, this is interesting because a big model is then not just representing more capacity — it represents a fundamentally different approach. Instead of saying \"let's keep adding more layers\", you can ask: can these learned transformations be applied repeatedly to the evolving representations?",
        ],
      },
      {
        start: 244,
        title: "Inference cost at production scale",
        paragraphs: [
          "Of course, there is a practical side. If we are doing more passes at inference time, then we need to run more computation. And at production scale, this becomes very important, because compute is not an abstract number — GPU utilization, latency, throughput, and cost all depend on how much a model is running.",
        ],
      },
      {
        start: 264,
        title: "Looping is not a hidden chain of thought",
        paragraphs: [
          "There's one more distinction I want to make. Looped computation does not automatically mean the model has some hidden chain of thought happening internally. These are two different concepts.",
          "Looping describes how computation is structured. It doesn't by itself tell us what the model is reasoning about, or how its internal reasoning actually works.",
          "So the interesting part about Astra isn't just whether it has loops — it's the bigger direction this represents. We have spent years improving AI by making models larger: more parameters, more layers, more capacity. But another question has become increasingly important: how should we spend the computation? Looped architectures are one way of exploring that design space.",
        ],
      },
      {
        start: 305,
        title: "The main takeaway",
        paragraphs: [
          "Here's the main idea I want you to take away. An AI model doesn't necessarily become more capable only by becoming bigger. You can increase the number of parameters, or you can potentially reuse the parameters and spend more computation applying them.",
          "Looped architectures have explored that second idea, and if the reports about Astra are eventually confirmed, it would be a pretty interesting example of frontier AI exploring a different way to scale computation. So next time you hear a model is bigger, don't just ask how many parameters there are. Ask how much computation it is actually doing.",
          "If you enjoyed this breakdown and want more videos on the architecture and infrastructure behind modern AI systems, subscribe to my channel. I will see you in the next one.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is a looped transformer?",
        a: "A looped transformer runs the same set of transformer blocks more than once instead of stacking new blocks. The parameters are reused on every pass, but the representation flowing through them changes each time, so each pass does new work.",
      },
      {
        q: "Does reusing layers make a model cheaper to run?",
        a: "It saves memory, not compute. Reusing blocks avoids adding unique parameters, but every pass still costs computation: four blocks run three times is twelve block applications, the same as a twelve-block model.",
      },
      {
        q: "Does OpenAI's Astra use a looped architecture?",
        a: "It is not confirmed. OpenAI has not disclosed Astra's internal architecture. Some reports and technical analysis suggest it may use some form of looped or recurrent computation.",
      },
      {
        q: "Is looped computation the same as a hidden chain of thought?",
        a: "No. Looping describes how computation is structured inside the model. It does not by itself say what the model is reasoning about or how its internal reasoning works.",
      },
      {
        q: "Why does looped computation matter in production?",
        a: "More passes at inference time means more computation per request, which directly affects GPU utilization, latency, throughput and cost at scale.",
      },
    ],
  },
];

export const watchUrl = (v: Video, start = 0) => `https://www.youtube.com/watch?v=${v.id}${start ? `&t=${start}s` : ""}`;
export const embedUrl = (v: Video) => `https://www.youtube.com/embed/${v.id}`;
export const thumbnailUrl = (v: Video) => `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`;
export const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
export const transcriptText = (v: Video) => v.chapters.flatMap((c) => c.paragraphs).join(" ");
