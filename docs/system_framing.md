## 1) What is an event in Forge?
Froge will be gathering events from different event sources, it should be felxible enough
so that we can attach new event source in future.
Currently forge would gather event from following sources
- Heavy: 
    - Using Hevy's APIs we will fetch the historic workout data, each set performed will be treated as an event.
    - Using Hevy's webhook support we will fetch the data of workout being done
- Habit Tracker:
    - We will be building our own habit tracker, and each interaction with the habit tracker will be termed as an event.
- Addiction Helper
    - Alongside habit tracker we will also be building an addiction helper which will help in tracking and getting over an addiction

#### Event would look something like this
- Required fields
    - `id` : internal id of the event
    - `occurred_at`: We may not be ingesting the event in our system at the same time the event acctually occurred, so we will assume if an event have a timestamp within itself, that it is the time it occurred.
    - `recored_at`: This is the timestamp on which we have ingested the system in our system
    - `source`: This holds the information about the source
        -   `id`: ID of the source, allot a unique ID to each source
        -   `clientId`: Each source can have multiple sub-clients or sub-systems eventing events to forge
        -   `metadata`: Metadata of the client sending the event, if exits
    - `payload`: We will determine specific type for the payload of each event later on

#### Rules for correction
As all our events are append-only, for correction a sources needs to send an corrected event, we then need to dermine on forge if it is an correction event or a new atomic event.
Correction event will hold a key named `supersedeId` which will hold the ID of the event which is being corrected.
If multiple events are sent for correction of an event, each event should hold the ID of previous event in `supersedeId`.
Analysis algorithm should pick the latest event with superseded tree

#### Real examples
- Todo

Define “event” precisely (append-only, timestamped, factual). Include:
- Required fields (e.g., `id`, `occurred_at`, `type`, `source`, `payload`)
- Rules for corrections (e.g., “new event supersedes old”, never edits/deletes)
- A few real examples across domains (workout set, urge, task completion, habit check-in)

---

## 2) What is immutable (raw truth)?

List exactly which records are considered raw truth and must be append-only/never rewritten.
- Physical (training / recovery)
- Behavioral (habits)
- Recovery (urges / relapse)
- Cognitive (tasks / planning)

---

## 3) What is derived (rebuildable)?

List the projections/metrics that can be deleted and recomputed from events at any time.
- Examples: weekly volume, streaks, fatigue score, carryover rate, relapse-risk windows
- Include which events each derived metric depends on (inputs → output)

---

## 4) What should AI answer in Forge?

Define the allowed AI behaviors and outputs, grounded in data.
- What queries must be supported (examples)
- What evidence/citations AI must include (time ranges, referenced events/metrics)
- How AI expresses uncertainty / “not enough data yet”
- How user feedback is captured and used

---

## 5) What must AI never do?

Define hard constraints and failure modes to avoid.
- No invented facts; no claims without supporting data
- No diagnosis or medical/therapy replacement
- No moralizing/shaming language
- No storing truth inside AI text (events are the source of truth)
