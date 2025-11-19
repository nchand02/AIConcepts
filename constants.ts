import { Chapter, ContentType, CalloutType } from './types';

export const CURRICULUM: Chapter[] = [
  {
    id: 'c1',
    slug: 'foundations',
    title: 'Foundations of Artificial Intelligence',
    description: 'Understand the shift from Symbolic Logic to modern Neural Networks.',
    sections: [
      {
        id: 's1',
        title: 'Concept Overview',
        blocks: [
          {
            id: 'b1',
            type: ContentType.TEXT,
            content: "Artificial Intelligence is not just one thing. It's a spectrum. Historically, we used 'Symbolic AI' (hard-coded rules like chess logic). Today, we use 'Connectionist AI' (Neural Networks) that learn rules from data."
          },
          {
            id: 'b2',
            type: ContentType.CALLOUT,
            variant: CalloutType.TIP,
            title: "Why It Matters",
            content: "You cannot program a rule for 'identifying a cat'—there are too many edge cases. You need a system that learns the concept of 'cat-ness' from pixels. This is why Neural Networks took over."
          }
        ]
      },
      {
        id: 's2',
        title: 'Visualizing the Shift',
        blocks: [
            {
                id: 'b_diag',
                type: ContentType.MERMAID,
                content: `graph LR
    subgraph Symbolic AI
    Data1[Input] + Rules[Rules] --> Answer1[Output]
    end
    subgraph Machine Learning
    Data2[Input] + Answer2[Output] --> Rules2[Learned Rules]
    end`
            },
            {
                id: 'b_exp',
                type: ContentType.TEXT,
                content: "In traditional programming, you give the computer data and rules to get answers. In Machine Learning, you give the computer data and answers (labels), and it calculates the rules."
            }
        ]
      },
      {
        id: 's3',
        title: 'Deep Dive: The Neuron',
        blocks: [
            {
                id: 'b_dd',
                type: ContentType.CALLOUT,
                variant: CalloutType.DEEP_DIVE,
                title: "Mathematical Perceptron",
                content: `A single neuron (Perceptron) performs a dot product plus a bias:
y = f(w · x + b)
- w: Weights (Importance of input)
- x: Inputs (Data)
- b: Bias (Activation threshold)
- f: Activation Function (Non-linearity like ReLU)`
            }
        ]
      },
      {
        id: 's4',
        title: 'Best Practices & Pitfalls',
        blocks: [
            {
                id: 'b_bp',
                type: ContentType.CALLOUT,
                variant: CalloutType.BEST_PRACTICE,
                title: "Start Simple",
                content: "Always try a simple Regression or Random Forest model before jumping to Deep Learning. Neural Networks are expensive and hard to debug."
            },
            {
                id: 'b_pf',
                type: ContentType.CALLOUT,
                variant: CalloutType.PITFALL,
                title: "The Black Box Problem",
                content: "Neural Networks are often uninterpretable. You know IT works, but you often don't know WHY specific neurons fired. This is a risk in finance and healthcare."
            }
        ]
      },
      {
        id: 's5',
        title: 'Review',
        blocks: [
            {
                id: 'b_key',
                type: ContentType.KEY_TERMS,
                content: "Symbolic AI: Rule-based logic.\nConnectionism: Neural network-based learning.\nInference: Using a trained model to make predictions."
            },
            {
                id: 'b_quiz',
                type: ContentType.QUIZ,
                content: "",
                title: "Check your understanding",
                options: [
                    { id: 'a', text: "Symbolic AI learns from data", isCorrect: false },
                    { id: 'b', text: "Machine Learning figures out rules from data and answers", isCorrect: true },
                    { id: 'c', text: "Deep Learning is older than Symbolic AI", isCorrect: false }
                ],
                answerExplanation: "Correct! ML flips the paradigm: instead of coding rules, we feed data and desired outputs to learn the rules."
            }
        ]
      }
    ]
  },
  {
    id: 'c2',
    slug: 'machine-learning',
    title: 'Machine Learning Paradigms',
    description: 'Supervised, Unsupervised, and the rise of Self-Supervised Learning.',
    sections: [
      {
        id: 'ml1',
        title: 'Concept Overview',
        blocks: [
          {
            id: 'ml_b1',
            type: ContentType.TEXT,
            content: "Machine Learning is not one technique. It is categorized by how the model receives feedback. The most important modern category is Self-Supervised Learning (used by LLMs)."
          },
          {
            id: 'ml_b2',
            type: ContentType.CALLOUT,
            variant: CalloutType.TIP,
            title: "Why It Matters",
            content: "Labeling data (Supervised) is expensive. The internet is full of unlabeled text. Self-Supervised Learning allows us to train on the whole internet by hiding words and asking the model to fill in the blanks."
          }
        ]
      },
      {
        id: 'ml2',
        title: 'The 4 Pillars',
        blocks: [
            {
                id: 'ml_diag',
                type: ContentType.MERMAID,
                content: `graph TD
    A[Data] --> B{Has Labels?}
    B -- Yes --> C[Supervised Learning]
    C --> C1[Classification: Cat vs Dog]
    B -- No --> D{Goal?}
    D -- Structure --> E[Unsupervised Learning]
    D -- Next Token --> F[Self-Supervised Learning]
    D -- Action/Reward --> G[Reinforcement Learning]`
            }
        ]
      },
      {
        id: 'ml3',
        title: 'Deep Dive: Self-Supervision',
        blocks: [
             {
                id: 'ml_dd',
                type: ContentType.CALLOUT,
                variant: CalloutType.DEEP_DIVE,
                title: "Masked Language Modeling",
                content: `In BERT (an early Transformer), the model plays "Fill in the Blank".
Input: "The [MASK] sat on the mat."
Target: "cat"
The model computes loss based on its guess. No human needed to label "cat"—it was in the original sentence.`
            }
        ]
      },
      {
        id: 'ml4',
        title: 'Review',
        blocks: [
            {
                id: 'ml_quiz',
                type: ContentType.QUIZ,
                content: "",
                title: "Which paradigm powers ChatGPT?",
                options: [
                    { id: 'a', text: "Supervised Learning only", isCorrect: false },
                    { id: 'b', text: "Self-Supervised Learning (Next Token Prediction)", isCorrect: true },
                    { id: 'c', text: "Unsupervised Clustering", isCorrect: false }
                ],
                answerExplanation: "LLMs are trained primarily via Self-Supervised Learning (predicting the next token in massive datasets)."
            }
        ]
      }
    ]
  },
  {
    id: 'c3',
    slug: 'transformers',
    title: 'Transformer Architecture & Self-Attention',
    description: 'The architecture that changed everything. Understanding Q, K, V.',
    sections: [
      {
        id: 'tr1',
        title: 'Concept Overview',
        blocks: [
          {
            id: 'tr_b1',
            type: ContentType.TEXT,
            content: "Before 2017, AI processed text sequentially (word by word). Transformers process text in parallel. This allowed for massive speedups and handling long context."
          },
          {
             id: 'tr_b2',
             type: ContentType.CALLOUT,
             variant: CalloutType.TIP,
             title: "Why It Matters",
             content: "Sequential processing (RNNs) forgets the beginning of a sentence by the time it reaches the end. Parallel processing (Attention) sees the whole sentence at once."
          }
        ]
      },
      {
        id: 'tr2',
        title: 'The Attention Mechanism',
        blocks: [
          {
            id: 'tr_diag',
            type: ContentType.MERMAID,
            content: `graph TD
    Input[The bank of the river] --> Embed[Embeddings]
    Embed --> Attention[Self-Attention Layer]
    Attention --> Context[Contextualized Vectors]
    
    style Attention fill:#f9f,stroke:#333,stroke-width:2px`
          },
          {
            id: 'tr_text',
            type: ContentType.TEXT,
            content: "In the sentence 'The animal didn't cross the street because it was too tired', what does 'it' refer to? Self-Attention calculates the relationship between 'it' and every other word, realizing 'it' has a strong relationship to 'animal'."
          }
        ]
      },
      {
        id: 'tr3',
        title: 'Deep Dive: Q, K, V',
        blocks: [
           {
                id: 'tr_dd',
                type: ContentType.CALLOUT,
                variant: CalloutType.DEEP_DIVE,
                title: "Query, Key, Value",
                content: `Every word becomes 3 vectors:
1. Query (Q): What am I looking for?
2. Key (K): What do I offer?
3. Value (V): What is my content?

Attention = softmax((Q · K) / √d) · V
It's a database lookup in vector space.`
            }
        ]
      },
      {
          id: 'tr4',
          title: 'Review',
          blocks: [
              {
                  id: 'tr_keys',
                  type: ContentType.KEY_TERMS,
                  content: "Self-Attention: Mechanism relating words to other words.\nParallelism: Processing all tokens simultaneously.\nPositional Encoding: Adding numbers to vectors so the model knows word order."
              },
              {
                  id: 'tr_quiz',
                  type: ContentType.QUIZ,
                  content: "",
                  title: "What is the main advantage of Transformers over RNNs?",
                  options: [
                      { id: 'a', text: "They are smaller", isCorrect: false },
                      { id: 'b', text: "Parallel processing capability", isCorrect: true },
                      { id: 'c', text: "They don't use numbers", isCorrect: false }
                  ],
                  answerExplanation: "Transformers removed the sequential recurrence, allowing GPUs to parallelize the workload massively."
              }
          ]
      }
    ]
  },
  {
    id: 'c4',
    slug: 'llms',
    title: 'Large Language Models (LLMs)',
    description: 'Tokenization, Scaling Laws, and Context Windows.',
    sections: [
      {
        id: 'llm1',
        title: 'Concept Overview',
        blocks: [
          {
            id: 'llm_b1',
            type: ContentType.TEXT,
            content: "LLMs are giant Transformers predicting the next token. Despite this simple objective, emergent reasoning capabilities appear when models get large enough (Scaling Laws)."
          }
        ]
      },
      {
        id: 'llm2',
        title: 'Tokenization',
        blocks: [
          {
             id: 'llm_img',
             type: ContentType.MERMAID,
             content: `graph LR
    Text["Hello World"] --> Tokenizer
    Tokenizer --> IDs["[15496, 2159]"]
    IDs --> LLM`
          },
          {
             id: 'llm_code',
             type: ContentType.CODE,
             title: "Tiktoken Example",
             content: `import tiktoken
enc = tiktoken.get_encoding("cl100k_base")
print(enc.encode("AI is cool"))
# Output: [15339, 374, 4329]`
          }
        ]
      },
      {
          id: 'llm3',
          title: 'Pitfalls',
          blocks: [
              {
                  id: 'llm_pf',
                  type: ContentType.CALLOUT,
                  variant: CalloutType.PITFALL,
                  title: "The Token Trap",
                  content: "LLMs are bad at math and spelling reverse words because they see tokens, not characters. '9.11' might be one token, '9.9' might be another, causing comparison errors."
              }
          ]
      },
      {
          id: 'llm4',
          title: 'Review',
          blocks: [
              {
                  id: 'llm_quiz',
                  type: ContentType.QUIZ,
                  content: "",
                  title: "What does an LLM actually see?",
                  options: [
                      { id: 'a', text: "Words", isCorrect: false },
                      { id: 'b', text: "Integer Token IDs", isCorrect: true },
                      { id: 'c', text: "Pixels", isCorrect: false }
                  ],
                  answerExplanation: "Text is converted into a list of integers (tokens) before entering the model."
              }
          ]
      }
    ]
  },
  {
    id: 'c5',
    slug: 'rag',
    title: 'Retrieval-Augmented Generation (RAG)',
    description: 'Grounding LLMs with external data using Vector Databases.',
    sections: [
      {
        id: 'rag1',
        title: 'Concept Overview',
        blocks: [
           {
               id: 'rag_b1',
               type: ContentType.TEXT,
               content: "RAG gives the LLM an open-book test. Instead of relying on memory (training weights), it retrieves relevant pages from a database before answering."
           },
           {
               id: 'rag_b2',
               type: ContentType.CALLOUT,
               variant: CalloutType.TIP,
               title: "Why It Matters",
               content: "1. Reduces Hallucinations (Grounded in facts).\n2. Access to Private Data (Your company docs).\n3. Up-to-date info (No training cutoff)."
           }
        ]
      },
      {
          id: 'rag2',
          title: 'The Architecture',
          blocks: [
              {
                  id: 'rag_diag',
                  type: ContentType.MERMAID,
                  content: `flowchart LR
    User((User)) -- Query --> App
    App -- Embed --> VecDB[(Vector DB)]
    VecDB -- Context --> App
    App -- Query + Context --> LLM
    LLM -- Answer --> User`
              }
          ]
      },
      {
          id: 'rag3',
          title: 'Deep Dive: Vector Embeddings',
          blocks: [
              {
                  id: 'rag_dd',
                  type: ContentType.CALLOUT,
                  variant: CalloutType.DEEP_DIVE,
                  title: "Cosine Similarity",
                  content: `We convert text to numbers (Vector [0.1, 0.5, ...]).
To find relevant text, we measure the angle between the Query Vector and Document Vectors.
Small angle = High Similarity.`
              }
          ]
      },
      {
          id: 'rag4',
          title: 'Best Practices',
          blocks: [
              {
                  id: 'rag_bp',
                  type: ContentType.CALLOUT,
                  variant: CalloutType.BEST_PRACTICE,
                  title: "Chunking Strategy",
                  content: "Don't embed whole books. Chunk data into 512-token segments with overlap. This ensures the retrieved context is precise."
              }
          ]
      },
      {
          id: 'rag5',
          title: 'Review',
          blocks: [
              {
                  id: 'rag_quiz',
                  type: ContentType.QUIZ,
                  content: "",
                  title: "Where does the 'Knowledge' come from in RAG?",
                  options: [
                      { id: 'a', text: "The LLM's training data", isCorrect: false },
                      { id: 'b', text: "The retrieved documents injected into the context window", isCorrect: true },
                      { id: 'c', text: "Magic", isCorrect: false }
                  ],
                  answerExplanation: "The LLM acts as a reasoning engine, processing the facts provided in the prompt (Context)."
              }
          ]
      }
    ]
  },
  {
    id: 'c6',
    slug: 'fine-tuning',
    title: 'Fine-Tuning & Adaptation',
    description: 'Specializing models using LoRA and PEFT.',
    sections: [
      {
        id: 'ft1',
        title: 'Concept Overview',
        blocks: [
            {
                id: 'ft_b1',
                type: ContentType.TEXT,
                content: "RAG adds knowledge. Fine-Tuning changes behavior. If you want an LLM to speak like a pirate or follow a specific JSON format, you Fine-Tune it."
            }
        ]
      },
      {
          id: 'ft2',
          title: 'LoRA (Low-Rank Adaptation)',
          blocks: [
              {
                  id: 'ft_diag',
                  type: ContentType.MERMAID,
                  content: `graph TD
    W[Frozen Weights]
    A[Trainable A]
    B[Trainable B]
    In[Input] --> W
    In --> A --> B
    W --> Sum((+))
    B --> Sum --> Out[Output]`
              },
              {
                  id: 'ft_text',
                  type: ContentType.TEXT,
                  content: "LoRA freezes the massive model and only trains tiny adapter layers. This reduces memory usage by 95%."
              }
          ]
      },
      {
          id: 'ft3',
          title: 'Review',
          blocks: [
              {
                  id: 'ft_quiz',
                  type: ContentType.QUIZ,
                  content: "",
                  title: "When should you use Fine-Tuning over RAG?",
                  options: [
                      { id: 'a', text: "When I have new facts", isCorrect: false },
                      { id: 'b', text: "When I need a specific tone or format style", isCorrect: true },
                      { id: 'c', text: "Always", isCorrect: false }
                  ],
                  answerExplanation: "Fine-tuning teaches 'Form' and 'Style'. RAG teaches 'Facts'."
              }
          ]
      }
    ]
  },
  {
    id: 'c7',
    slug: 'computer-vision',
    title: 'Computer Vision & Diffusion',
    description: 'How machines see and generate images.',
    sections: [
        {
            id: 'cv1',
            title: 'Concept Overview',
            blocks: [
                {
                    id: 'cv_b1',
                    type: ContentType.TEXT,
                    content: "Modern image generation (Stable Diffusion) learns by reversing noise. It learns to take static and hallucinate structure into it."
                }
            ]
        },
        {
            id: 'cv2',
            title: 'The Diffusion Process',
            blocks: [
                {
                    id: 'cv_diag',
                    type: ContentType.MERMAID,
                    content: `graph LR
    Noise[Random Static] -- Denoise Step 1 --> LessNoise
    LessNoise -- Denoise Step 50 --> Image[Clear Image]
    Text["Prompt: A cat"] -.-> Guide[Conditioning]
    Guide -.-> LessNoise`
                }
            ]
        },
        {
            id: 'cv3',
            title: 'Review',
            blocks: [
                {
                    id: 'cv_quiz',
                    type: ContentType.QUIZ,
                    content: "",
                    title: "What does a Diffusion model predict?",
                    options: [
                        { id: 'a', text: "The final image directly", isCorrect: false },
                        { id: 'b', text: "The noise to remove at each step", isCorrect: true }
                    ],
                    answerExplanation: "It predicts the noise component, subtracts it, and repeats."
                }
            ]
        }
    ]
  },
  {
    id: 'c8',
    slug: 'alignment-safety',
    title: 'Alignment & RLHF',
    description: 'Making models safe and helpful.',
    sections: [
        {
            id: 'safe1',
            title: 'Concept Overview',
            blocks: [
                {
                    id: 'safe_b1',
                    type: ContentType.TEXT,
                    content: "Raw LLMs are just autocomplete engines. They might autocomplete a bomb recipe. RLHF (Reinforcement Learning from Human Feedback) steers them to be helpful and harmless."
                }
            ]
        },
        {
            id: 'safe2',
            title: 'The RLHF Loop',
            blocks: [
                {
                    id: 'safe_diag',
                    type: ContentType.MERMAID,
                    content: `graph TD
    LLM[Base Model] --> Answers[Generate 2 Answers]
    Human[Human Labeler] --> Rank[Rank A > B]
    Rank --> RM[Reward Model]
    RM --> RL[PPO Training]
    RL --> LLM`
                }
            ]
        },
        {
            id: 'safe3',
            title: 'Review',
            blocks: [
                {
                    id: 'safe_quiz',
                    type: ContentType.QUIZ,
                    content: "",
                    title: "What is the Reward Model?",
                    options: [
                        { id: 'a', text: "A model trained to mimic human preferences", isCorrect: true },
                        { id: 'b', text: "A payment system", isCorrect: false }
                    ],
                    answerExplanation: "The Reward Model acts as a proxy for human raters during the massive reinforcement learning phase."
                }
            ]
        }
    ]
  },
  {
    id: 'c9',
    slug: 'agents-mcp',
    title: 'Agents & MCP',
    description: 'Reasoning loops and tool use.',
    sections: [
        {
            id: 'agt1',
            title: 'Concept Overview',
            blocks: [
                {
                    id: 'agt_b1',
                    type: ContentType.TEXT,
                    content: "A Chatbot answers. An Agent takes action. Agents use the 'ReAct' loop (Reason, Act, Observe) to solve multi-step problems."
                }
            ]
        },
        {
            id: 'agt2',
            title: 'ReAct Loop',
            blocks: [
                {
                    id: 'agt_diag',
                    type: ContentType.MERMAID,
                    content: `stateDiagram-v2
    [*] --> Thought
    Thought --> Action: Call Tool
    Action --> Observation: Tool Output
    Observation --> Thought: Analyze
    Thought --> FinalAnswer: Done`
                }
            ]
        },
        {
            id: 'agt3',
            title: 'Deep Dive: MCP',
            blocks: [
                {
                    id: 'agt_dd',
                    type: ContentType.CALLOUT,
                    variant: CalloutType.DEEP_DIVE,
                    title: "Model Context Protocol",
                    content: "MCP is a standard for connecting AI to data. Instead of writing custom code for Google Drive, Slack, and GitHub, MCP provides a universal plug-and-play interface for agents."
                }
            ]
        },
        {
            id: 'agt4',
            title: 'Review',
            blocks: [
                {
                    id: 'agt_quiz',
                    type: ContentType.QUIZ,
                    content: "",
                    title: "What distinguishes an Agent from a Chatbot?",
                    options: [
                        { id: 'a', text: "Agents have a body", isCorrect: false },
                        { id: 'b', text: "Agents can use tools and loop through tasks", isCorrect: true }
                    ],
                    answerExplanation: "Tool use + Reasoning Loop = Agent."
                }
            ]
        }
    ]
  },
  {
    id: 'c10',
    slug: 'infrastructure',
    title: 'AI Infrastructure',
    description: 'GPUs, TPUs, and Inference.',
    sections: [
        {
            id: 'inf1',
            title: 'Hardware',
            blocks: [
                {
                    id: 'inf_b1',
                    type: ContentType.TEXT,
                    content: "AI runs on matrix multiplication. NVIDIA GPUs are the standard because of CUDA. Google TPUs are specialized alternatives."
                }
            ]
        },
        {
            id: 'inf2',
            title: 'Optimization',
            blocks: [
                {
                    id: 'inf_bp',
                    type: ContentType.CALLOUT,
                    variant: CalloutType.BEST_PRACTICE,
                    title: "Quantization",
                    content: "Run models in 4-bit or 8-bit precision (GGUF / AWQ). This reduces VRAM usage by 4x with minimal accuracy loss."
                }
            ]
        },
        {
            id: 'inf3',
            title: 'Final Quiz',
            blocks: [
                {
                    id: 'inf_quiz',
                    type: ContentType.QUIZ,
                    content: "",
                    title: "What is Quantization?",
                    options: [
                        { id: 'a', text: "Making the model larger", isCorrect: false },
                        { id: 'b', text: "Reducing the precision of weights to save memory", isCorrect: true }
                    ],
                    answerExplanation: "Quantization maps 32-bit floats to 4-bit integers, allowing massive models to run on consumer hardware."
                }
            ]
        }
    ]
  }
];