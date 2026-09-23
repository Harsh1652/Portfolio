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
  {
    id: "H5PVnjhDF6E",
    slug: "ai-agent-harness",
    title: "Your AI Agent Is Failing for the Wrong Reason",
    description:
      "A smart model doesn't automatically make a smart agent. A breakdown of the agent harness — the layer around the model that decides what it can see, what tools it can use, what it's allowed to do, and how it finds out whether its actions actually worked.",
    summary:
      "An AI model is a reasoning engine; the harness is the system that lets that reasoning act on the real world. Harsh Gupta walks through the four questions every useful agent has to answer — what the model knows, what it can use, what it's permitted to do, and how it verifies success — using a coding agent's think → act → observe → feedback loop as the example. He also covers why more tools can make an agent worse, why permissions and sandboxing belong in the harness, and why the same model in two different harnesses behaves like two different agents.",
    uploadDate: "2026-09-23T07:30:00-07:00",
    duration: "PT4M44S",
    durationLabel: "4:44",
    topics: ["AI agents", "Agent harness", "Tool use", "Feedback loops", "Permissions & sandboxing", "Harness engineering"],
    takeaways: [
      "An agent is not just a model — the harness around it supplies context, tools, permissions and verification.",
      "Every useful agent answers four questions: what does the model know, what can it use, what is it allowed to do, and how does it know the task actually worked?",
      "The act → observe → feedback loop (edit code, run tests, read results, try again) is a major reason coding agents succeed.",
      "The same model in two different harnesses behaves completely differently, because you changed the environment, not the reasoning engine.",
      "More tools is not better: each extra tool is another choice to make, another interface to understand and another result to interpret.",
      "Permissions, approval boundaries and sandboxing live in the harness — you wouldn't give a new developer unrestricted production access either.",
      "Prompt engineering can't rescue bad context, unreliable tools, missing verification or wrong permissions. That's harness engineering.",
    ],
    chapters: [
      {
        start: 0,
        title: "The developer with no access",
        paragraphs: [
          "Imagine you hire a smart developer who can reason extremely well. But you don't give them access to your codebase. You don't give them access to the terminal. You don't give them access to the database. You don't even give them browser access, and they can't run tests. So will they actually be able to fix your production bug? Probably not.",
          "And that is basically the problem when we think an AI agent is just an AI model.",
          "Hi, I'm Harsh, and in this video we'll talk about the AI agent harness. We'll understand why an AI agent isn't just a model, what a harness is, what it does around a model, and how tools, context and feedback turn a simple AI model into an actual agent. The most interesting part: give the same model a different harness and see how its behavior becomes completely different.",
        ],
      },
      {
        start: 42,
        title: "What is an agent harness?",
        paragraphs: [
          "So let's first understand what is happening inside an agent. When we say an AI agent can browse the web, edit files, run code, make API calls, use memory and even retry if something fails — the model isn't doing all of this magically. There is another layer around the model that makes all of this possible, and this layer is called the agent harness.",
          "You can think of the model as a reasoning engine, and the harness is the system that lets that reasoning engine interact with the real world. The model performs the reasoning. The harness manages what the model can see, what it can use, what permissions it has to act, and what happens after it takes an action.",
        ],
      },
      {
        start: 82,
        title: "The four questions every agent answers",
        paragraphs: [
          "Almost every useful agent has to answer four basic questions. What does the model know? What can the model use? What permissions does the model have? And how will the model know if its task was actually completed or not? The harness handles a big part of these things.",
        ],
      },
      {
        start: 96,
        title: "A coding agent, step by step",
        paragraphs: [
          "Let's take the example of a coding agent. You tell it to fix the authentication bug. The model can't magically fix the entire codebase just by looking at one sentence, right? The model can reason about the code it has received, then it decides what to change and what not to.",
          "But here comes the interesting part. The harness can also run the code tests, and the result of the tests goes back to the model. If there is any problem, the model makes changes to the code again, runs the tests again, and it goes on until all test cases pass.",
        ],
      },
      {
        start: 126,
        title: "Why the feedback loop matters",
        paragraphs: [
          "This loop is a major reason why AI agents become successful. Now the model is not just generating answers. It is taking action, observing what happened, and deciding what to do next based on that feedback.",
        ],
      },
      {
        start: 137,
        title: "Same model, different harness",
        paragraphs: [
          "Now here comes an interesting part. If you run the exact same model in two different harnesses, the behavior of both agents can be completely different — because you are not just changing the model, you are changing the entire environment in which the model operates.",
        ],
      },
      {
        start: 150,
        title: "Why more tools can make agents worse",
        paragraphs: [
          "If tools make agents more capable, then what should be the simple solution? Give the agent 100 or 200 tools. But there is a problem with this too: having too many tools can actually make the agent worse. The model will have to decide which tool to use, it will have to understand the tool's interface, and then interpret the result that comes back.",
          "So a good harness does not mean giving the model everything. Instead, it means providing the right capability at the right time.",
        ],
      },
      {
        start: 177,
        title: "Permissions, approvals and sandboxing",
        paragraphs: [
          "Now imagine the agent wants to do something dangerous. A production harness will obviously not let the agent perform that action blindly. The harness can enforce permissions, define approval boundaries, provide sandboxing, and place safety controls around the model's actions.",
          "Remember the developer we saw in the beginning? You wouldn't give a developer unrestricted production access, so you shouldn't blindly give an AI agent unrestricted access.",
        ],
      },
      {
        start: 202,
        title: "Harness engineering, not just prompting",
        paragraphs: [
          "And this is where building production agents gets interesting, because building an agent is not just about crafting a clever system prompt. You might have an amazing prompt, but if the agent is getting the wrong context, the tools are unreliable, there is no verification, or the permissions are wrong, then the prompt won't save you.",
          "That is why there is another concept: harness engineering. Instead of just asking how do we make the model smarter, you start asking how do we build a better environment around the model — because the model's reasoning is only useful when the surrounding system can convert that reasoning into reliable work.",
        ],
      },
      {
        start: 237,
        title: "Designing an operating environment",
        paragraphs: [
          "When you build an AI agent for a real business workflow, you are actually not just deploying a model. You are designing an entire operating environment around the model, and this is a completely different way of understanding AI agents.",
          "So next time someone tells you they built an agent, don't just ask which model are you using. Ask: what does it see? What can it do? What is it allowed to do? How does it know when it's wrong? Because a model can generate a brilliant answer, but an agent has to operate in the real world — and that is the job of the system around the model.",
        ],
      },
      {
        start: 271,
        title: "Wrapping up",
        paragraphs: [
          "If you like these behind-the-scenes breakdowns of AI, then subscribe — because in these systems there is a lot more happening than just the model.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is an AI agent harness?",
        a: "The harness is the layer around an AI model that lets its reasoning act on the real world. It manages what the model can see, which tools it can use, what permissions it has, and what happens after it takes an action.",
      },
      {
        q: "Why isn't an AI agent just a model?",
        a: "A model reasons; it can't browse, edit files, run code or retry on its own. Those capabilities come from the harness. Without context, tools, permissions and feedback, even a very capable model can't complete real work.",
      },
      {
        q: "Why can giving an agent more tools make it worse?",
        a: "Every extra tool adds a decision and an interface. The model has to pick the right tool, understand how to call it and interpret what comes back. A good harness provides the right capability at the right time rather than everything at once.",
      },
      {
        q: "How does a coding agent know it actually fixed the bug?",
        a: "Through the feedback loop. The harness runs the tests and returns the results to the model, which edits the code and runs them again until they pass. The agent acts, observes the outcome, and decides the next step from that feedback.",
      },
      {
        q: "What is harness engineering?",
        a: "Shifting the question from \"how do we make the model smarter\" to \"how do we build a better environment around the model\" — context, tools, verification and permissions. A great prompt can't compensate for wrong context or unreliable tools.",
      },
      {
        q: "Why does the same model behave differently in different agents?",
        a: "Because the environment changed, not the reasoning engine. Different context, tools, permissions and feedback mechanisms produce completely different behavior from identical model weights.",
      },
    ],
  },
];

// `videos` is kept in publication order. Display order is derived from the upload date,
// so a new entry can be appended anywhere in the list above.

/** Oldest first — the order episode numbers follow */
export const videosByDate = [...videos].sort((a, b) => +new Date(a.uploadDate) - +new Date(b.uploadDate));
/** Newest first — the order videos are listed on the site */
export const videosNewestFirst = [...videosByDate].reverse();
/** 1-based episode number, counted from the oldest video */
export const episodeNumber = (v: Video) => videosByDate.findIndex((x) => x.slug === v.slug) + 1;

/** Path of a video's own page on this site */
export const videoPath = (v: Video) => `/youtube/${v.slug}`;
export const findVideo = (slug: string) => videos.find((v) => v.slug === slug);
export const watchUrl = (v: Video, start = 0) => `https://www.youtube.com/watch?v=${v.id}${start ? `&t=${start}s` : ""}`;
// youtube-nocookie keeps the player from setting cookies until the viewer actually plays it
export const embedUrl = (v: Video) => `https://www.youtube-nocookie.com/embed/${v.id}`;
export const thumbnailUrl = (v: Video) => `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`;
export const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
export const transcriptText = (v: Video) => v.chapters.flatMap((c) => c.paragraphs).join(" ");
