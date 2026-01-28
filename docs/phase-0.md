# Phase 0 — System Thinking, Mental Models, and Product Framing

## Objective

Phase 0 exists to **train the way you think**, not the way you code.

Before building any features, databases, dashboards, or AI prompts, you must first design a **correct mental model** of the system you are building.

This project is not a collection of apps.
It is a **Personal Life Intelligence System**.

The output of Phase 0 is clarity:
- clarity about what data is truth
- clarity about what AI can and cannot do
- clarity about how this system will scale in complexity without collapsing

No production code should be written until Phase 0 is complete.

---

## What You Are Actually Building

You are **not** building:
- a workout tracker
- a habit tracker
- a todo app
- an addiction tracker
- an AI chatbot

You are building a **Life Signal Processing System**.

High-level flow:

Life → Signals → Events → Metrics → Patterns → AI Reasoning → Actions

---

## The Core Mental Shift

### CRUD Thinking (Avoid)

Traditional apps overwrite state and delete history.
This destroys analytics, explainability, and AI reliability.

### Event-Based Thinking (Adopt)

Nothing is edited or deleted.
You only record **what happened**.

Events are:
- factual
- timestamped
- append-only
- minimally interpreted

---

## Raw Data vs Derived Data

### Raw Data (Immutable)
- workouts
- sets / reps / RPE
- urges and triggers
- task actions
- habit check-ins

Never edited. Never deleted.

### Derived Data (Rebuildable)
- streaks
- weekly volume
- fatigue score
- relapse risk estimate
- productivity metrics

Can be deleted and recomputed at any time.

Golden rule:
If deleting a table loses truth, the design is wrong.

---

## Timeline Thinking

All events live on one unified timeline.
Time is the primary join key across all domains.

---

## Role of AI

AI is a reasoning layer, not a source of truth.

Events → Metrics → Patterns → AI Explanation → Suggested Action

AI must not:
- store truth
- diagnose health
- moralize behavior
- make unsupported claims

---

## Product Mapping

Signal categories:
1. Physical (workouts, fatigue)
2. Behavioral (habits, urges)
3. Cognitive (tasks, planning)
4. Financial (future)

All signals become events.

---

## Phase 0 Deliverables

Create:
- docs/phase-0.md
- docs/system_framing.md

system_framing.md must answer:
1. What is an event?
2. What is immutable?
3. What is derived?
4. What should AI answer?
5. What must AI never do?

---

## Learning Resources

Event Sourcing:
https://martinfowler.com/eaaDev/EventSourcing.html

Designing Data-Intensive Applications:
https://dataintensive.net/

Software 2.0:
https://karpathy.medium.com/software-2-0-a64152b37c35

LLM Reasoning (BAIR):
https://bair.berkeley.edu/blog/2023/01/10/llm-reasoning/

AI Engineering:
https://www.latent.space/p/ai-engineering

RAG Overview:
https://www.pinecone.io/learn/retrieval-augmented-generation/

Fine-Tuning vs RAG:
https://www.anyscale.com/blog/fine-tuning-vs-rag

Behavioral Analytics:
https://www.amplitude.com/blog/behavioral-analytics

Metrics vs Insights:
https://www.reforge.com/blog/metrics-vs-insights

You Build It, You Run It:
https://queue.acm.org/detail.cfm?id=1142065

---

## Completion Checklist

You can explain:
- why events are immutable
- why projections are rebuildable
- why AI comes after metrics
- why LLMs are not databases
- why finance can be added later

---

## Next Phase

Phase 1 — Event schema, ingestion, and projections.
